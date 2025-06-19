# Topic 2: Core DevOps Principles

## Overview

This topic covers the fundamental principles of DevOps including Continuous Integration (CI), Continuous Delivery (CD), and the Three Ways of DevOps: Flow, Feedback, and Continual Learning.

## Learning Objectives

- Understand Continuous Integration (CI) principles
- Implement a basic CI pipeline using GitHub Actions
- Learn about the Three Ways of DevOps
- Practice automated testing and code quality checks

## Lab Activity: CI Pipeline with GitHub Actions

### Prerequisites

- GitHub account
- Git installed locally
- Basic knowledge of JavaScript/Node.js
- Completion of Topic 1 lab

### Setup Instructions

#### 1. Create a GitHub Repository

1. Go to GitHub.com and create a new repository
2. Name it `devops-ci-demo`
3. Make it public for easier sharing
4. Clone it to your local machine

#### 2. Project Structure

Create the following structure in your repository:

```
devops-ci-demo/
├── src/
│   └── app.js
├── tests/
│   └── app.test.js
├── package.json
├── .eslintrc.js
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

#### 3. Create the Application

Create `src/app.js`:

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
};
```

#### 4. Create Tests

Create `tests/app.test.js`:

```javascript
const { add, subtract, multiply, divide } = require("../src/app");

describe("Calculator Functions", () => {
  test("adds two numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
  });

  test("subtracts two numbers correctly", () => {
    expect(subtract(5, 3)).toBe(2);
    expect(subtract(1, 1)).toBe(0);
  });

  test("multiplies two numbers correctly", () => {
    expect(multiply(2, 3)).toBe(6);
    expect(multiply(-2, 3)).toBe(-6);
  });

  test("divides two numbers correctly", () => {
    expect(divide(6, 2)).toBe(3);
    expect(divide(5, 2)).toBe(2.5);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(5, 0)).toThrow("Division by zero is not allowed");
  });
});
```

#### 5. Package Configuration

Create `package.json`:

```json
{
  "name": "devops-ci-demo",
  "version": "1.0.0",
  "description": "A simple calculator for CI/CD demonstration",
  "main": "src/app.js",
  "scripts": {
    "test": "jest",
    "lint": "eslint src/ tests/",
    "lint:fix": "eslint src/ tests/ --fix"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "jest": "^29.0.0"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```

#### 6. ESLint Configuration

Create `.eslintrc.js`:

```javascript
module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 4],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  },
};
```

#### 7. GitHub Actions Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: |
            coverage/
            test-results/
```

### Lab Steps

1. **Set up the project** following the structure above
2. **Install dependencies** locally:

   ```bash
   npm install
   ```

3. **Test locally**:

   ```bash
   npm run lint
   npm test
   ```

4. **Commit and push** to GitHub:

   ```bash
   git add .
   git commit -m "Initial CI setup"
   git push origin main
   ```

5. **Monitor the CI pipeline**:

   - Go to your GitHub repository
   - Click on the "Actions" tab
   - Watch the workflow run

6. **Make a change and test the pipeline**:
   - Create a new branch: `git checkout -b feature/new-function`
   - Add a new function to `src/app.js`
   - Add corresponding tests
   - Push the branch and create a Pull Request

### Expected Outcomes

#### Successful Pipeline Run

- ✅ All tests pass
- ✅ Linting passes
- ✅ Build completes successfully
- ✅ Artifacts are uploaded

#### Pipeline Triggers

- Push to main branch
- Push to develop branch
- Pull Request to main branch

### Discussion Questions

1. How does CI help catch issues early?
2. What are the benefits of automated testing?
3. How does this pipeline support the "Flow" principle of DevOps?
4. What additional steps could be added to this pipeline?

### Troubleshooting

- If tests fail, check the GitHub Actions logs
- If linting fails, run `npm run lint:fix` locally
- Ensure all dependencies are properly listed in `package.json`

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [ESLint Documentation](https://eslint.org/docs/user-guide/)
- [The Three Ways of DevOps](https://itrevolution.com/the-three-ways-principles-underpinning-devops/)
