# Python Control Flow
# This file demonstrates control flow structures in Python

print("=== Python Control Flow ===\n")

# 1. If Statements
print("1. IF STATEMENTS:")
age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Multiple conditions
temperature = 25
humidity = 60

if temperature > 30 and humidity > 70:
    print("It's hot and humid!")
elif temperature > 25 or humidity > 50:
    print("It's warm or humid")
else:
    print("The weather is pleasant")
print()

# 2. For Loops
print("2. FOR LOOPS:")

# Loop through a list
fruits = ["apple", "banana", "orange", "grape"]
for fruit in fruits:
    print(f"I like {fruit}")

# Loop with range
print("\nCounting from 1 to 5:")
for i in range(1, 6):
    print(f"Count: {i}")

# Loop with enumerate
print("\nFruits with index:")
for index, fruit in enumerate(fruits):
    print(f"{index + 1}. {fruit}")

# Loop through dictionary
person = {"name": "Alice", "age": 25, "city": "New York"}
print("\nPerson details:")
for key, value in person.items():
    print(f"{key}: {value}")
print()

# 3. While Loops
print("3. WHILE LOOPS:")

# Simple while loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1

# While loop with break
print("\nWhile loop with break:")
number = 0
while True:
    if number >= 5:
        break
    print(f"Number: {number}")
    number += 1

# While loop with continue
print("\nWhile loop with continue:")
i = 0
while i < 10:
    i += 1
    if i % 2 == 0:  # Skip even numbers
        continue
    print(f"Odd number: {i}")
print()

# 4. List Comprehensions
print("4. LIST COMPREHENSIONS:")

# Basic list comprehension
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
print(f"Numbers: {numbers}")
print(f"Squares: {squares}")

# List comprehension with condition
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(f"Even squares: {even_squares}")

# List comprehension with multiple variables
pairs = [(x, y) for x in range(3) for y in range(3)]
print(f"Pairs: {pairs}")
print()

# 5. Match Statements (Python 3.10+)
print("5. MATCH STATEMENTS (Python 3.10+):")

def analyze_command(command):
    match command.split():
        case ["quit"]:
            return "Goodbye!"
        case ["help"]:
            return "Available commands: quit, help, status"
        case ["status"]:
            return "System is running"
        case ["echo", *words]:
            return f"Echo: {' '.join(words)}"
        case _:
            return "Unknown command"

# Test match statements
commands = ["quit", "help", "status", "echo hello world", "unknown"]
for cmd in commands:
    result = analyze_command(cmd)
    print(f"'{cmd}' -> {result}")
print()

# 6. Error Handling
print("6. ERROR HANDLING:")

# Try-except block
try:
    number = int(input("Enter a number: "))
    result = 10 / number
    print(f"Result: {result}")
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred!")
finally:
    print("This always runs")
print()

# 7. Nested Control Structures
print("7. NESTED CONTROL STRUCTURES:")

# Nested if statements
user_role = "admin"
user_age = 25

if user_role == "admin":
    if user_age >= 18:
        print("Full admin access granted")
    else:
        print("Limited admin access (under 18)")
elif user_role == "user":
    if user_age >= 18:
        print("Standard user access")
    else:
        print("Restricted access (under 18)")
else:
    print("Guest access only")

# Nested loops
print("\nMultiplication table (1-3):")
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}", end="  ")
    print()  # New line after each row
print()

# 8. Practical Examples
print("8. PRACTICAL EXAMPLES:")

# Grade calculator
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

scores = [95, 87, 72, 55, 100]
for score in scores:
    grade = calculate_grade(score)
    print(f"Score: {score} -> Grade: {grade}")

# Password strength checker
def check_password_strength(password):
    has_letter = any(c.isalpha() for c in password)
    has_digit = any(c.isdigit() for c in password)
    has_special = any(c in "!@#$%^&*" for c in password)
    
    if len(password) >= 8 and has_letter and has_digit and has_special:
        return "Strong"
    elif len(password) >= 6 and has_letter and has_digit:
        return "Medium"
    else:
        return "Weak"

passwords = ["abc123", "password123!", "weak", "StrongPass1!"]
for pwd in passwords:
    strength = check_password_strength(pwd)
    print(f"Password '{pwd}': {strength}")

print("\n=== End of Control Flow ===") 