# Python Variables and Data Types
# This file demonstrates basic variable usage and data types in Python

print("=== Python Variables and Data Types ===\n")

# 1. Numbers
print("1. NUMBERS:")
age = 25
height = 5.9
print(f"Age: {age} (type: {type(age)})")
print(f"Height: {height} (type: {type(height)})")
print()

# 2. Strings
print("2. STRINGS:")
name = "Alice"
message = 'Hello, World!'
multi_line = """
This is a
multi-line string
"""
print(f"Name: {name} (type: {type(name)})")
print(f"Message: {message}")
print(f"Multi-line: {multi_line}")
print()

# 3. Booleans
print("3. BOOLEANS:")
is_student = True
is_working = False
print(f"Is student: {is_student} (type: {type(is_student)})")
print(f"Is working: {is_working}")
print()

# 4. Lists (mutable)
print("4. LISTS:")
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
print(f"Fruits: {fruits} (type: {type(fruits)})")
print(f"Numbers: {numbers}")
print(f"Mixed: {mixed}")

# Adding to list
fruits.append("grape")
print(f"After adding grape: {fruits}")
print()

# 5. Tuples (immutable)
print("5. TUPLES:")
coordinates = (10, 20)
person = ("Bob", 30, "Engineer")
print(f"Coordinates: {coordinates} (type: {type(coordinates)})")
print(f"Person: {person}")
print()

# 6. Dictionaries
print("6. DICTIONARIES:")
person_info = {
    "name": "Charlie",
    "age": 35,
    "city": "New York",
    "skills": ["Python", "JavaScript", "DevOps"]
}
print(f"Person info: {person_info} (type: {type(person_info)})")
print(f"Name: {person_info['name']}")
print(f"Skills: {person_info['skills']}")
print()

# 7. Sets (unique values)
print("7. SETS:")
unique_numbers = {1, 2, 3, 3, 4, 4, 5}  # Duplicates are removed
print(f"Unique numbers: {unique_numbers} (type: {type(unique_numbers)})")
print()

# 8. Type conversion
print("8. TYPE CONVERSION:")
number_string = "42"
converted_number = int(number_string)
print(f"String '{number_string}' converted to number: {converted_number}")

float_number = 3.14
converted_int = int(float_number)
print(f"Float {float_number} converted to int: {converted_int}")

number = 123
converted_string = str(number)
print(f"Number {number} converted to string: '{converted_string}'")
print()

# 9. Variable naming conventions
print("9. VARIABLE NAMING:")
# Good naming examples
user_name = "John"
user_age = 25
is_active = True
total_count = 100

# Python naming conventions:
# - Use snake_case for variables and functions
# - Use UPPER_CASE for constants
# - Use CamelCase for classes
# - Use descriptive names

print(f"User: {user_name}, Age: {user_age}")
print(f"Active: {is_active}, Count: {total_count}")
print()

# 10. Multiple assignment
print("10. MULTIPLE ASSIGNMENT:")
x, y, z = 1, 2, 3
print(f"x={x}, y={y}, z={z}")

# Unpacking lists
colors = ["red", "green", "blue"]
color1, color2, color3 = colors
print(f"Colors: {color1}, {color2}, {color3}")

# Swapping variables
a, b = 10, 20
print(f"Before swap: a={a}, b={b}")
a, b = b, a
print(f"After swap: a={a}, b={b}")
print()

print("=== End of Variables and Data Types ===") 