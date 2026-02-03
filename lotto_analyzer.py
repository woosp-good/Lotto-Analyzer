import math

class LottoFilter:
    def __init__(self):
        # 1. Sum Filter: 96 ~ 175
        self.MIN_SUM = 96
        self.MAX_SUM = 175
        
        # 2. AC Value (Arithmetic Complexity): 8, 9, 10
        self.VALID_AC = {8, 9, 10}
        
        # 3. Odd/Even Ratio: Exclude 0:6, 6:0, 1:5, 5:1 => Allow 2:4, 3:3, 4:2
        self.INVALID_ODD_EVEN = {(0, 6), (6, 0), (1, 5), (5, 1)}
        
        # 4. Low/High Ratio: Exclude 0:6, 6:0, 1:5, 5:1 => Allow 2:4, 3:3, 4:2
        # Low: 1-23, High: 24-45
        self.INVALID_LOW_HIGH = {(0, 6), (6, 0), (1, 5), (5, 1)}
        
        # 5. Multiples Check (3, 4, 5 of multiples): 1~4 allowed
        self.VALID_MULTIPLES_COUNT = {1, 2, 3, 4}
        
        # 6. Prime Numbers: 1~4 allowed
        self.VALID_PRIMES_COUNT = {1, 2, 3, 4}
        self.PRIMES = {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43}

    def check_all(self, numbers):
        """
        Runs all filters on the given list of 6 numbers.
        Returns (True, "Pass") or (False, Reason).
        """
        if len(numbers) != 6:
            return False, "Not 6 numbers"
        
        numbers = sorted(numbers)
        
        # 1. Sum Check
        if not self.check_sum(numbers):
            return False, f"Sum out of range: {sum(numbers)}"
            
        # 2. AC Check
        if not self.check_ac(numbers):
            return False, f"Invalid AC value: {self.calculate_ac(numbers)}"
            
        # 3. Odd/Even Check
        if not self.check_odd_even(numbers):
            return False, f"Invalid Odd/Even ratio: {self.calculate_odd_even(numbers)}"
            
        # 4. Low/High Check
        if not self.check_low_high(numbers):
            return False, f"Invalid Low/High ratio: {self.calculate_low_high(numbers)}"
            
        # 5. Multiples Check
        if not self.check_multiples(numbers, 3):
            return False, f"Invalid 3-multiples count: {self.count_multiples(numbers, 3)}"
        if not self.check_multiples(numbers, 4):
            return False, f"Invalid 4-multiples count: {self.count_multiples(numbers, 4)}"
        if not self.check_multiples(numbers, 5):
            return False, f"Invalid 5-multiples count: {self.count_multiples(numbers, 5)}"
            
        # 6. Primes Check
        if not self.check_primes(numbers):
            return False, f"Invalid Primes count: {self.count_primes(numbers)}"
            
        # 7. Consecutive Check
        if not self.check_consecutive(numbers):
             return False, "Failed consecutive number check"

        return True, "Pass"

    def check_sum(self, numbers):
        return self.MIN_SUM <= sum(numbers) <= self.MAX_SUM

    def calculate_ac(self, numbers):
        diffs = set()
        for i in range(len(numbers)):
            for j in range(i + 1, len(numbers)):
                diffs.add(numbers[j] - numbers[i])
        return len(diffs) - (6 - 1)

    def check_ac(self, numbers):
        return self.calculate_ac(numbers) in self.VALID_AC

    def calculate_odd_even(self, numbers):
        odd = sum(1 for n in numbers if n % 2 != 0)
        even = 6 - odd
        return (odd, even)

    def check_odd_even(self, numbers):
        return self.calculate_odd_even(numbers) not in self.INVALID_ODD_EVEN

    def calculate_low_high(self, numbers):
        # Low: 1-23, High: 24-45
        low = sum(1 for n in numbers if n <= 23)
        high = 6 - low
        return (low, high)

    def check_low_high(self, numbers):
        return self.calculate_low_high(numbers) not in self.INVALID_LOW_HIGH

    def count_multiples(self, numbers, divisor):
        return sum(1 for n in numbers if n % divisor == 0)

    def check_multiples(self, numbers, divisor):
        count = self.count_multiples(numbers, divisor)
        return count in self.VALID_MULTIPLES_COUNT

    def count_primes(self, numbers):
        return sum(1 for n in numbers if n in self.PRIMES)

    def check_primes(self, numbers):
        count = self.count_primes(numbers)
        return count in self.VALID_PRIMES_COUNT

    def check_consecutive(self, numbers):
        # Sort just in case
        nums = sorted(numbers)
        consecutive_groups = []
        current_group = 1
        
        for i in range(len(nums) - 1):
            if nums[i+1] == nums[i] + 1:
                current_group += 1
            else:
                if current_group > 1:
                    consecutive_groups.append(current_group)
                current_group = 1
        if current_group > 1:
             consecutive_groups.append(current_group)
             
        # Rule: No 3-consecutive 2 sets (e.g., 1,2,3, 10,11,12)
        # Rule: No 4+ consecutive
        
        if any(c >= 4 for c in consecutive_groups):
            return False
            
        three_consecutive_count = sum(1 for c in consecutive_groups if c == 3)
        if three_consecutive_count >= 2:
            return False
            
        return True
