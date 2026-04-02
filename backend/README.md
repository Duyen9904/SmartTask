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
| 👥 **Social Accountability** | Share tasks with friends or groups for encouragement, collaboration, and activity feeds |
| 🏆 **Badges & Achievements** | Earn badges for productivity milestones with structured unlock criteria |
| 📋 **Task Templates** | Community-driven reusable templates for routines (morning, study, workout) |
| 🧘 **Focus Mode** | Pomodoro timer with ambient sounds, AI task suggestions, and focus statistics |
| 😊 **Mood Check-ins** | Quick mood tracking that influences AI scheduling recommendations |
| 🏠 **Collaborative Rooms** | Real-time shared workspaces with checklists, photo proofs, chat, and huddles |
| 📊 **Weekly Review** | AI-generated weekly productivity report with charts, insights, and goal tracking |

### Pages / Modules

| Page | Description |
|---|---|
| `Dashboard` | Task overview, AI schedule, mood widget |
| `Tasks` | Task CRUD, templates, filters, priority management |
| `Social` | Friends, groups, activity feed with cheers & comments |
| `AI Assistant` | Chat interface, schedule generator, productivity insights |
| `Profile` | User stats, badges, settings |
| `Focus Mode` | Pomodoro timer, ambient sounds, AI task suggestions |
| `Collaborative Room` | Real-time shared workspace with checklists & huddles |

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| **Framework** | Spring Boot | 4.0.4 |
| **Language** | Java | 17 |
| **Architecture** | Hexagonal (Ports & Adapters) | — |
| **Relational DB** | PostgreSQL | Latest |
| **Document DB** | MongoDB | Latest |
| **ORM** | Hibernate / Spring Data JPA | — |
| **ODM** | Spring Data MongoDB | — |
| **Migrations** | Flyway (PostgreSQL) | — |
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
   │ (Input │       │  │  USE CASES  │  │   DOMAIN     │ │       │ (Relational│
   │  Port) │       │  │  (Services) │  │ (Entities,   │ │       │  Output)   │
   └────────┘       │  │             │  │  ValueObjs)  │ │       └────────────┘
                    │  └─────────────┘  └──────────────┘ │       ┌────────────┐
   ┌────────┐       │                                     │◀──────│  MongoDB   │
   │WebSocket│─────▶│  Domain has ZERO deps on Spring,   │       │ (Document  │
   │ (Input │       │  JPA, Mongo, or any framework.      │       │  Output)   │
   │  Port) │       │  Pure business logic.               │       └────────────┘
   └────────┘       └─────────────────────────────────────┘       ┌────────────┐
                                     ▲                            │ Gemini API │
                                     │                            │  (Output   │
                              ┌──────┴──────┐                     │   Port)    │
                              │    Redis     │                     └────────────┘
                              │   GCP GCS   │
                              └─────────────┘
```

### Core Principles

1. **Domain** — Pure Java. Zero framework imports. Business entities, value objects, domain events.
2. **Application (Use Cases)** — Orchestrates domain logic. Defines **port interfaces** (input + output).
3. **Adapters** — Framework-dependent implementations. Controllers (input), Repositories/API clients (output).

> **Key benefit**: Domain logic is testable with plain JUnit — no Spring context needed.

---

## Domain Model — 23 Entities · Polyglot Storage

### Storage Split

```
 PostgreSQL (relational, ACID)            MongoDB (high-write, flexible)
 ─────────────────────────────            ─────────────────────────────
 User, Task, TaskAssignment, Subtask      ActivityLog, ActivityReaction,
 TaskTemplate, TemplateSubtask              ActivityComment
 Friendship, Group, GroupMember           ChatMessage
 Room, RoomMember, ChecklistItem,         RoomEvent (TTL 30d)
   ChecklistProof, Huddle, HuddlePartic.  Conversation, AiMessage
 MoodEntry, FocusSession                  Notification (TTL 90d)
 UserPreference, Attachment
 ─────────────────────────────            ─────────────────────────────
 16 tables                                7 collections
```

### Module Breakdown

| Module | Storage | Entities |
|--------|---------|----------|
| **auth** (existing) | PostgreSQL | User, Role, RefreshToken |
| **task** | PostgreSQL | Task, TaskAssignment, Subtask |
| **template** | PostgreSQL | TaskTemplate, TemplateSubtask |
| **social** | PostgreSQL + MongoDB | Friendship, Group, GroupMember (PG) · ActivityLog, ActivityReaction, ActivityComment (Mongo) |
| **room** | PostgreSQL + MongoDB | Room, RoomMember, ChecklistItem, ChecklistProof, Huddle, HuddleParticipant (PG) · RoomEvent, ChatMessage (Mongo) |
| **ai** | MongoDB + PostgreSQL | Conversation, AiMessage (Mongo) · FocusSession (PG) |
| **notification** | MongoDB + PostgreSQL | Notification (Mongo) · UserPreference, Attachment (PG) |
| **mood** | PostgreSQL | MoodEntry |

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **UUIDv7 PKs** | Insert-order B-tree locality, distributed-safe |
| **Soft-delete** (`deletedAt`) | On Task, Room, Post — preserves referential integrity |
| **Canonical Friendship** | `userIdA = LEAST`, `userIdB = GREATEST` — one row per pair |
| **ActivityLog verb-object** | Event-sourced social feed, no duplicate data |
| **`lastSeenAt` over `isOnline`** | Compute presence from timestamp, avoid stale booleans |
| **`referenceType` discriminator** | Typed polymorphic FK on RoomEvent |
| **No derived fields** | `memberCount`, `rating` derived at query time |
| **Polyglot persistence** | PostgreSQL for relational/ACID, MongoDB for high-write append-only data |
| **MongoDB TTL indexes** | Auto-expire Notifications (90d), RoomEvents (30d) |

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
├── auth/                            # ── Authentication ──
│   ├── domain/model/                # User, RefreshToken, Role
│   ├── application/
│   │   ├── port/in/                 # LoginUseCase, RegisterUseCase
│   │   ├── port/out/                # UserRepositoryPort, TokenProviderPort
│   │   └── service/                 # AuthService
│   └── adapter/
│       ├── in/web/                  # AuthController
│       └── out/
│           ├── persistence/         # UserJpaEntity, JpaUserRepository
│           └── security/            # JwtTokenProvider, OAuth2Handler
│
├── task/                            # ── Task Management ──
│   ├── domain/model/                # Task, TaskAssignment, Subtask
│   ├── application/
│   │   ├── port/in/                 # CreateTaskUseCase, UpdateTaskUseCase
│   │   ├── port/out/                # TaskRepositoryPort
│   │   └── service/                 # TaskService
│   └── adapter/
│       ├── in/web/                  # TaskController
│       └── out/persistence/         # TaskJpaEntity, JpaTaskRepository
│
├── template/                        # ── Task Templates ──
│   ├── domain/model/                # TaskTemplate, TemplateSubtask
│   ├── application/
│   └── adapter/
│
├── social/                          # ── Social & Activity Feed ──
│   ├── domain/model/                # Friendship, Group, GroupMember,
│   │                                # ActivityLog, ActivityReaction, ActivityComment
│   ├── application/
│   │   ├── port/in/                 # SendFriendRequestUseCase, CreateGroupUseCase
│   │   ├── port/out/                # FriendshipRepositoryPort, ActivityLogPort
│   │   └── service/                 # SocialService, ActivityFeedService
│   └── adapter/
│       ├── in/web/                  # SocialController, ActivityFeedController
│       └── out/persistence/
│
├── gamification/                    # ── Badges & Mood ──
│   ├── domain/model/                # Badge, UserBadge, MoodEntry
│   ├── application/
│   │   ├── port/in/                 # CheckBadgeUseCase, LogMoodUseCase
│   │   ├── port/out/                # BadgeRepositoryPort
│   │   └── service/                 # GamificationService
│   └── adapter/
│       ├── in/event/                # Listens to TaskCompletedEvent
│       └── out/persistence/
│
├── room/                            # ── Collaborative Rooms ──
│   ├── domain/model/                # Room, RoomMember, ChecklistItem,
│   │                                # ChecklistProof, RoomEvent, ChatMessage,
│   │                                # Huddle, HuddleParticipant
│   ├── application/
│   │   ├── port/in/                 # CreateRoomUseCase, AddChecklistItemUseCase
│   │   ├── port/out/                # RoomRepositoryPort, ChatMessagePort
│   │   └── service/                 # RoomService
│   └── adapter/
│       ├── in/
│       │   ├── web/                 # RoomController
│       │   └── websocket/           # RoomChatHandler
│       └── out/persistence/
│
├── ai/                              # ── AI Assistant & Focus ──
│   ├── domain/model/                # Conversation, AiMessage, FocusSession
│   ├── application/
│   │   ├── port/in/                 # ChatWithAiUseCase, StartFocusUseCase
│   │   ├── port/out/                # AiProviderPort, ConversationRepositoryPort
│   │   └── service/                 # AiChatService, FocusService
│   └── adapter/
│       ├── in/web/                  # AiController, FocusController
│       └── out/
│           ├── persistence/
│           └── ai/                  # GeminiAdapter, OpenAiAdapter
│
├── notification/                    # ── Notifications & Preferences ──
│   ├── domain/model/                # Notification, UserPreference, Attachment
│   ├── application/
│   │   ├── port/in/                 # SendNotificationUseCase
│   │   ├── port/out/                # NotificationRepositoryPort
│   │   └── service/                 # NotificationService
│   └── adapter/
│       ├── in/web/                  # NotificationController
│       └── out/persistence/
│
└── storage/                         # ── File Storage (GCP) ──
    ├── application/
    │   ├── port/in/                 # GenerateUploadUrlUseCase
    │   ├── port/out/                # CloudStoragePort
    │   └── service/                 # StorageService
    └── adapter/
        ├── in/web/                  # StorageController
        └── out/gcp/                 # GcpStorageAdapter (presigned URLs)
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
postgresql                          // Relational driver
spring-boot-starter-data-mongodb    // MongoDB ODM
flyway-core                         // PostgreSQL schema migrations

// ═══ AUTH ═══
jjwt-api + jjwt-impl + jjwt-jackson // JWT tokens
spring-boot-starter-oauth2-client   // Google/GitHub login

// ═══ CACHING ═══
spring-boot-starter-data-redis      // Presence, rate-limit buckets

// ═══ REAL-TIME ═══
spring-boot-starter-websocket       // Room chat, focus sync

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
- Docker & Docker Compose
- Gradle (or use the included wrapper)

### Option A: Docker (Recommended)

```bash
# 1. Navigate to project root
cd SmartTask

# 2. Copy environment template
cp .env.example .env

# 3. Start infrastructure (PostgreSQL, MongoDB, Redis)
docker compose up -d

# 4. Run backend locally against Docker services
cd backend
./gradlew bootRun --args='--spring.profiles.active=docker'

# 5. API Docs → http://localhost:8080/swagger-ui.html
```

### Option B: Full Stack via Docker

```bash
# Start everything (infra + backend + frontend)
docker compose --profile app up -d

# Backend  → http://localhost:8080
# Frontend → http://localhost:3000
# Swagger  → http://localhost:3000/swagger-ui/
```

### Docker Management

```bash
# View running services
docker compose ps

# View backend logs
docker compose --profile app logs -f backend

# Rebuild after code changes
docker compose --profile app build backend
docker compose --profile app up -d backend

# Stop everything
docker compose --profile app down

# Stop and destroy all data
docker compose --profile app down -v
```

### Option C: Manual Setup (No Docker)

```bash
# Requires locally installed PostgreSQL, MongoDB, Redis
cd SmartTask/backend
# Edit src/main/resources/application-dev.yml with your local connection details
./gradlew bootRun --args='--spring.profiles.active=dev'
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

## ERD

Full entity relationship diagram: [`.stitch/designs/erd.mmd`](../.stitch/designs/erd.mmd) — render with [mermaid.live](https://mermaid.live)

---

## Further Reading

- `TECH_STACK_FULL.md` — Complete technology roadmap for future scaling
