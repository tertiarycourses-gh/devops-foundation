# Topic 3: Key DevOps Practices

## Overview

This topic explores essential DevOps practices including Continuous Testing, Integration, Delivery, and Deployment, along with Site Reliability Engineering (SRE), DevSecOps, ChatOps, and Kanban methodologies.

## Learning Objectives

- Understand key DevOps practices and their implementation
- Deploy a multi-container application using Docker Compose
- Learn about microservices architecture
- Practice container orchestration basics

## Lab Activity: Deploying a Microservice with Docker Compose

### Prerequisites

- Docker and Docker Compose installed (from Topic 1)
- Basic understanding of containers
- Git installed

### Project Overview

We'll create a simple microservices application with:

- **Frontend**: React application
- **Backend API**: Node.js/Express service
- **Database**: SQLite
- **Cache**: Redis
- **Load Balancer**: Nginx

### Project Structure

```
microservices-demo/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── database/
├── nginx/
│   ├── Dockerfile
│   └── nginx.conf
├── docker-compose.yml
├── docker-compose.prod.yml
└── README.md
```

### Step-by-Step Implementation

#### 1. Create Project Directory

```bash
mkdir microservices-demo
cd microservices-demo
```

#### 2. Backend Service

Create `backend/package.json`:

```json
{
  "name": "backend-service",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6",
    "redis": "^4.6.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Create `backend/src/server.js`:

```javascript
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const dbPath = process.env.DB_PATH || "./database/devops_demo.db";
const db = new sqlite3.Database(dbPath);

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

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

// Routes
app.get("/health", (req, res) => {
  res.json({ status: "OK", service: "backend", timestamp: new Date() });
});

app.get("/api/users", async (req, res) => {
  try {
    // Check cache first
    const cached = await redisClient.get("users");
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    db.all("SELECT * FROM users ORDER BY created_at DESC", (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Cache for 5 minutes
      redisClient.setEx("users", 300, JSON.stringify(rows));
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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

            // Invalidate cache
            redisClient.del("users");
            res.status(201).json(row);
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, async () => {
  await initDatabase();
  console.log(`Backend service running on port ${port}`);
});
```

Create `backend/Dockerfile`:

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

#### 3. Frontend Service

Create `frontend/package.json`:

```json
{
  "name": "frontend-service",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "axios": "^1.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Create `frontend/src/App.js`:

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/users`, newUser);
      setNewUser({ name: "", email: "" });
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>DevOps Microservices Demo</h1>

        <form onSubmit={handleSubmit} className="user-form">
          <h2>Add New User</h2>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
          />
          <button type="submit">Add User</button>
        </form>

        <div className="users-list">
          <h2>Users</h2>
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <strong>{user.name}</strong> - {user.email}
              <small>{new Date(user.created_at).toLocaleDateString()}</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
```

Create `frontend/src/App.css`:

```css
.App {
  text-align: center;
  padding: 20px;
}

.App-header {
  max-width: 800px;
  margin: 0 auto;
}

.user-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.user-form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.user-form button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.users-list {
  text-align: left;
}

.user-item {
  background: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}

.user-item small {
  color: #666;
  display: block;
  margin-top: 5px;
}
```

Create `frontend/Dockerfile`:

```dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### 4. Nginx Configuration

Create `nginx/nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 5. Docker Compose Configuration

Create `docker-compose.yml`:

```yaml
version: "3.8"

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

  backend:
    build: ./backend
    environment:
      DB_PATH: ./database/devops_demo.db
      REDIS_URL: redis://redis:6379
    volumes:
      - sqlite_data:/app/database
    depends_on:
      - redis
    networks:
      - app-network

  frontend:
    build: ./frontend
    environment:
      REACT_APP_API_URL: http://localhost/api
    depends_on:
      - backend
    networks:
      - app-network

  nginx:
    build: ./nginx
    ports:
      - "80:80"
    depends_on:
      - frontend
      - backend
    networks:
      - app-network

volumes:
  sqlite_data:

networks:
  app-network:
    driver: bridge
```

### Lab Steps

1. **Create the project structure** as outlined above
2. **Build and run the application**:

   ```bash
   docker-compose up --build
   ```

3. **Access the application**:

   - Frontend: http://localhost
   - Backend API: http://localhost/api/health
   - Redis: localhost:6379

4. **Test the application**:

   - Add users through the frontend
   - Check the API directly: `curl http://localhost/api/users`
   - Monitor logs: `docker-compose logs -f`

5. **Scale services**:

   ```bash
   docker-compose up --scale backend=3
   ```

6. **Stop the application**:
   ```bash
   docker-compose down
   ```

### Expected Outcomes

- ✅ Multi-container application running
- ✅ Frontend communicating with backend
- ✅ SQLite database persistence
- ✅ Redis caching working
- ✅ Load balancing through Nginx

### Discussion Questions

1. How does this architecture support microservices principles?
2. What are the benefits of using Docker Compose for development?
3. How could this be extended for production deployment?
4. What monitoring and logging could be added?

### Troubleshooting

- Check container logs: `docker-compose logs [service-name]`
- Verify network connectivity: `docker network ls`
- Ensure ports are not already in use
- Check environment variables are set correctly

## Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Microservices Architecture](https://microservices.io/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
