import random
import argparse
from lotto_analyzer import LottoFilter

def generate_numbers(count):
    analyzer = LottoFilter()
    results = []
    attempts = 0
    
    print(f"Generating {count} valid combinations...")
    
    while len(results) < count:
        attempts += 1
        numbers = sorted(random.sample(range(1, 46), 6))
        valid, _ = analyzer.check_all(numbers)
        
        if valid:
            results.append(numbers)
            print(f"[{len(results)}] Found: {numbers} (Attempts: {attempts})")
            attempts = 0 # Reset attempts for stats or keep cumulative? Let's reset to see difficulty per number or keep cumulative. 
            # Actually, let's just print total attempts at end if needed.
            
    print("\n--- Generation Complete ---")
    for idx, nums in enumerate(results, 1):
        print(f"{idx}: {nums}")

def check_numbers(numbers):
    analyzer = LottoFilter()
    valid, reason = analyzer.check_all(numbers)
    
    print(f"\nChecking: {numbers}")
    if valid:
        print("✅ PASS: This combination meets all criteria.")
    else:
        print(f"❌ FAIL: {reason}")
    
    # Detailed report
    print("-" * 30)
    print(f"Sum: {sum(numbers)} (Range: {analyzer.MIN_SUM}~{analyzer.MAX_SUM})")
    print(f"AC: {analyzer.calculate_ac(numbers)} (Valid: {analyzer.VALID_AC})")
    print(f"Odd/Even: {analyzer.calculate_odd_even(numbers)}")
    print(f"Low/High: {analyzer.calculate_low_high(numbers)}")
    print(f"Multiples of 3: {analyzer.count_multiples(numbers, 3)} (Valid: {analyzer.VALID_MULTIPLES_COUNT})")
    print(f"Multiples of 4: {analyzer.count_multiples(numbers, 4)} (Valid: {analyzer.VALID_MULTIPLES_COUNT})")
    print(f"Multiples of 5: {analyzer.count_multiples(numbers, 5)} (Valid: {analyzer.VALID_MULTIPLES_COUNT})")
    print(f"Primes: {analyzer.count_primes(numbers)} (Valid: {analyzer.VALID_PRIMES_COUNT})")


def main():
    parser = argparse.ArgumentParser(description="Lotto 6/45 Analyzer & Generator")
    parser.add_argument("--gen", type=int, help="Generate N valid combinations")
    parser.add_argument("--check", type=int, nargs=6, help="Check a specific combination (6 numbers)")
    
    args = parser.parse_args()
    
    if args.gen:
        generate_numbers(args.gen)
    elif args.check:
        check_numbers(sorted(args.check))
    else:
        # Interactive mode if no args
        print("1. Generate Numbers")
        print("2. Check Numbers")
        choice = input("Select option (1/2): ")
        
        if choice == "1":
            try:
                count = int(input("How many combinations? "))
                generate_numbers(count)
            except ValueError:
                print("Invalid input.")
        elif choice == "2":
            try:
                nums_str = input("Enter 6 numbers separated by space: ")
                nums = sorted([int(x) for x in nums_str.split()])
                if len(nums) != 6:
                    print("Error: Must enter exactly 6 numbers.")
                else:
                    check_numbers(nums)
            except ValueError:
                print("Invalid input.")
        else:
            parser.print_help()

if __name__ == "__main__":
    main()
