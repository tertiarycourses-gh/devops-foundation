# Topic 7: Measurement, Metrics, and Reporting (Advanced)

## Overview

This topic covers the importance of metrics in DevOps, technical metrics (MTTR, Lead Time), business metrics (Customer Satisfaction, ROI), and effective reporting and dashboards.

## Learning Objectives

- Understand the importance of metrics in DevOps
- Learn to implement monitoring and observability
- Practice setting up metrics collection with Prometheus
- Create effective dashboards with Grafana
- Analyze and interpret DevOps metrics

## Lab Activity: Integrating Metrics with Prometheus + Grafana

### Prerequisites

- Docker and Docker Compose installed
- Basic understanding of monitoring concepts
- Completion of previous topics (especially Topic 1 and Topic 3)
- At least 4GB RAM available

### Project Overview

We'll create a comprehensive monitoring solution using Prometheus for metrics collection and Grafana for visualization, monitoring a sample application with various metrics.

### Project Structure

```
metrics-demo/
├── app/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   └── prometheus.yml
├── monitoring/
│   ├── prometheus/
│   │   ├── Dockerfile
│   │   ├── prometheus.yml
│   │   └── rules/
│   ├── grafana/
│   │   ├── Dockerfile
│   │   ├── provisioning/
│   │   └── dashboards/
│   └── alertmanager/
│       ├── Dockerfile
│       └── alertmanager.yml
├── docker-compose.yml
├── scripts/
└── README.md
```

### Step-by-Step Implementation

#### 1. Sample Application with Metrics

Create `app/package.json`:

```json
{
  "name": "metrics-demo-app",
  "version": "1.0.0",
  "description": "Sample application with metrics",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "prom-client": "^14.2.0",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6",
    "redis": "^4.6.7"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

Create `app/src/index.js`:

```javascript
const express = require("express");
const promClient = require("prom-client");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const redis = require("redis");

const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const register = promClient.register;

// Enable default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.5, 1, 2, 5],
});

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const activeConnections = new promClient.Gauge({
  name: "active_connections",
  help: "Number of active connections",
});

const databaseQueryDuration = new promClient.Histogram({
  name: "database_query_duration_seconds",
  help: "Duration of database queries in seconds",
  labelNames: ["query_type"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1],
});

// Database connection
const dbPath = process.env.DB_PATH || "./database/metrics_demo.db";
const db = new sqlite3.Database(dbPath);

// Redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

// Middleware
app.use(cors());
app.use(express.json());

// Metrics middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    };

    httpRequestDurationMicroseconds.observe(labels, duration);
    httpRequestsTotal.inc(labels);
  });

  next();
});

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

    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id),
        amount REAL NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Database initialized");
  } catch (error) {
    console.error("Database initialization error:", error);
  }
}

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "metrics-demo-app",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Metrics endpoint
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (error) {
    res.status(500).end(error);
  }
});

// API endpoints
app.get("/api/users", async (req, res) => {
  const timer = databaseQueryDuration.startTimer();
  try {
    // Check cache first
    const cached = await redisClient.get("users");
    if (cached) {
      timer({ query_type: "select_cached" });
      return res.json(JSON.parse(cached));
    }

    db.all("SELECT * FROM users ORDER BY created_at DESC", (err, rows) => {
      if (err) {
        timer({ query_type: "select_error" });
        return res.status(500).json({ error: err.message });
      }

      // Cache for 5 minutes
      redisClient.setEx("users", 300, JSON.stringify(rows));
      timer({ query_type: "select" });
      res.json(rows);
    });
  } catch (error) {
    timer({ query_type: "select_error" });
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/users", async (req, res) => {
  const timer = databaseQueryDuration.startTimer();
  try {
    const { name, email } = req.body;

    db.run(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email],
      function (err) {
        if (err) {
          timer({ query_type: "insert_error" });
          return res.status(500).json({ error: err.message });
        }

        // Get the inserted user
        db.get(
          "SELECT * FROM users WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              timer({ query_type: "insert_error" });
              return res.status(500).json({ error: err.message });
            }

            // Invalidate cache
            redisClient.del("users");
            timer({ query_type: "insert" });
            res.status(201).json(row);
          }
        );
      }
    );
  } catch (error) {
    timer({ query_type: "insert_error" });
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/orders", async (req, res) => {
  const timer = databaseQueryDuration.startTimer();
  try {
    db.all(
      `
      SELECT o.*, u.name as user_name 
      FROM orders o 
      JOIN users u ON o.user_id = u.id 
      ORDER BY o.created_at DESC
    `,
      (err, rows) => {
        if (err) {
          timer({ query_type: "select_join_error" });
          return res.status(500).json({ error: err.message });
        }
        timer({ query_type: "select_join" });
        res.json(rows);
      }
    );
  } catch (error) {
    timer({ query_type: "select_join_error" });
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/orders", async (req, res) => {
  const timer = databaseQueryDuration.startTimer();
  try {
    const { user_id, amount } = req.body;

    db.run(
      "INSERT INTO orders (user_id, amount) VALUES (?, ?)",
      [user_id, amount],
      function (err) {
        if (err) {
          timer({ query_type: "insert_error" });
          return res.status(500).json({ error: err.message });
        }

        // Get the inserted order
        db.get(
          "SELECT * FROM orders WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              timer({ query_type: "insert_error" });
              return res.status(500).json({ error: err.message });
            }
            timer({ query_type: "insert" });
            res.status(201).json(row);
          }
        );
      }
    );
  } catch (error) {
    timer({ query_type: "insert_error" });
    res.status(500).json({ error: error.message });
  }
});

// Simulate load for testing
app.get("/api/load", async (req, res) => {
  const { duration = 1000, error_rate = 0.1 } = req.query;

  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, Math.random() * duration));

  // Simulate errors
  if (Math.random() < parseFloat(error_rate)) {
    res.status(500).json({ error: "Simulated error" });
  } else {
    res.json({ message: "Load test completed" });
  }
});

// Update active connections gauge
setInterval(() => {
  const connections = Math.floor(Math.random() * 100) + 10;
  activeConnections.set(connections);
}, 5000);

app.listen(port, async () => {
  await initDatabase();
  console.log(`Metrics demo app running on port ${port}`);
});
```

Create `app/Dockerfile`:

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

EXPOSE 3000

CMD ["npm", "start"]
```

#### 2. Prometheus Configuration

Create `monitoring/prometheus/prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "rules/*.yml"

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - alertmanager:9093

scrape_configs:
  - job_name: "prometheus"
    static_configs:
      - targets: ["localhost:9090"]

  - job_name: "metrics-demo-app"
    static_configs:
      - targets: ["app:3000"]
    metrics_path: "/metrics"
    scrape_interval: 10s

  - job_name: "redis"
    static_configs:
      - targets: ["redis-exporter:9121"]

  - job_name: "node-exporter"
    static_configs:
      - targets: ["node-exporter:9100"]
```

Create `monitoring/prometheus/rules/alerts.yml`:

```yaml
groups:
  - name: app_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status_code=~"5.."}[5m]) > 0.1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is {{ $value }} seconds"

      - alert: DatabaseSlowQueries
        expr: histogram_quantile(0.95, rate(database_query_duration_seconds_bucket[5m])) > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: "Slow database queries detected"
          description: "95th percentile query time is {{ $value }} seconds"

      - alert: AppDown
        expr: up{job="metrics-demo-app"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Application is down"
          description: "The metrics demo application is not responding"
```

#### 3. Grafana Configuration

Create `monitoring/grafana/provisioning/datasources/prometheus.yml`:

```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true
```

Create `monitoring/grafana/provisioning/dashboards/dashboard.yml`:

```yaml
apiVersion: 1

providers:
  - name: "default"
    orgId: 1
    folder: ""
    type: file
    disableDeletion: false
    updateIntervalSeconds: 10
    allowUiUpdates: true
    options:
      path: /var/lib/grafana/dashboards
```

Create `monitoring/grafana/dashboards/app-dashboard.json`:

```json
{
  "dashboard": {
    "id": null,
    "title": "DevOps Metrics Dashboard",
    "tags": ["devops", "metrics"],
    "style": "dark",
    "timezone": "browser",
    "panels": [
      {
        "id": 1,
        "title": "HTTP Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 0, "y": 0 }
      },
      {
        "id": 2,
        "title": "Response Time (95th percentile)",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "{{method}} {{route}}"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 12, "y": 0 }
      },
      {
        "id": 3,
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status_code=~\"5..\"}[5m])",
            "legendFormat": "5xx errors"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 0, "y": 8 }
      },
      {
        "id": 4,
        "title": "Database Query Duration",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(database_query_duration_seconds_bucket[5m]))",
            "legendFormat": "{{query_type}}"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 12, "y": 8 }
      },
      {
        "id": 5,
        "title": "Active Connections",
        "type": "stat",
        "targets": [
          {
            "expr": "active_connections"
          }
        ],
        "gridPos": { "h": 4, "w": 6, "x": 0, "y": 16 }
      },
      {
        "id": 6,
        "title": "Application Uptime",
        "type": "stat",
        "targets": [
          {
            "expr": "process_uptime_seconds"
          }
        ],
        "gridPos": { "h": 4, "w": 6, "x": 6, "y": 16 }
      },
      {
        "id": 7,
        "title": "Memory Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "process_resident_memory_bytes / 1024 / 1024"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 0, "y": 20 }
      },
      {
        "id": 8,
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(process_cpu_seconds_total[5m]) * 100"
          }
        ],
        "gridPos": { "h": 8, "w": 12, "x": 12, "y": 20 }
      }
    ],
    "time": {
      "from": "now-1h",
      "to": "now"
    },
    "refresh": "10s"
  }
}
```

#### 4. AlertManager Configuration

Create `monitoring/alertmanager/alertmanager.yml`:

```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ["alertname"]
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: "web.hook"

receivers:
  - name: "web.hook"
    webhook_configs:
      - url: "http://127.0.0.1:5001/"
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
      - monitoring

  app:
    build: ./app
    environment:
      DB_PATH: ./database/metrics_demo.db
      REDIS_URL: redis://redis:6379
    volumes:
      - sqlite_data:/app/database
    ports:
      - "3000:3000"
    depends_on:
      - redis
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus:/etc/prometheus
      - prometheus_data:/prometheus
    command:
      - "--config.file=/etc/prometheus/prometheus.yml"
      - "--storage.tsdb.path=/prometheus"
      - "--web.console.libraries=/etc/prometheus/console_libraries"
      - "--web.console.templates=/etc/prometheus/consoles"
      - "--storage.tsdb.retention.time=200h"
      - "--web.enable-lifecycle"
    networks:
      - monitoring

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - ./monitoring/grafana/provisioning:/etc/grafana/provisioning
      - ./monitoring/grafana/dashboards:/var/lib/grafana/dashboards
      - grafana_data:/var/lib/grafana
    depends_on:
      - prometheus
    networks:
      - monitoring

  alertmanager:
    image: prom/alertmanager:latest
    ports:
      - "9093:9093"
    volumes:
      - ./monitoring/alertmanager:/etc/alertmanager
    command:
      - "--config.file=/etc/alertmanager/alertmanager.yml"
      - "--storage.path=/alertmanager"
    networks:
      - monitoring

  redis-exporter:
    image: oliver006/redis_exporter:latest
    environment:
      REDIS_ADDR: redis://redis:6379
    ports:
      - "9121:9121"
    depends_on:
      - redis
    networks:
      - monitoring

  node-exporter:
    image: prom/node-exporter:latest
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - "--path.procfs=/host/proc"
      - "--path.sysfs=/host/sys"
      - "--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|host|etc)($$|/)"
    networks:
      - monitoring

volumes:
  sqlite_data:
  prometheus_data:
  grafana_data:

networks:
  monitoring:
    driver: bridge
```

#### 6. Load Testing Script

Create `scripts/load-test.sh`:

```bash
#!/bin/bash

echo "Starting load test..."

# Function to generate random users
generate_user() {
    local names=("Alice" "Bob" "Charlie" "Diana" "Eve" "Frank" "Grace" "Henry")
    local domains=("example.com" "test.org" "demo.net" "sample.io")

    local name=${names[$RANDOM % ${#names[@]}]}
    local domain=${domains[$RANDOM % ${#domains[@]}]}
    local email="${name,,}${RANDOM}@${domain}"

    echo "{\"name\":\"$name\",\"email\":\"$email\"}"
}

# Function to generate random orders
generate_order() {
    local user_id=$((RANDOM % 10 + 1))
    local amount=$((RANDOM % 1000 + 10))

    echo "{\"user_id\":$user_id,\"amount\":$amount}"
}

# Test endpoints
while true; do
    # Get users
    curl -s http://localhost:3000/api/users > /dev/null

    # Create user (10% chance)
    if [ $((RANDOM % 10)) -eq 0 ]; then
        user_data=$(generate_user)
        curl -s -X POST http://localhost:3000/api/users \
            -H "Content-Type: application/json" \
            -d "$user_data" > /dev/null
    fi

    # Get orders
    curl -s http://localhost:3000/api/orders > /dev/null

    # Create order (5% chance)
    if [ $((RANDOM % 20)) -eq 0 ]; then
        order_data=$(generate_order)
        curl -s -X POST http://localhost:3000/api/orders \
            -H "Content-Type: application/json" \
            -d "$order_data" > /dev/null
    fi

    # Simulate load (20% chance)
    if [ $((RANDOM % 5)) -eq 0 ]; then
        curl -s "http://localhost:3000/api/load?duration=$((RANDOM % 2000 + 500))" > /dev/null
    fi

    sleep 1
done
```

### Lab Steps

#### Step 1: Environment Setup

1. **Create project structure**:

   ```bash
   mkdir metrics-demo
   cd metrics-demo
   # Create all the files as outlined above
   ```

2. **Start the monitoring stack**:

   ```bash
   docker-compose up -d
   ```

3. **Verify services are running**:
   ```bash
   docker-compose ps
   ```

#### Step 2: Access Monitoring Tools

1. **Prometheus**: http://localhost:9090

   - Go to Status > Targets to see all monitored services
   - Go to Graph to query metrics

2. **Grafana**: http://localhost:3001

   - Login: admin/admin
   - The dashboard should be automatically loaded

3. **Application**: http://localhost:3000
   - Health check: http://localhost:3000/health
   - Metrics: http://localhost:3000/metrics

#### Step 3: Generate Load and Monitor

1. **Start load testing**:

   ```bash
   chmod +x scripts/load-test.sh
   ./scripts/load-test.sh &
   ```

2. **Monitor in Grafana**:

   - Watch the dashboard update in real-time
   - Observe different metrics patterns

3. **Test alerts**:
   - Generate high load to trigger alerts
   - Check AlertManager at http://localhost:9093

#### Step 4: Analyze Metrics

1. **Key Metrics to Monitor**:

   - **MTTR (Mean Time to Recovery)**: Track incident resolution times
   - **Lead Time**: Measure from code commit to production deployment
   - **Deployment Frequency**: Count successful deployments
   - **Change Failure Rate**: Monitor failed deployments

2. **Business Metrics**:
   - **Customer Satisfaction**: Track response times and error rates
   - **Revenue Impact**: Monitor application availability
   - **Cost Efficiency**: Track resource utilization

#### Step 5: Create Custom Dashboards

1. **Create a DevOps Metrics Dashboard**:

   - Deployment frequency
   - Lead time for changes
   - Mean time to recovery
   - Change failure rate

2. **Create a Business Metrics Dashboard**:
   - Application uptime
   - Response times
   - Error rates
   - User activity

### Expected Outcomes

#### Successful Monitoring Setup

- ✅ Prometheus collecting metrics from all services
- ✅ Grafana displaying dashboards
- ✅ Alerts configured and working
- ✅ Application metrics being tracked
- ✅ Infrastructure metrics available

#### Key Metrics Dashboard

- **Technical Metrics**:

  - HTTP request rate and response times
  - Database query performance
  - Application error rates
  - Resource utilization (CPU, memory)

- **Business Metrics**:
  - Application availability
  - User activity patterns
  - Transaction success rates
  - Performance trends

### Discussion Questions

#### 1. Metrics and Measurement

- What are the most important metrics for DevOps success?
- How do you balance technical and business metrics?
- What metrics help identify bottlenecks in your process?

#### 2. Monitoring and Alerting

- How do you set appropriate alert thresholds?
- What's the difference between monitoring and observability?
- How do you avoid alert fatigue?

#### 3. Data-Driven Decisions

- How do you use metrics to drive process improvements?
- What role do dashboards play in team communication?
- How do you measure the ROI of DevOps practices?

#### 4. Advanced Observability

- What additional observability tools would you add?
- How would you implement distributed tracing?
- What logging strategy would you implement?

### Best Practices

#### 1. Metric Collection

- Collect metrics at the right granularity
- Use appropriate metric types (counter, gauge, histogram)
- Include relevant labels for filtering and grouping
- Avoid high-cardinality labels

#### 2. Dashboard Design

- Keep dashboards focused and relevant
- Use appropriate visualizations
- Include context and thresholds
- Make dashboards actionable

#### 3. Alerting Strategy

- Set up alerts for symptoms, not causes
- Use different severity levels
- Include runbooks in alert descriptions
- Regularly review and tune alerts

#### 4. Data Retention

- Plan for appropriate data retention
- Consider cost vs. value of long-term storage
- Implement data archival strategies
- Monitor storage usage

### Troubleshooting

#### Common Issues

- **Prometheus not scraping**: Check target configuration and network connectivity
- **Grafana not loading dashboards**: Verify datasource configuration
- **High cardinality**: Review metric labels and cardinality
- **Performance issues**: Monitor Prometheus resource usage

#### Debugging Commands

```bash
# Check Prometheus targets
curl http://localhost:9090/api/v1/targets

# Check application metrics
curl http://localhost:3000/metrics

# Check Grafana health
curl http://localhost:3001/api/health

# View logs
docker-compose logs prometheus
docker-compose logs grafana
docker-compose logs app
```

### Cleanup

```bash
# Stop all services
docker-compose down

# Remove volumes (optional)
docker-compose down -v

# Remove images (optional)
docker rmi metrics-demo_app
```

## Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [Prometheus Best Practices](https://prometheus.io/docs/practices/)
- [The Four Golden Signals](https://sre.google/sre-book/monitoring-distributed-systems/)
- [DevOps Metrics](https://cloud.google.com/architecture/devops-measuring-slos)
- [Observability Engineering](https://www.oreilly.com/library/view/observability-engineering/9781492076438/)
