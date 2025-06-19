# Topic 1: Exploring DevOps

## Overview

This topic introduces the fundamental concepts of DevOps, its business and technical drivers, and provides hands-on experience with essential DevOps tools.

## Learning Objectives

- Understand what DevOps is and why it matters
- Identify business and technical drivers for DevOps adoption
- Set up and verify essential DevOps tools in your local environment

## Lab Activity: Setting Up Your DevOps Environment

### Prerequisites

- A computer with internet access
- Administrator privileges for software installation

### Tools to Install

#### 1. Git

- **Windows**: Download from https://git-scm.com/download/win
- **macOS**: Install via Homebrew: `brew install git`
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)

#### 2. Visual Studio Code

- Download from https://code.visualstudio.com/
- Install recommended extensions:
  - GitLens
  - Docker
  - Kubernetes
  - Python (if applicable)

#### 3. Docker

- **Windows/macOS**: Download Docker Desktop from https://www.docker.com/products/docker-desktop
- **Linux**: Follow instructions at https://docs.docker.com/engine/install/

#### 4. Node.js

- Download from https://nodejs.org/ (LTS version recommended)
- Verify installation: `node --version` and `npm --version`

### Lab Steps

1. **Install all tools** listed above on your system
2. **Verify installations** by running these commands in your terminal:

   ```bash
   git --version
   code --version
   docker --version
   node --version
   npm --version
   ```

3. **Create a test project**:

   ```bash
   mkdir devops-test-project
   cd devops-test-project
   git init
   ```

4. **Create a simple Node.js application**:

   ```bash
   npm init -y
   npm install express
   ```

5. **Create a basic server** (`app.js`):

   ```javascript
   const express = require("express");
   const app = express();
   const port = 3000;

   app.get("/", (req, res) => {
     res.send("Hello DevOps World!");
   });

   app.listen(port, () => {
     console.log(`Server running at http://localhost:${port}`);
   });
   ```

6. **Test your setup**:

   ```bash
   node app.js
   ```

   Visit http://localhost:3000 in your browser

7. **Create a Dockerfile**:

   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 3000
   CMD ["node", "app.js"]
   ```

8. **Build and run with Docker**:
   ```bash
   docker build -t devops-test-app .
   docker run -p 3000:3000 devops-test-app
   ```

### Deliverables

- Screenshots of all tool installations
- Working Node.js application
- Docker container running successfully
- Git repository with your code

### Discussion Questions

1. What challenges did you face during the setup process?
2. How do these tools work together in a DevOps workflow?
3. What other tools might be useful for a DevOps environment?

## Additional Resources

- [Git Documentation](https://git-scm.com/doc)
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
