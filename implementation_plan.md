# Lotto Analyzer Implementation Plan

## Goal
Create a custom Lotto Analyzer tool that filters 6/45 lotto combinations based on specific statistical rules provided by the user. The tool will allow generating valid combinations and checking if a specific combination passes the filters.

## User Review Required
> [!IMPORTANT]
> - **Repo Access**: I cannot directly push to the provided GitHub repository. I will generate the code locally, and you will need to push it yourself using the provided git commands.
> - **Lotto Rules**: Assuming standard Korean Lotto 6/45 (numbers 1-45).
> - **Low/High Definition**: "Low" is defined as 1-22, "High" as 23-45 (or 1-23/24-45). Standard is often split at 23. I will use **Low: 1-22, High: 23-45** unless specified otherwise, or use the 23 split point (23 is often the midpoint). Let's stick to **Low (1-23) and High (24-45)** as 23 is exactly the middle of 45? No, 45/2 = 22.5. So 1-22 (22 numbers) and 23-45 (23 numbers) or 1-23 and 24-45. I will use **Low: 1-23, High: 24-45** as a common convention.

## Proposed Changes

### Project Structure
- `lotto_analyzer.py`: Main module containing the `LottoFilter` class with all logic.
- `main.py`: CLI script to run the analyzer (generate or check).
- `README.md`: Instructions for the user.

### `lotto_analyzer.py`

#### `class LottoFilter`
This class will hold all the filtering constants and methods.

**Constants:**
- `MIN_SUM = 96`, `MAX_SUM = 175`
- `VALID_AC = [8, 9, 10]`
- `INVALID_ODD_EVEN = [(0,6), (6,0), (1,5), (5,1)]`
- `INVALID_LOW_HIGH = [(0,6), (6,0), (1,5), (5,1)]`
- `MULTIPLES_ALLOW_COUNT = range(1, 5)` (1, 2, 3, 4)

**Methods:**
- `check_all(numbers)`: Runs all checks.
- `calculate_sum(numbers)`: Returns sum.
- `calculate_ac(numbers)`: Calculates Arithmetic Complexity.
- `calculate_odd_even(numbers)`: Returns (odd_count, even_count).
- `calculate_low_high(numbers)`: Returns (low_count, high_count).
- `check_consecutive(numbers)`: Checks for 3-consecutive (2 sets) or 4+ consecutive.
- `check_multiples(numbers, divisor)`: Checks count of multiples.
- `check_primes(numbers)`: Checks count of prime numbers.

### `main.py`
- Argument parsing (optional) or interactive menu.
- Function to generate `N` random combinations that pass all filters.
- Function to check a specific combination input by user.

## Verification Plan

### Automated Tests
I will create a simple test suite `test_lotto.py` to verify each filter.
- **Test Sum**: Check with [1,2,3,4,5,6] (FAIL) and [10, 20, 30, 40, 41, 42] (PASS/FAIL depending on sum).
- **Test AC**: Check known AC values.
- **Test Patterns**: Verify "all odd" or "all even" are rejected.
- **Test Multiples/Primes**: Verify the new "1 count allowed" rule.

### Manual Verification
- Run `python main.py` and generate 5 numbers.
- Manually inspect one result to ensure it meets criteria (e.g., sum is within range).
