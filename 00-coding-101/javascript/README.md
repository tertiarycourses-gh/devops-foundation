# JavaScript Programming Fundamentals

## Overview

JavaScript is a powerful programming language that runs in web browsers and on servers (Node.js). It's essential for web development and increasingly popular in DevOps for automation and tool development.

## Why JavaScript?

- **Web Development**: Frontend and backend development
- **Node.js**: Server-side JavaScript for DevOps tools
- **Universal**: Runs everywhere (browser, server, desktop)
- **Modern**: Rich ecosystem of libraries and frameworks
- **DevOps Integration**: Great for automation and scripting

## Setup Instructions

### 1. Install Node.js

**Windows:**

1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer (includes npm)
3. Verify: `node --version` and `npm --version`

**macOS:**

```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Linux:**

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo yum install -y nodejs
```

### 2. Install VS Code

1. Download from [code.visualstudio.com](https://code.visualstudio.com/)
2. Install JavaScript extensions:
   - JavaScript (ES6) code snippets
   - Node.js Extension Pack
3. Create a new folder for your JavaScript projects

### 3. Verify Installation

```bash
node --version
npm --version
```

## Learning Path

### Step 1: Basics (Start Here)

1. **Variables and Data Types** (`basics/variables.js`)

   - Numbers, strings, booleans
   - Variable declaration (var, let, const)

2. **Control Flow** (`basics/control_flow.js`)

   - If/else statements
   - Loops (for, while, forEach)

3. **Functions** (`basics/functions.js`)
   - Function declaration and expressions
   - Arrow functions
   - Parameters and return values

### Step 2: Exercises

1. **Calculator** (`exercises/calculator.js`)

   - Basic arithmetic operations
   - User input handling with readline

2. **Simple Game** (`exercises/simple_game.js`)

   - Random number generation
   - Game logic and loops

3. **File Operations** (`exercises/file_operations.js`)
   - Reading and writing files with fs module
   - Data processing

### Step 3: Projects

1. **Todo App** (`projects/todo_app.js`)

   - Array operations
   - Command-line interface

2. **Web Server** (`projects/web_server.js`)
   - HTTP server with Express
   - REST API basics

## Running Your Code

### Method 1: Command Line

```bash
# Navigate to the file directory
cd 00-coding-101/javascript/basics

# Run a JavaScript file
node variables.js
```

### Method 2: VS Code

1. Open the file in VS Code
2. Press `F5` or click the "Run" button
3. Or use the integrated terminal: `Ctrl+`` (backtick)

### Method 3: Interactive Mode

```bash
# Start Node.js interactive shell
node

# Then type commands directly
> console.log("Hello, World!")
> .exit
```

### Method 4: Browser Console

1. Open browser (Chrome, Firefox, etc.)
2. Press `F12` to open Developer Tools
3. Go to Console tab
4. Type JavaScript code directly

## Code Examples

### Basic Syntax

```javascript
// Variables
let name = "Alice";
const age = 25;
let isStudent = true;

// Template literals
console.log(`Hello, ${name}! You are ${age} years old.`);

// Arrays
let fruits = ["apple", "banana", "orange"];
fruits.push("grape");

// Objects
let person = {
  name: "Bob",
  age: 30,
  city: "New York",
};
```

### Functions

```javascript
// Function declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// Arrow function
const addNumbers = (a, b) => a + b;

// Function expression
const multiply = function (a, b) {
  return a * b;
};

// Using functions
let message = greet("World");
let result = addNumbers(5, 3);
```

### Control Flow

```javascript
// If statements
let age = 18;
if (age >= 18) {
  console.log("You are an adult");
} else if (age >= 13) {
  console.log("You are a teenager");
} else {
  console.log("You are a child");
}

// Loops
for (let i = 0; i < 5; i++) {
  console.log(`Count: ${i}`);
}

// ForEach with arrays
let numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(`Number: ${num}`);
});

// While loop
let count = 0;
while (count < 3) {
  console.log(`Count: ${count}`);
  count++;
}
```

### Modern JavaScript Features

```javascript
// Destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
let { name, age } = { name: "Alice", age: 25 };

// Spread operator
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];

// Arrow functions
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map((n) => n * 2);
let evens = numbers.filter((n) => n % 2 === 0);
```

## Node.js Specific Features

### File System Operations

```javascript
const fs = require("fs");

// Reading files
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log(data);
});

// Writing files
fs.writeFile("output.txt", "Hello World!", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully");
});
```

### HTTP Server

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!");
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
```

## Best Practices

### Code Style

- Use meaningful variable names
- Add comments to explain complex logic
- Follow consistent indentation
- Use semicolons consistently
- Prefer const over let when possible

### File Organization

- Keep related code in the same file
- Use functions to organize code
- Import modules at the top
- Handle errors gracefully

### Modern JavaScript

- Use let/const instead of var
- Prefer arrow functions for callbacks
- Use template literals for strings
- Use destructuring when appropriate

## Common Errors and Solutions

### Syntax Errors

```javascript
// Wrong: Missing semicolon or bracket
if (x > 5 {
    console.log("x is greater than 5")

// Correct:
if (x > 5) {
    console.log("x is greater than 5");
}
```

### Reference Errors

```javascript
// Wrong: Using undefined variable
console.log(undefinedVariable);

// Correct: Define variable first
let myVariable = "Hello";
console.log(myVariable);
```

### Type Errors

```javascript
// Wrong: Calling method on wrong type
let number = 42;
number.toUpperCase(); // Error: toUpperCase is not a function

// Correct: Convert to string first
let number = 42;
number.toString().toUpperCase();
```

## Next Steps

After completing the basics:

1. **Practice**: Work through all exercises
2. **Build**: Complete the projects
3. **Explore**: Learn about npm packages
4. **Connect**: Join JavaScript communities

## Additional Resources

- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Eloquent JavaScript](https://eloquentjavascript.net/)
- [JavaScript.info](https://javascript.info/)
- [Node.js Documentation](https://nodejs.org/docs/)

## Troubleshooting

### Node.js Not Found

```bash
# Check if Node.js is installed
node --version
npm --version

# If not found, install Node.js
```

### Permission Errors

```bash
# On macOS/Linux, you might need:
chmod +x your_script.js
```

### Module Not Found

```bash
# Install missing packages
npm install package_name

# Or install globally
npm install -g package_name
```

### Port Already in Use

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>
```

---

**Ready to start coding in JavaScript? Begin with the basics and work your way up! 🚀**

_Remember: JavaScript is everywhere - in browsers, servers, and even IoT devices. Master it and you'll be unstoppable!_
