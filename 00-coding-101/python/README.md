# Python Programming Fundamentals

## Overview

Python is a versatile, beginner-friendly programming language that's widely used in DevOps, data science, web development, and automation. This guide will teach you Python fundamentals through hands-on exercises and projects.

## Why Python?

- **Easy to Learn**: Simple, readable syntax
- **Versatile**: Used in web development, data science, automation, DevOps
- **Large Community**: Extensive libraries and resources
- **DevOps Friendly**: Great for scripting, automation, and tool development

## Setup Instructions

### 1. Install Python

**Windows:**

1. Download from [python.org](https://www.python.org/downloads/)
2. Run installer (check "Add Python to PATH")
3. Verify: `python --version`

**macOS:**

```bash
# Using Homebrew
brew install python

# Or download from python.org
```

**Linux:**

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# CentOS/RHEL
sudo yum install python3 python3-pip
```

### 2. Install VS Code

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install Python extension
3. Create a new folder for your Python projects

### 3. Verify Installation

```bash
python --version
pip --version
```

## Learning Path

### Step 1: Basics (Start Here)

1. **Variables and Data Types** (`basics/variables.py`)

   - Numbers, strings, booleans
   - Variable assignment and naming

2. **Control Flow** (`basics/control_flow.py`)

   - If/else statements
   - Loops (for, while)

3. **Functions** (`basics/functions.py`)
   - Function definition and calling
   - Parameters and return values

### Step 2: Exercises

1. **Calculator** (`exercises/calculator.py`)

   - Basic arithmetic operations
   - User input handling

2. **Simple Game** (`exercises/simple_game.py`)

   - Random number generation
   - Game logic and loops

3. **File Operations** (`exercises/file_operations.py`)
   - Reading and writing files
   - Data processing

### Step 3: Projects

1. **Todo App** (`projects/todo_app.py`)

   - List operations
   - User interface basics

2. **Web Scraper** (`projects/web_scraper.py`)
   - HTTP requests
   - Data extraction

## Running Your Code

### Method 1: Command Line

```bash
# Navigate to the file directory
cd 00-coding-101/python/basics

# Run a Python file
python variables.py
```

### Method 2: VS Code

1. Open the file in VS Code
2. Press `F5` or click the "Run" button
3. Or use the integrated terminal: `Ctrl+`` (backtick)

### Method 3: Interactive Mode

```bash
# Start Python interactive shell
python

# Then type commands directly
>>> print("Hello, World!")
>>> exit()
```

## Code Examples

### Basic Syntax

```python
# Variables
name = "Alice"
age = 25
is_student = True

# Print statements
print(f"Hello, {name}! You are {age} years old.")

# Lists
fruits = ["apple", "banana", "orange"]
fruits.append("grape")

# Dictionaries
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}
```

### Functions

```python
def greet(name):
    return f"Hello, {name}!"

def add_numbers(a, b):
    return a + b

# Using functions
message = greet("World")
result = add_numbers(5, 3)
```

### Control Flow

```python
# If statements
age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Loops
for i in range(5):
    print(f"Count: {i}")

# While loop
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1
```

## Best Practices

### Code Style

- Use meaningful variable names
- Add comments to explain complex logic
- Follow PEP 8 style guidelines
- Use proper indentation (4 spaces)

### File Organization

- Keep related code in the same file
- Use functions to organize code
- Import libraries at the top
- Handle errors gracefully

### Testing

- Test your code with different inputs
- Use print statements for debugging
- Write simple test cases
- Validate user input

## Common Errors and Solutions

### Syntax Errors

```python
# Wrong: Missing colon
if x > 5
    print("x is greater than 5")

# Correct:
if x > 5:
    print("x is greater than 5")
```

### Indentation Errors

```python
# Wrong: Inconsistent indentation
def my_function():
print("This will cause an error")

# Correct:
def my_function():
    print("This is correct")
```

### Name Errors

```python
# Wrong: Using undefined variable
print(undefined_variable)

# Correct: Define variable first
my_variable = "Hello"
print(my_variable)
```

## Next Steps

After completing the basics:

1. **Practice**: Work through all exercises
2. **Build**: Complete the projects
3. **Explore**: Try additional Python libraries
4. **Connect**: Join Python communities

## Additional Resources

- [Python Official Documentation](https://docs.python.org/3/)
- [Real Python Tutorials](https://realpython.com/)
- [Python for Everybody](https://www.py4e.com/)
- [Automate the Boring Stuff](https://automatetheboringstuff.com/)

## Troubleshooting

### Python Not Found

```bash
# Check if Python is installed
python --version
python3 --version

# If not found, install Python
```

### Permission Errors

```bash
# On macOS/Linux, you might need:
chmod +x your_script.py
```

### Import Errors

```bash
# Install missing packages
pip install package_name

# Or use pip3
pip3 install package_name
```

---

**Ready to start coding in Python? Begin with the basics and work your way up! 🐍**

_Remember: Practice makes perfect. Don't be afraid to experiment and make mistakes._
