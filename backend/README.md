# SmartTask Backend

> **"Plan Smarter. Achieve Together."**
>
> AI-Powered Social Task & Time Management Platform — **Hexagonal Architecture**

---

## About

SmartTask is an AI-powered social task and time management platform that combines **intelligent scheduling**, **social accountability**, **gamification**, and **reusable templates** to help users build consistent, productive habits.

It targets students, professionals, and productivity enthusiasts who want a smarter, more engaging approach to daily task management.

### Key Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Scheduling** | Generates personalized daily schedules based on priorities, behavior patterns, and mood check-ins (Gemini / OpenAI) |
| 👥 **Social Accountability** | Share tasks with friends or groups for encouragement, collaboration, and accountability feeds |
| 🏆 **Gamification** | Streaks, productivity scores, badges, leaderboards, and group challenges |
| 📋 **Task Templates** | Community-driven marketplace of reusable templates for routines (morning, study, workout) |
| 🧘 **Focus Mode** | Pomodoro timer with ambient sounds, AI task suggestions, and focus statistics |
| 😊 **Mood Check-ins** | Quick mood tracking that influences AI scheduling recommendations |
| 📊 **Weekly Review** | AI-generated weekly productivity report with charts, insights, and goal tracking |
| 🎯 **Challenges** | Group challenges with leaderboards, team progress, rewards, and achievements |

### Pages / Modules

| Page | Description |
|---|---|
| `Landing` | Hero, features showcase, social proof, CTA |
| `Dashboard` | Task overview, AI schedule, streaks, mood widget |
| `Tasks` | Task CRUD, templates, filters, priority management |
| `Social` | Friends, groups, shared tasks, accountability feed |
| `AI Assistant` | Chat interface, schedule generator, productivity insights |
| `Profile` | User stats, badges, streaks, settings |
| `Onboarding` | Multi-step flow: welcome → productivity quiz → goals → schedule |
| `Focus Mode` | Pomodoro timer, ambient sounds, AI task suggestions |
| `Weekly Review` | AI-generated report with charts and insights |
| `Challenges` | Group challenges, leaderboards, team progress |
| `Templates` | Marketplace with community templates, ratings, downloads |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | Spring Boot | 4.0.4 |
| **Language** | Java | 17 |
| **Architecture** | Hexagonal (Ports & Adapters) | — |
| **Database** | PostgreSQL | Latest |
| **ORM** | Hibernate / Spring Data JPA | — |
| **Migrations** | Flyway | — |
| **Auth** | Spring Security + JJWT + OAuth2 | 0.12.6 |
| **Caching** | Redis | — |
| **Real-time** | Spring WebSocket + STOMP | — |
| **AI Integration** | WebClient (WebFlux) → Gemini/OpenAI | — |
| **Cloud Storage** | GCP Cloud Storage (Presigned URLs) | — |
| **Rate Limiting** | Bucket4j | 8.14.0 |
| **DTO Mapping** | MapStruct | 1.6.3 |
| **Validation** | Jakarta Bean Validation | — |
| **API Docs** | SpringDoc OpenAPI (Swagger) | 3.0.2 |
| **Testing** | JUnit 5 + Mockito + Testcontainers | — |
| **Build Tool** | Gradle | — |

---

## Architecture — Hexagonal (Ports & Adapters)

```
                    ┌─────────────────────────────────────┐
                    │           APPLICATION CORE           │
                    │      (framework-agnostic, pure Java) │
   ┌────────┐       │                                     │       ┌────────────┐
   │REST API│──────▶│  ┌─────────────┐  ┌──────────────┐ │◀──────│ PostgreSQL │
   │ (Input │       │  │  USE CASES  │  │   DOMAIN     │ │       │  (Output   │
   │  Port) │       │  │  (Services) │  │ (Entities,   │ │       │   Port)    │
   └────────┘       │  │             │  │  ValueObjs)  │ │       └────────────┘
                    │  └─────────────┘  └──────────────┘ │
   ┌────────┐       │                                     │       ┌────────────┐
   │WebSocket│─────▶│  Domain has ZERO deps on Spring,   │◀──────│ Gemini API │
   │ (Input │       │  JPA, or any framework.             │       │  (Output   │
   │  Port) │       │  Pure business logic.               │       │   Port)    │
   └────────┘       └─────────────────────────────────────┘       └────────────┘
                                     ▲
                                     │
                              ┌──────┴──────┐
                              │    Redis     │
                              │   GCP GCS   │
                              │  (Output    │
                              │   Ports)    │
                              └─────────────┘
```

### Core Principles

1. **Domain** — Pure Java. Zero framework imports. Business entities, value objects, domain events.
2. **Application (Use Cases)** — Orchestrates domain logic. Defines **port interfaces** (input + output).
3. **Adapters** — Framework-dependent implementations. Controllers (input), Repositories/API clients (output).

> **Key benefit**: Domain logic is testable with plain JUnit — no Spring context needed.

---

## Project Structure

```
com.dev.smarttask/
│
├── common/                          # Shared kernel
│   ├── domain/                      # Base entity, AuditableEntity
│   ├── application/
│   │   └── port/out/                # Shared output ports (e.g., EventPublisherPort)
│   └── adapter/
│       ├── in/web/                  # ApiResponse, GlobalExceptionHandler
│       └── out/event/               # Spring ApplicationEventPublisher adapter
│
├── auth/                            # ── Authentication Bounded Context ──
│   ├── domain/
│   │   └── model/                   # User, RefreshToken, Role
│   ├── application/
│   │   ├── port/
│   │   │   ├── in/                  # LoginUseCase, RegisterUseCase
│   │   │   └── out/                 # UserRepositoryPort, TokenProviderPort
│   │   └── service/                 # AuthService (implements input ports)
│   └── adapter/
│       ├── in/web/                  # AuthController
│       └── out/
│           ├── persistence/         # UserJpaEntity, JpaUserRepository
│           └── security/            # JwtTokenProvider, OAuth2Handler
│
├── task/                            # ── Task Management Bounded Context ──
│   ├── domain/
│   │   ├── model/                   # Task, Priority (ValueObj), TaskStatus
│   │   └── event/                   # TaskCompletedEvent, TaskCreatedEvent
│   ├── application/
│   │   ├── port/
│   │   │   ├── in/                  # CreateTaskUseCase, UpdateTaskUseCase
│   │   │   └── out/                 # TaskRepositoryPort
│   │   └── service/                 # TaskService
│   └── adapter/
│       ├── in/web/                  # TaskController
│       └── out/persistence/         # TaskJpaEntity, JpaTaskRepository
│
├── schedule/                        # ── AI Schedule Generation ──
│   ├── domain/
│   │   └── model/                   # Schedule, TimeBlock
│   ├── application/
│   │   ├── port/
│   │   │   ├── in/                  # GenerateScheduleUseCase
│   │   │   └── out/                 # AiProviderPort, ScheduleRepositoryPort
│   │   └── service/                 # ScheduleService
│   └── adapter/
│       ├── in/web/                  # ScheduleController
│       └── out/
│           ├── persistence/         # JpaScheduleRepository
│           └── ai/                  # GeminiAdapter, OpenAiAdapter
│
├── social/                          # ── Social Feed & Accountability ──
│   ├── domain/
│   ├── application/
│   └── adapter/
│
├── gamification/                    # ── Streaks, Badges, Leaderboard ──
│   ├── domain/
│   │   ├── model/                   # Streak, Badge, LeaderboardEntry
│   │   └── event/                   # BadgeEarnedEvent
│   ├── application/
│   │   ├── port/
│   │   │   ├── in/                  # UpdateStreakUseCase, CheckBadgeUseCase
│   │   │   └── out/                 # StreakRepositoryPort, CachePort
│   │   └── service/                 # GamificationService
│   └── adapter/
│       ├── in/event/                # Listens to TaskCompletedEvent
│       └── out/
│           ├── persistence/         # JpaStreakRepository
│           └── cache/               # RedisLeaderboardAdapter
│
├── focus/                           # ── Focus Timer / Pomodoro ──
│   ├── domain/
│   ├── application/
│   └── adapter/
│
└── storage/                         # ── File Storage (GCP) ──
    ├── application/
    │   ├── port/
    │   │   ├── in/                  # GenerateUploadUrlUseCase
    │   │   └── out/                 # CloudStoragePort
    │   └── service/                 # StorageService
    └── adapter/
        ├── in/web/                  # StorageController
        └── out/gcp/                 # GcpStorageAdapter (presigned URLs)
```

```
src/main/resources/
├── application.yml
├── application-dev.yml
├── application-prod.yml
└── db/migration/                    # Flyway
    ├── V1__create_users_table.sql
    ├── V2__create_tasks_table.sql
    └── ...

src/test/
├── java/com/dev/smarttask/
│   ├── task/domain/                 # Pure unit tests (no Spring)
│   ├── task/application/            # Use case tests with mocked ports
│   └── task/adapter/                # Integration tests with Testcontainers
└── resources/
```

---

## Dependencies

```groovy
// ═══ CORE ═══
spring-boot-starter-webmvc          // REST API
spring-boot-starter-data-jpa        // ORM
spring-boot-starter-security        // Auth framework
spring-boot-starter-validation      // Input validation

// ═══ DATABASE ═══
postgresql                          // Driver
flyway-core                         // Schema migrations

// ═══ AUTH ═══
jjwt-api + jjwt-impl + jjwt-jackson // JWT tokens
spring-boot-starter-oauth2-client   // Google/GitHub login

// ═══ CACHING ═══
spring-boot-starter-data-redis      // Leaderboards, AI cache

// ═══ REAL-TIME ═══
spring-boot-starter-websocket       // Social feed, focus sync

// ═══ AI INTEGRATION ═══
spring-boot-starter-webflux         // WebClient for Gemini/OpenAI

// ═══ CLOUD STORAGE ═══
spring-cloud-gcp-starter-storage    // GCP presigned URLs

// ═══ RATE LIMITING ═══
bucket4j-core                       // Request throttling

// ═══ API DOCS ═══
springdoc-openapi-starter-webmvc-ui // Swagger UI

// ═══ UTILITIES ═══
lombok                              // Boilerplate reduction
mapstruct                           // DTO ↔ Entity mapping

// ═══ TESTING ═══
spring-boot-starter-test            // JUnit 5 + Mockito
spring-security-test                // Auth test utils
testcontainers + postgresql         // Integration tests with real DB
```

---

## Getting Started

### Prerequisites

- Java 17+
- PostgreSQL
- Redis
- Gradle

### Setup

```bash
# 1. Navigate
cd SmartTask/backend

# 2. Configure
# Edit src/main/resources/application-dev.yml

# 3. Run
./gradlew bootRun --args='--spring.profiles.active=dev'

# 4. API Docs → http://localhost:8080/swagger-ui.html
```

### Testing

```bash
# Unit tests (domain + application — no Spring context)
./gradlew test --tests "*.domain.*"
./gradlew test --tests "*.application.*"

# Integration tests (with Testcontainers — needs Docker)
./gradlew test --tests "*.adapter.*"

# All tests
./gradlew test
```

---

## API Convention

- **Base URL**: `/api/v1`
- **Auth**: Bearer JWT in `Authorization` header
- **Response Format**:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": { ... },
  "errors": null
}
```

---

## Further Reading

- `TECH_STACK_FULL.md` — Complete technology roadmap for future scaling
