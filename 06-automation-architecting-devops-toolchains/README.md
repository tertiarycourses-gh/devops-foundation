# Topic 6: Automation & Architecting DevOps Toolchains

## Overview

This topic covers building CI/CD pipelines, cloud fundamentals, containers & orchestration with Kubernetes, microservices architecture, and designing comprehensive DevOps toolchains.

## Learning Objectives

- Build and deploy applications to Kubernetes using Kind
- Understand container orchestration concepts
- Design and implement DevOps toolchains
- Practice cloud-native application deployment
- Learn microservices architecture patterns

## Lab Activity: Kubernetes Deployment with Kind

### Prerequisites

- Docker installed and running
- At least 4GB RAM available
- Basic understanding of containers and Kubernetes concepts
- Completion of previous topics (especially Topic 1 and Topic 3)

### Project Overview

We'll create a complete Kubernetes deployment using Kind (Kubernetes in Docker) to deploy a multi-tier application with proper networking, storage, and monitoring.

### Setup Instructions

#### 1. Install Kind

```bash
# macOS
brew install kind

# Linux
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/

# Windows (using Chocolatey)
choco install kind

# Verify installation
kind version
```

#### 2. Install kubectl

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Windows
# Download from https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/

# Verify installation
kubectl version --client
```

### Project Structure

```
k8s-demo/
├── apps/
│   ├── frontend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   ├── src/
│   │   └── nginx.conf
│   ├── backend/
│   │   ├── Dockerfile
│   │   ├── package.json
│   │   └── src/
│   └── database/
│       └── init.sql
├── k8s/
│   ├── namespaces/
│   ├── configmaps/
│   ├── secrets/
│   ├── deployments/
│   ├── services/
│   ├── ingress/
│   ├── storage/
│   └── monitoring/
├── kind-config.yaml
├── scripts/
└── README.md
```

### Step-by-Step Implementation

#### 1. Create Kind Cluster Configuration

Create `kind-config.yaml`:

```yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: devops-demo
nodes:
  - role: control-plane
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
        protocol: TCP
      - containerPort: 443
        hostPort: 443
        protocol: TCP
      - containerPort: 30000
        hostPort: 30000
        protocol: TCP
  - role: worker
  - role: worker
```

#### 2. Create the Cluster

```bash
# Create the cluster
kind create cluster --config kind-config.yaml

# Verify cluster is running
kubectl cluster-info
kubectl get nodes

# Set context
kubectl config use-context kind-devops-demo
```

#### 3. Application Components

##### 3.1 Frontend Application

Create `apps/frontend/package.json`:

```json
{
  "name": "frontend-app",
  "version": "1.0.0",
  "description": "Frontend application for K8s demo",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.4.0",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Create `apps/frontend/src/index.js`:

```javascript
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "frontend",
    timestamp: new Date().toISOString(),
  });
});

// API proxy to backend
app.get("/api/users", async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://backend-service:3001";
    const response = await axios.get(`${backendUrl}/api/users`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const backendUrl = process.env.BACKEND_URL || "http://backend-service:3001";
    const response = await axios.post(`${backendUrl}/api/users`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Serve HTML
app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>K8s Demo App</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 800px; margin: 0 auto; }
                .form-group { margin: 10px 0; }
                input, button { padding: 10px; margin: 5px; }
                .user-list { margin-top: 20px; }
                .user-item { background: #f5f5f5; padding: 10px; margin: 5px 0; border-radius: 4px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Kubernetes Demo Application</h1>
                <div>
                    <h2>Add New User</h2>
                    <form id="userForm">
                        <div class="form-group">
                            <input type="text" id="name" placeholder="Name" required>
                        </div>
                        <div class="form-group">
                            <input type="email" id="email" placeholder="Email" required>
                        </div>
                        <button type="submit">Add User</button>
                    </form>
                </div>
                <div class="user-list">
                    <h2>Users</h2>
                    <div id="users"></div>
                </div>
            </div>
            <script>
                // Load users on page load
                loadUsers();
                
                // Handle form submission
                document.getElementById('userForm').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const name = document.getElementById('name').value;
                    const email = document.getElementById('email').value;
                    
                    try {
                        await fetch('/api/users', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name, email })
                        });
                        document.getElementById('userForm').reset();
                        loadUsers();
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });
                
                async function loadUsers() {
                    try {
                        const response = await fetch('/api/users');
                        const users = await response.json();
                        const usersDiv = document.getElementById('users');
                        usersDiv.innerHTML = users.map(user => 
                            \`<div class="user-item">
                                <strong>\${user.name}</strong> - \${user.email}
                                <br><small>Created: \${new Date(user.created_at).toLocaleDateString()}</small>
                            </div>\`
                        ).join('');
                    } catch (error) {
                        console.error('Error loading users:', error);
                    }
                }
            </script>
        </body>
        </html>
    `);
});

app.listen(port, () => {
  console.log(`Frontend service running on port ${port}`);
});
```

Create `apps/frontend/Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

##### 3.2 Backend Application

Create `apps/backend/package.json`:

```json
{
  "name": "backend-app",
  "version": "1.0.0",
  "description": "Backend API for K8s demo",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Create `apps/backend/src/index.js`:

```javascript
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
const dbPath = process.env.DB_PATH || "./database/devops_demo.db";
const db = new sqlite3.Database(dbPath);

// Initialize database
async function initDatabase() {
  try {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "backend",
    timestamp: new Date().toISOString(),
  });
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    db.all("SELECT * FROM users ORDER BY created_at DESC", (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new user
app.post("/api/users", async (req, res) => {
  try {
    const { name, email } = req.body;

    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Get the inserted user
        db.get(
          "SELECT * FROM users WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              return res.status(500).json({ error: err.message });
            }
            res.status(201).json(row);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, async () => {
  await initDatabase();
  console.log(`Backend service running on port ${port}`);
});
```

Create `apps/backend/Dockerfile`:

```dockerfile
FROM node:16-alpine

WORKDIR /app

# Install SQLite
RUN apk add --no-cache sqlite

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Create database directory
RUN mkdir -p database

EXPOSE 3001

CMD ["npm", "start"]
```

#### 4. Kubernetes Manifests

##### 4.1 Namespaces

Create `k8s/namespaces/namespace.yaml`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: devops-demo
  labels:
    name: devops-demo
```

##### 4.2 ConfigMaps

Create `k8s/configmaps/configmap.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: devops-demo
data:
  DB_PATH: "/app/database/devops_demo.db"
  BACKEND_URL: "http://backend-service:3001"
```

##### 4.3 Backend Deployment

Create `k8s/deployments/backend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: devops-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
        - name: backend
          image: backend-app:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 3001
          env:
            - name: DB_PATH
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: DB_PATH
          volumeMounts:
            - name: sqlite-storage
              mountPath: /app/database
          livenessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3001
            initialDelaySeconds: 5
            periodSeconds: 5
      volumes:
        - name: sqlite-storage
          persistentVolumeClaim:
            claimName: sqlite-pvc
```

##### 4.4 Frontend Deployment

Create `k8s/deployments/frontend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: devops-demo
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: frontend-app:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
          env:
            - name: BACKEND_URL
              valueFrom:
                configMapKeyRef:
                  name: app-config
                  key: BACKEND_URL
          livenessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
```

##### 4.5 Services

Create `k8s/services/services.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: devops-demo
spec:
  selector:
    app: backend
  ports:
    - port: 3001
      targetPort: 3001
  type: ClusterIP
---
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
  namespace: devops-demo
spec:
  selector:
    app: frontend
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```

##### 4.6 Ingress

Create `k8s/ingress/ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: devops-demo
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
    - host: localhost
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 3000
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: backend-service
                port:
                  number: 3001
```

##### 4.7 Storage

Create `k8s/storage/pvc.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: sqlite-pvc
  namespace: devops-demo
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

#### 5. Deployment Scripts

Create `scripts/deploy.sh`:

```bash
#!/bin/bash

echo "Building Docker images..."

# Build frontend image
docker build -t frontend-app:latest apps/frontend/

# Build backend image
docker build -t backend-app:latest apps/backend/

echo "Loading images into Kind cluster..."
kind load docker-image frontend-app:latest
kind load docker-image backend-app:latest

echo "Creating namespace..."
kubectl apply -f k8s/namespaces/

echo "Creating ConfigMaps..."
kubectl apply -f k8s/configmaps/

echo "Creating storage..."
kubectl apply -f k8s/storage/

echo "Deploying backend..."
kubectl apply -f k8s/deployments/backend-deployment.yaml
kubectl apply -f k8s/services/services.yaml

echo "Waiting for backend to be ready..."
kubectl wait --for=condition=ready pod -l app=backend -n devops-demo --timeout=300s

echo "Deploying frontend..."
kubectl apply -f k8s/deployments/frontend-deployment.yaml

echo "Setting up ingress..."
kubectl apply -f k8s/ingress/

echo "Deployment complete!"
echo "Access the application at: http://localhost"
echo "Check status with: kubectl get pods -n devops-demo"
```

Create `scripts/cleanup.sh`:

```bash
#!/bin/bash

echo "Cleaning up Kubernetes resources..."
kubectl delete namespace devops-demo

echo "Cleaning up Docker images..."
docker rmi frontend-app:latest backend-app:latest

echo "Cleanup complete!"
```

### Lab Steps

#### Step 1: Environment Setup

1. **Install required tools**:

   ```bash
   # Install Kind and kubectl (see setup instructions above)
   # Verify installations
   kind version
   kubectl version --client
   ```

2. **Create Kind cluster**:
   ```bash
   kind create cluster --config kind-config.yaml
   kubectl cluster-info
   ```

#### Step 2: Build and Deploy

1. **Make scripts executable**:

   ```bash
   chmod +x scripts/deploy.sh scripts/cleanup.sh
   ```

2. **Deploy the application**:

   ```bash
   ./scripts/deploy.sh
   ```

3. **Verify deployment**:
   ```bash
   kubectl get pods -n devops-demo
   kubectl get services -n devops-demo
   kubectl get ingress -n devops-demo
   ```

#### Step 3: Test the Application

1. **Access the application**:

   - Open browser and go to http://localhost
   - Test adding users through the web interface

2. **Check application logs**:

   ```bash
   kubectl logs -f deployment/frontend -n devops-demo
   kubectl logs -f deployment/backend -n devops-demo
   ```

3. **Test API directly**:
   ```bash
   kubectl port-forward service/backend-service 3001:3001 -n devops-demo
   curl http://localhost:3001/health
   curl http://localhost:3001/api/users
   ```

#### Step 4: Scaling and Management

1. **Scale the application**:

   ```bash
   kubectl scale deployment frontend --replicas=3 -n devops-demo
   kubectl scale deployment backend --replicas=3 -n devops-demo
   ```

2. **Monitor resources**:

   ```bash
   kubectl top pods -n devops-demo
   kubectl describe nodes
   ```

3. **Update application**:
   ```bash
   # Make changes to application code
   # Rebuild and redeploy
   docker build -t frontend-app:latest apps/frontend/
   kind load docker-image frontend-app:latest
   kubectl rollout restart deployment/frontend -n devops-demo
   ```

#### Step 5: Troubleshooting

1. **Check pod status**:

   ```bash
   kubectl get pods -n devops-demo
   kubectl describe pod <pod-name> -n devops-demo
   ```

2. **Check service connectivity**:

   ```bash
   kubectl exec -it <pod-name> -n devops-demo -- nslookup backend-service
   ```

3. **Check ingress**:
   ```bash
   kubectl describe ingress app-ingress -n devops-demo
   ```

### Expected Outcomes

#### Successful Deployment

- ✅ All pods running and healthy
- ✅ Services accessible within cluster
- ✅ Ingress routing working
- ✅ Application accessible via browser
- ✅ Database persistence working

#### Key Learnings

- Container orchestration with Kubernetes
- Multi-tier application deployment
- Service discovery and networking
- Configuration management
- Health checks and monitoring
- Scaling and updates

### Discussion Questions

1. **Container Orchestration**:

   - What are the benefits of using Kubernetes over Docker Compose?
   - How does Kubernetes handle service discovery?
   - What are the differences between different service types?

2. **DevOps Toolchains**:

   - How would you integrate this with CI/CD pipelines?
   - What monitoring and logging tools would you add?
   - How would you handle secrets management in production?

3. **Microservices Architecture**:

   - What are the advantages of this architecture?
   - How would you handle inter-service communication?
   - What challenges arise with distributed systems?

4. **Production Considerations**:
   - What additional security measures would you implement?
   - How would you handle backup and disaster recovery?
   - What monitoring and alerting would you set up?

### Troubleshooting

#### Common Issues

- **Image pull errors**: Ensure images are loaded into Kind cluster
- **Pod startup failures**: Check logs and resource constraints
- **Service connectivity**: Verify service selectors and endpoints
- **Ingress not working**: Check ingress controller installation

#### Debugging Commands

```bash
# Check pod logs
kubectl logs <pod-name> -n devops-demo

# Describe resources
kubectl describe <resource-type> <resource-name> -n devops-demo

# Execute commands in pods
kubectl exec -it <pod-name> -n devops-demo -- /bin/sh

# Check events
kubectl get events -n devops-demo --sort-by='.lastTimestamp'
```

### Cleanup

```bash
# Clean up everything
./scripts/cleanup.sh

# Delete Kind cluster
kind delete cluster --name devops-demo
```

## Additional Resources

- [Kind Documentation](https://kind.sigs.k8s.io/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Kubernetes in Docker](https://kind.sigs.k8s.io/)
- [Kubernetes Best Practices](https://kubernetes.io/docs/concepts/configuration/overview/)
- [Microservices with Kubernetes](https://kubernetes.io/docs/concepts/services-networking/)
