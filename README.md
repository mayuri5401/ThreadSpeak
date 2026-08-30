# 🧵 ThreadSpeak — Java & System Design Learning Platform

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-thread--speak.vercel.app-0070f3?style=for-the-badge)](https://thread-speak.vercel.app)
[![Frontend](https://img.shields.io/badge/React_18-Vite_5-61DAFB?style=for-the-badge&logo=react)](https://thread-speak.vercel.app)
[![Backend](https://img.shields.io/badge/Spring_Boot_3-Microservices-6DB33F?style=for-the-badge&logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java_17-OpenJDK-ED8B00?style=for-the-badge&logo=openjdk)](https://openjdk.org/)

An interactive, enterprise-grade learning platform for **Core Java**, **Spring Boot**, **System Design (LLD & HLD)**, and **DSA** — with live code execution, interactive visualizers, quizzes, and AI narration.

</div>

---

## 📋 Table of Contents

- [🌐 Live URLs](#-live-urls)
- [🏛️ Architecture Overview](#️-architecture-overview)
- [🗂️ Project Structure](#️-project-structure)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Quick Start — Frontend Only (Recommended)](#-quick-start--frontend-only-recommended)
- [🔧 Full Stack Local Setup](#-full-stack-local-setup)
  - [Method 1: PowerShell One-Click Launcher](#method-1-powershell-one-click-launcher-windows)
  - [Method 2: Run Services Manually](#method-2-run-each-service-manually)
  - [Method 3: Docker Compose](#method-3-docker-compose)
- [🌍 Service Port Map & URLs](#-service-port-map--urls)
- [🔌 API Endpoints Reference](#-api-endpoints-reference)
- [🗄️ Database Info](#️-database-info)
- [🔄 Service Communication Flow](#-service-communication-flow)
- [🧱 Tech Stack](#-tech-stack)
- [📁 Frontend Architecture](#-frontend-architecture)
- [📦 Environment Variables](#-environment-variables)

---

## 🌐 Live URLs

| Resource | URL |
|---|---|
| **🌐 Production App** | [https://thread-speak.vercel.app](https://thread-speak.vercel.app) |
| **GitHub Repository** | [https://github.com/mayuri5401/ThreadSpeak](https://github.com/mayuri5401/ThreadSpeak) |
| **Frontend (local dev)** | [http://localhost:5173](http://localhost:5173) |
| **API Gateway (local)** | [http://localhost:8080](http://localhost:8080) |
| **Eureka Dashboard (local)** | [http://localhost:8761](http://localhost:8761) |
| **Content Service (local)** | [http://localhost:8081](http://localhost:8081) |
| **User Service (local)** | [http://localhost:8082](http://localhost:8082) |
| **Quiz Service (local)** | [http://localhost:8083](http://localhost:8083) |
| **Code Runner (local)** | [http://localhost:8084](http://localhost:8084) |

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│               User Browser / Vercel CDN                             │
│         https://thread-speak.vercel.app  (React + Vite)            │
└─────────────────────────┬───────────────────────────────────────────┘
                          │  HTTP / REST
                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│              API Gateway  :8080  (Spring Cloud Gateway)             │
│    Routes: /api/tracks/**  /api/topics/**  /api/progress/**         │
│            /api/quizzes/**  /api/code/**   /system-design/**        │
└──────┬────────────────┬────────────────────┬───────────────┬────────┘
       │                │                    │               │
       ▼                ▼                    ▼               ▼
┌──────────────┐ ┌──────────────┐ ┌───────────────┐ ┌──────────────────┐
│   CONTENT    │ │    USER      │ │     QUIZ      │ │   CODE RUNNER    │
│   SERVICE    │ │   SERVICE   │ │    SERVICE    │ │     SERVICE      │
│   :8081      │ │   :8082     │ │    :8083      │ │     :8084        │
│              │ │              │ │               │ │                  │
│ Topics       │ │ XP / Streaks │ │ MCQ Engine    │ │ Java Sandbox     │
│ Tracks       │ │ Bookmarks    │◄│ (Feign→User)  │ │ Code Execution   │
│ Curriculum   │ │ Badges       │ │ Leaderboard   │ │ Simulators       │
│ Markdown MD  │ │ H2 / PgSQL   │ │               │ │                  │
└──────────────┘ └──────────────┘ └───────────────┘ └──────────────────┘
       │                │                    │               │
       └────────────────┴────────────────────┴───────────────┘
                                  │
                          ┌───────▼────────┐
                          │ Eureka Server  │
                          │    :8761       │
                          │ Service Disco  │
                          └────────────────┘
```

---

## 🗂️ Project Structure

```
ThreadSpeak/
├── frontend/                         # React 18 + Vite 5 SPA
│   ├── public/
│   │   └── curriculum/               # 540 static markdown topic files (served on Vercel)
│   ├── src/
│   │   ├── shell/AppShell.jsx        # Root micro-frontend shell
│   │   ├── microfrontends/
│   │   │   ├── mfe-content/          # Topic browser & notes viewer
│   │   │   ├── mfe-user-progress/    # XP, streaks, progress dashboard
│   │   │   ├── mfe-code-runner/      # Java playground & code execution
│   │   │   └── mfe-quiz/             # Quiz & assessment engine
│   │   ├── components/
│   │   │   ├── visualizers/          # 60+ interactive topic visualizers
│   │   │   ├── topics/               # TopicViewer, MarkdownRenderer, etc.
│   │   │   └── layout/               # Navbar, Footer, Sidebar
│   │   └── shared/
│   │       ├── api/
│   │       │   ├── gatewayClient.js  # Central API dispatcher
│   │       │   └── curriculumIndex.json  # topic-id → static file map (538 topics)
│   │       ├── events/MfeEventBus.js # Cross-MFE event system
│   │       └── utils/                # URL router, confetti, helpers
│   ├── vercel.json                   # Vercel deploy config (SPA rewrites)
│   └── vite.config.js                # Vite + dev proxy config
│
└── backend/                          # Spring Boot 3 Microservices
    ├── eureka-server/                # Netflix Eureka (Port 8761)
    ├── api-gateway/                  # Spring Cloud Gateway (Port 8080)
    ├── content-service/              # Topics & Curriculum API (Port 8081)
    │   └── resources/curriculum/    # Source markdown files
    ├── user-service/                 # User Progress & XP (Port 8082)
    ├── quiz-service/                 # Quiz Engine (Port 8083)
    ├── code-runner-service/          # Java Sandbox (Port 8084)
    ├── docker-compose.yml            # Full stack Docker setup
    └── start-all.ps1                 # One-click Windows launcher
```

---

## ⚙️ Prerequisites

### Frontend
| Tool | Version | Check |
|---|---|---|
| Node.js | >= 18.x | `node --version` |
| npm | >= 9.x | `npm --version` |

### Backend
| Tool | Version | Check |
|---|---|---|
| Java JDK | 17 (LTS) | `java --version` |
| Maven | >= 3.9.x | `mvn --version` |
| Docker (optional) | >= 24.x | `docker --version` |

---

## 🚀 Quick Start — Frontend Only (Recommended)

> The production app on Vercel loads all 538 topic notes as static files — **no backend needed** for reading content.

```bash
# 1. Clone the repository
git clone https://github.com/mayuri5401/ThreadSpeak.git
cd ThreadSpeak

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — all topic content loads from static markdown files automatically.

---

## 🔧 Full Stack Local Setup

### Method 1: PowerShell One-Click Launcher (Windows)

> Launches all 6 services in separate terminal windows automatically.

```powershell
# Step 1: Build all backend services (first time only)
cd ThreadSpeak\backend
mvn clean package -DskipTests

# Step 2: Run the launcher
.\start-all.ps1
```

Wait ~30 seconds for all services to start, then:
- Open [http://localhost:5173](http://localhost:5173) for the frontend
- Open [http://localhost:8761](http://localhost:8761) for the Eureka dashboard

---

### Method 2: Run Each Service Manually

Open **6 separate terminals** and run each command:

#### Terminal 1 — Eureka Discovery Server (Start First!)
```bash
cd ThreadSpeak/backend/eureka-server
mvn spring-boot:run
# Wait for: "Started EurekaServerApplication"
# URL: http://localhost:8761
```

#### Terminal 2 — API Gateway
```bash
cd ThreadSpeak/backend/api-gateway
mvn spring-boot:run
# URL: http://localhost:8080
```

#### Terminal 3 — Content Service
```bash
cd ThreadSpeak/backend/content-service
mvn spring-boot:run
# URL: http://localhost:8081
```

#### Terminal 4 — User Service
```bash
cd ThreadSpeak/backend/user-service
mvn spring-boot:run
# URL: http://localhost:8082
# H2 Console: http://localhost:8082/h2-console
```

#### Terminal 5 — Quiz Service
```bash
cd ThreadSpeak/backend/quiz-service
mvn spring-boot:run
# URL: http://localhost:8083
```

#### Terminal 6 — Code Runner Service
```bash
cd ThreadSpeak/backend/code-runner-service
mvn spring-boot:run
# URL: http://localhost:8084
```

#### Terminal 7 — Frontend
```bash
cd ThreadSpeak/frontend
npm install
npm run dev
# URL: http://localhost:5173
```

> ⚠️ **Important:** Always start Eureka Server first and wait for it to fully start before launching other services.

---

### Method 3: Docker Compose

```bash
# Step 1: Build all JARs
cd ThreadSpeak/backend
mvn clean package -DskipTests

# Step 2: Start all containers
docker-compose up -d

# Step 3: Check running containers
docker ps

# Step 4: View logs for a specific service
docker logs threadspeak-content-service -f

# Step 5: Stop all services
docker-compose down
```

| Container Name | Port |
|---|---|
| `threadspeak-eureka` | 8761 |
| `threadspeak-gateway` | 8080 |
| `threadspeak-content-service` | 8081 |
| `threadspeak-user-service` | 8082 |
| `threadspeak-quiz-service` | 8083 |
| `threadspeak-code-runner-service` | 8084 |

---

## 🌍 Service Port Map & URLs

| Service | Port | Local URL | Dashboard / Console |
|---|---|---|---|
| **Eureka Discovery** | `8761` | http://localhost:8761 | http://localhost:8761 *(dashboard)* |
| **API Gateway** | `8080` | http://localhost:8080 | http://localhost:8080/actuator/gateway/routes |
| **Content Service** | `8081` | http://localhost:8081 | http://localhost:8081/actuator/health |
| **User Service** | `8082` | http://localhost:8082 | http://localhost:8082/h2-console |
| **Quiz Service** | `8083` | http://localhost:8083 | http://localhost:8083/actuator/health |
| **Code Runner** | `8084` | http://localhost:8084 | http://localhost:8084/actuator/health |
| **Frontend** | `5173` | http://localhost:5173 | — |
| **Production** | `443` | https://thread-speak.vercel.app | — |

---

## 🔌 API Endpoints Reference

### Content Service `/api` (via Gateway :8080)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tracks` | Get all learning tracks (Core Java, Spring Boot, DSA, System Design) |
| `GET` | `/api/topics` | Get all topics (optional: `?trackId=core-java`) |
| `GET` | `/api/topics/{id}` | Get full topic detail with notes markdown |
| `GET` | `/api/topics?q={query}` | Search topics by keyword |
| `GET` | `/system-design/**` | System Design specific content |

**Example:**
```bash
curl http://localhost:8080/api/tracks
curl http://localhost:8080/api/topics?trackId=core-java
curl http://localhost:8080/api/topics/java-intro-what-is-java
```

---

### User Service `/api` (via Gateway :8080)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/progress/{userId}` | Get user's full progress (XP, streaks, completed topics) |
| `POST` | `/api/progress/{userId}/topic/{topicId}/complete` | Mark topic as completed, award XP |
| `POST` | `/api/progress/{userId}/bookmark/{topicId}` | Toggle topic bookmark |
| `GET` | `/api/users/{userId}` | Get user profile |

**Example:**
```bash
curl http://localhost:8080/api/progress/guest-user
curl -X POST http://localhost:8080/api/progress/guest-user/topic/java-intro-what-is-java/complete
```

---

### Quiz Service `/api` (via Gateway :8080)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/quizzes` | Get all available quizzes |
| `GET` | `/api/quizzes?topicId={id}` | Get quizzes for a specific topic |
| `POST` | `/api/quizzes/evaluate` | Submit answers and get score + XP |

---

### Code Runner Service `/api` (via Gateway :8080)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/code/run` | Execute Java code in sandbox |
| `POST` | `/api/simulators/**` | Run interactive simulations |

---

### Actuator Health Endpoints

```bash
# Check all services are healthy
curl http://localhost:8080/actuator/health    # API Gateway
curl http://localhost:8081/actuator/health    # Content Service
curl http://localhost:8082/actuator/health    # User Service
curl http://localhost:8083/actuator/health    # Quiz Service
curl http://localhost:8084/actuator/health    # Code Runner

# API Gateway routes
curl http://localhost:8080/actuator/gateway/routes
```

---

## 🗄️ Database Info

### User Service — H2 (default, in-memory/file)
- **Console URL:** http://localhost:8082/h2-console
- **JDBC URL:** `jdbc:h2:file:./data/user_db`
- **Username:** `sa` | **Password:** *(empty)*

### PostgreSQL (production override)
Set these environment variables to switch to PostgreSQL:
```env
DB_URL=jdbc:postgresql://localhost:5432/threadspeak
DB_DRIVER=org.postgresql.Driver
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
```

### Content Service — File-based Markdown
All curriculum content is stored as `.md` files:
```
backend/content-service/src/main/resources/curriculum/
├── core-java/          (16 categories, 200+ topics)
├── spring-boot/        (7 categories)
├── system-design/      (50+ categories, LLD + HLD)
└── dsa/                (Data Structures & Algorithms)
```

---

## 🔄 Service Communication Flow

### Content Loading Flow
```
Browser → API Gateway (:8080) → Content Service (:8081)
                                        ↓
                                Reads .md files from resources/curriculum/
                                Parses YAML frontmatter + body
                                Returns JSON topic object
```

### Quiz Submission Flow
```
Browser → API Gateway (:8080) → Quiz Service (:8083)
                                        ↓
                                @FeignClient → User Service (:8082)
                                        ↓
                                Awards XP, updates streak, saves to H2/PostgreSQL
```

### Service Discovery Flow
```
All services register with Eureka (:8761) on startup
API Gateway uses lb://SERVICE-NAME for load-balanced routing
Eureka heartbeats every 30s to detect service health
```

---

## 🧱 Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Markdown | marked.js + highlight.js |
| Diagrams | Mermaid.js |
| Math | KaTeX |
| Animations | canvas-confetti |
| Deployment | Vercel (CDN) |

### Backend
| Layer | Technology |
|---|---|
| Language | Java 17 |
| Framework | Spring Boot 3 |
| API Gateway | Spring Cloud Gateway |
| Service Discovery | Netflix Eureka |
| Inter-service | OpenFeign |
| ORM | Spring Data JPA + Hibernate |
| Database | H2 (dev) / PostgreSQL (prod) |
| Build | Maven |
| Containerization | Docker + Docker Compose |

---

## 📁 Frontend Architecture

The frontend uses a **Micro-Frontend Shell Architecture**:

```
AppShell (orchestrator)
├── mfe-content         → Topic browser, notes, visualizers
├── mfe-user-progress   → Progress dashboard, XP, bookmarks
├── mfe-code-runner     → Java playground (code execution)
└── mfe-quiz            → Quiz engine with scoring
```

**API Fallback Strategy (works without backend):**
1. **Tier 1:** Live API via API Gateway (`:8080`)
2. **Tier 2:** Hardcoded JS fallback data (metadata)
3. **Tier 3:** Static `.md` files from `/curriculum/` (full content, 538 topics, served by Vercel)

---

## 📦 Environment Variables

### Frontend (`.env` in `frontend/`)
```env
# No required env vars — works out of the box
# API base URL auto-detects local vs production
```

### Backend Services
```env
# Content Service (8081)
SERVER_PORT=8081
EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://localhost:8761/eureka/

# User Service (8082)
SERVER_PORT=8082
DB_URL=jdbc:h2:file:./data/user_db
DB_USERNAME=sa
DB_PASSWORD=

# Quiz Service (8083)
SERVER_PORT=8083

# Code Runner (8084)
SERVER_PORT=8084

# For Docker Compose, override Eureka URL:
EUREKA_CLIENT_SERVICEURL_DEFAULTZONE=http://eureka-server:8761/eureka/
```

---

## 🏷️ Available Learning Tracks

| Track | Topics | Focus |
|---|---|---|
| **Core & Advanced Java** | 200+ | OOP, JVM, Collections, Multithreading, Java 8-21 |
| **Spring Boot & Microservices** | 50+ | IoC/DI, JPA, Spring Security, REST APIs |
| **System Design (LLD & HLD)** | 250+ | SOLID, Design Patterns, Distributed Systems |
| **DSA in Java** | 40+ | Arrays, Trees, Graphs, DP, Interview Problems |

---

<div align="center">

Built with ❤️ by **mayuri5401** | [thread-speak.vercel.app](https://thread-speak.vercel.app)

</div>
