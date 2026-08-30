# ThreadSpeak Spring Cloud Microservices Ecosystem

A distributed, enterprise-grade microservice platform for interactive Java, System Design, LLD, HLD, and DSA learning.

---

## 🏛️ Architecture Overview

```
                      +------------------------------------------+
                      |         Frontend (React / Vite)          |
                      |          http://localhost:5173           |
                      +--------------------+---------------------+
                                           |
                                           | HTTP Requests
                                           v
                      +--------------------+---------------------+
                      |           API Gateway (:8080)            |
                      |          Spring Cloud Gateway            |
                      +--------------------+---------------------+
                                           |
                      +--------------------+---------------------+
                      |     Eureka Service Registry (:8761)      |
                      +--------------------+---------------------+
                                           |
    +-------------------+------------------+-------------------+-------------------+
    |                   |                                      |                   |
    v                   v                                      v                   v
+-----------------+ +--------------------+             +-----------------+ +---------------------+
| CONTENT-SERVICE | |    USER-SERVICE    |             |  QUIZ-SERVICE   | | CODE-RUNNER-SERVICE |
|   (Port 8081)   | |    (Port 8082)     |<--[Feign]---|   (Port 8083)   | |     (Port 8084)     |
+-----------------+ +--------------------+             +-----------------+ +---------------------+
| Topics, Tracks  | | XP, Streaks,       |             | MCQs, Scoring,  | | Sandbox Compiler,   |
| System Design   | | Bookmarks, Badges  |             | Real-time Eval  | | Memory Simulator    |
+-----------------+ +--------------------+             +-----------------+ +---------------------+
```

---

## 🚀 Microservice Port & Endpoint Mapping

| Service Name | Port | Spring Cloud Component | Key REST Endpoints |
| :--- | :--- | :--- | :--- |
| **`eureka-server`** | `8761` | Netflix Eureka Server | Discovery Dashboard: `http://localhost:8761` |
| **`api-gateway`** | `8080` | Spring Cloud Gateway | Entry point for all APIs, CORS handler, routing |
| **`content-service`** | `8081` | Spring Boot JPA | `GET /api/tracks`, `GET /api/topics/**`, `GET /system-design/**` |
| **`user-service`** | `8082` | Spring Boot JPA | `GET /api/progress/{userId}`, `POST /api/progress/{userId}/complete/{topicId}` |
| **`quiz-service`** | `8083` | Spring Cloud OpenFeign | `GET /api/quizzes`, `POST /api/quizzes/evaluate` |
| **`code-runner-service`** | `8084` | Java Sandbox Engine | `POST /api/code/run`, `POST /api/simulate/**` |

---

## ⚡ How to Run

### Method 1: Local PowerShell Automated Launcher (Recommended for Local Dev)
```powershell
cd d:\ThreadSpeak\microservices
.\start-all.ps1
```
*This launches Eureka Server, API Gateway, Content Service, User Service, Quiz Service, and Code Runner Service in parallel console windows.*

---

### Method 2: Docker Compose
```bash
cd d:/ThreadSpeak/microservices
mvn clean package -DskipTests
docker-compose up -d
```

---

## 🔄 Inter-Service Communication (OpenFeign)
When a user submits a quiz via API Gateway:
1. `POST http://localhost:8080/api/quizzes/evaluate?userId=user123&topicOrTrackId=core-java`
2. **`api-gateway`** forwards the request to **`quiz-service`** via Eureka discovery (`lb://QUIZ-SERVICE`).
3. **`quiz-service`** calculates the score and triggers the `@FeignClient(name = "user-service")` client.
4. **`user-service`** automatically awards XP and records the score into PostgreSQL.
