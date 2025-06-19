// JavaScript Control Flow
// This file demonstrates control flow structures in JavaScript

console.log("=== JavaScript Control Flow ===\n");

// 1. If Statements
console.log("1. IF STATEMENTS:");
let age = 18;

if (age >= 18) {
    console.log("You are an adult");
} else if (age >= 13) {
    console.log("You are a teenager");
} else {
    console.log("You are a child");
}

// Multiple conditions
let temperature = 25;
let humidity = 60;

if (temperature > 30 && humidity > 70) {
    console.log("It's hot and humid!");
} else if (temperature > 25 || humidity > 50) {
    console.log("It's warm or humid");
} else {
    console.log("The weather is pleasant");
}
console.log();

// 2. For Loops
console.log("2. FOR LOOPS:");

// Loop through an array
let fruits = ["apple", "banana", "orange", "grape"];
for (let fruit of fruits) {
    console.log(`I like ${fruit}`);
}

// Traditional for loop
console.log("\nCounting from 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

// Loop with forEach
console.log("\nFruits with forEach:");
fruits.forEach((fruit, index) => {
    console.log(`${index + 1}. ${fruit}`);
});

// Loop through object
let person = { name: "Alice", age: 25, city: "New York" };
console.log("\nPerson details:");
for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}
console.log();

// 3. While Loops
console.log("3. WHILE LOOPS:");

// Simple while loop
let count = 0;
while (count < 3) {
    console.log(`Count: ${count}`);
    count++;
}

// While loop with break
console.log("\nWhile loop with break:");
let number = 0;
while (true) {
    if (number >= 5) {
        break;
    }
    console.log(`Number: ${number}`);
    number++;
}

// While loop with continue
console.log("\nWhile loop with continue:");
let i = 0;
while (i < 10) {
    i++;
    if (i % 2 === 0) { // Skip even numbers
        continue;
    }
    console.log(`Odd number: ${i}`);
}
console.log();

// 4. Array Methods
console.log("4. ARRAY METHODS:");

let numbers = [1, 2, 3, 4, 5];

// Map - transform elements
let squares = numbers.map(x => x ** 2);
console.log(`Numbers: ${numbers}`);
console.log(`Squares: ${squares}`);

// Filter - select elements
let evenNumbers = numbers.filter(x => x % 2 === 0);
console.log(`Even numbers: ${evenNumbers}`);

// Reduce - combine elements
let sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum: ${sum}`);

// Find - find first matching element
let firstEven = numbers.find(x => x % 2 === 0);
console.log(`First even number: ${firstEven}`);

// Some - check if any element matches
let hasEven = numbers.some(x => x % 2 === 0);
console.log(`Has even numbers: ${hasEven}`);

// Every - check if all elements match
let allPositive = numbers.every(x => x > 0);
console.log(`All positive: ${allPositive}`);
console.log();

// 5. Switch Statements
console.log("5. SWITCH STATEMENTS:");

function getDayName(dayNumber) {
    switch (dayNumber) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
        case 7:
            return "Weekend";
        default:
            return "Invalid day";
    }
}

for (let day = 1; day <= 8; day++) {
    console.log(`Day ${day}: ${getDayName(day)}`);
}
console.log();

// 6. Error Handling
console.log("6. ERROR HANDLING:");

function divideNumbers(a, b) {
    try {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Both arguments must be numbers');
        }
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return null;
    } finally {
        console.log("Division operation completed");
    }
}

console.log(`10 / 2 = ${divideNumbers(10, 2)}`);
console.log(`10 / 0 = ${divideNumbers(10, 0)}`);
console.log(`10 / 'abc' = ${divideNumbers(10, 'abc')}`);
console.log();

// 7. Nested Control Structures
console.log("7. NESTED CONTROL STRUCTURES:");

// Nested if statements
let userRole = "admin";
let userAge = 25;

if (userRole === "admin") {
    if (userAge >= 18) {
        console.log("Full admin access granted");
    } else {
        console.log("Limited admin access (under 18)");
    }
} else if (userRole === "user") {
    if (userAge >= 18) {
        console.log("Standard user access");
    } else {
        console.log("Restricted access (under 18)");
    }
} else {
    console.log("Guest access only");
}

// Nested loops
console.log("\nMultiplication table (1-3):");
for (let i = 1; i <= 3; i++) {
    let row = "";
    for (let j = 1; j <= 3; j++) {
        row += `${i} x ${j} = ${i * j}  `;
    }
    console.log(row);
}
console.log();

// 8. Practical Examples
console.log("8. PRACTICAL EXAMPLES:");

// Grade calculator
function calculateGrade(score) {
    if (score >= 90) return "A";
    else if (score >= 80) return "B";
    else if (score >= 70) return "C";
    else if (score >= 60) return "D";
    else return "F";
}

let scores = [95, 87, 72, 55, 100];
scores.forEach(score => {
    let grade = calculateGrade(score);
    console.log(`Score: ${score} -> Grade: ${grade}`);
});

// Password strength checker
function checkPasswordStrength(password) {
    let hasLetter = /[a-zA-Z]/.test(password);
    let hasDigit = /\d/.test(password);
    let hasSpecial = /[!@#$%^&*]/.test(password);
    
    if (password.length >= 8 && hasLetter && hasDigit && hasSpecial) {
        return "Strong";
    } else if (password.length >= 6 && hasLetter && hasDigit) {
        return "Medium";
    } else {
        return "Weak";
    }
}

let passwords = ["abc123", "password123!", "weak", "StrongPass1!"];
passwords.forEach(pwd => {
    let strength = checkPasswordStrength(pwd);
    console.log(`Password '${pwd}': ${strength}`);
});

// 9. Modern JavaScript Features
console.log("\n9. MODERN JAVASCRIPT FEATURES:");

// Optional chaining
let user = {
    profile: {
        name: "John",
        address: {
            city: "New York"
        }
    }
};

console.log(`User city: ${user?.profile?.address?.city}`);
console.log(`User country: ${user?.profile?.address?.country || 'Unknown'}`);

// Nullish coalescing
let defaultValue = null;
let value = defaultValue ?? "Default Value";
console.log(`Value: ${value}`);

// Template literals with expressions
let name = "Alice";
let greeting = `Hello, ${name}! You are ${age} years old.`;
console.log(greeting);

console.log("\n=== End of Control Flow ==="); 