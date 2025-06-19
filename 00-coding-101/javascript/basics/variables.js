// JavaScript Variables and Data Types
// This file demonstrates basic variable usage and data types in JavaScript

console.log("=== JavaScript Variables and Data Types ===\n");

// 1. Variable Declaration
console.log("1. VARIABLE DECLARATION:");
let age = 25;
const name = "Alice";
var oldWay = "not recommended"; // Avoid using var

console.log(`Age: ${age} (type: ${typeof age})`);
console.log(`Name: ${name} (type: ${typeof name})`);
console.log(`Old way: ${oldWay} (type: ${typeof oldWay})`);
console.log();

// 2. Numbers
console.log("2. NUMBERS:");
let integer = 42;
let float = 3.14;
let negative = -10;
let scientific = 1.23e4; // 12300

console.log(`Integer: ${integer} (type: ${typeof integer})`);
console.log(`Float: ${float} (type: ${typeof float})`);
console.log(`Negative: ${negative}`);
console.log(`Scientific: ${scientific}`);
console.log();

// 3. Strings
console.log("3. STRINGS:");
let singleQuotes = 'Hello, World!';
let doubleQuotes = "Hello, World!";
let templateLiteral = `Hello, ${name}! You are ${age} years old.`;
let multiLine = `
This is a
multi-line string
`;

console.log(`Single quotes: ${singleQuotes} (type: ${typeof singleQuotes})`);
console.log(`Double quotes: ${doubleQuotes}`);
console.log(`Template literal: ${templateLiteral}`);
console.log(`Multi-line: ${multiLine}`);
console.log();

// 4. Booleans
console.log("4. BOOLEANS:");
let isStudent = true;
let isWorking = false;

console.log(`Is student: ${isStudent} (type: ${typeof isStudent})`);
console.log(`Is working: ${isWorking}`);
console.log();

// 5. Arrays
console.log("5. ARRAYS:");
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, 3.14];

console.log(`Fruits: ${fruits} (type: ${typeof fruits})`);
console.log(`Numbers: ${numbers}`);
console.log(`Mixed: ${mixed}`);

// Adding to array
fruits.push("grape");
console.log(`After adding grape: ${fruits}`);

// Array methods
console.log(`First fruit: ${fruits[0]}`);
console.log(`Array length: ${fruits.length}`);
console.log();

// 6. Objects
console.log("6. OBJECTS:");
let person = {
    name: "Bob",
    age: 30,
    city: "New York",
    skills: ["JavaScript", "Python", "DevOps"]
};

console.log(`Person: ${JSON.stringify(person)} (type: ${typeof person})`);
console.log(`Name: ${person.name}`);
console.log(`Age: ${person.age}`);
console.log(`Skills: ${person.skills}`);

// Adding properties
person.job = "Developer";
console.log(`After adding job: ${JSON.stringify(person)}`);
console.log();

// 7. Undefined and Null
console.log("7. UNDEFINED AND NULL:");
let undefinedVar;
let nullVar = null;

console.log(`Undefined: ${undefinedVar} (type: ${typeof undefinedVar})`);
console.log(`Null: ${nullVar} (type: ${typeof nullVar})`);
console.log();

// 8. Type conversion
console.log("8. TYPE CONVERSION:");
let numberString = "42";
let convertedNumber = parseInt(numberString);
let convertedFloat = parseFloat("3.14");

console.log(`String '${numberString}' converted to number: ${convertedNumber}`);
console.log(`String '3.14' converted to float: ${convertedFloat}`);

let number = 123;
let convertedString = number.toString();
console.log(`Number ${number} converted to string: '${convertedString}'`);

// Automatic type conversion
console.log(`"5" + 3 = ${"5" + 3}`); // String concatenation
console.log(`"5" - 3 = ${"5" - 3}`); // Number subtraction
console.log();

// 9. Template literals and string interpolation
console.log("9. TEMPLATE LITERALS:");
let firstName = "John";
let lastName = "Doe";
let fullName = `${firstName} ${lastName}`;
let message = `Hello, ${fullName}! Welcome to JavaScript.`;

console.log(`Full name: ${fullName}`);
console.log(`Message: ${message}`);
console.log();

// 10. Destructuring
console.log("10. DESTRUCTURING:");
let colors = ["red", "green", "blue"];
let [firstColor, secondColor, thirdColor] = colors;
console.log(`Colors: ${firstColor}, ${secondColor}, ${thirdColor}`);

let user = {
    username: "johndoe",
    email: "john@example.com",
    role: "admin"
};
let { username, email, role } = user;
console.log(`User: ${username}, Email: ${email}, Role: ${role}`);
console.log();

// 11. Spread operator
console.log("11. SPREAD OPERATOR:");
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];
console.log(`Original array: ${arr1}`);
console.log(`Spread array: ${arr2}`);

let obj1 = { x: 1, y: 2 };
let obj2 = { ...obj1, z: 3 };
console.log(`Original object: ${JSON.stringify(obj1)}`);
console.log(`Spread object: ${JSON.stringify(obj2)}`);
console.log();

// 12. Variable naming conventions
console.log("12. VARIABLE NAMING:");
// Good naming examples
let userName = "John";
let userAge = 25;
let isActive = true;
let totalCount = 100;

// JavaScript naming conventions:
// - Use camelCase for variables and functions
// - Use UPPER_CASE for constants
// - Use PascalCase for classes
// - Use descriptive names

console.log(`User: ${userName}, Age: ${userAge}`);
console.log(`Active: ${isActive}, Count: ${totalCount}`);
console.log();

console.log("=== End of Variables and Data Types ==="); 