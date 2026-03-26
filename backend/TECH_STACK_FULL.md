# SmartTask Backend — Full Technology Recommendations (Reference)

> ⚠️ **This is a reference document** for future scaling decisions.
> See `README.md` for the current active stack.

---

## Architecture Evolution Path

```
CURRENT                              FUTURE (if needed)
───────                              ──────
Hexagonal Monolith        →         Modular Monolith with DDD
 (Ports & Adapters)                  (Extract bounded contexts)
                                              │
                                              ▼
                                     Microservices
                                      (Each module → service)
```

> The Hexagonal structure makes this migration straightforward — each feature module already has clean boundaries.

---

## 1. API Design

| Topic | Implementation |
|---|---|
| REST API Design | `@RestController` — `/api/v1/tasks`, `/api/v1/users/{id}/streaks` |
| API Versioning | URL path versioning: `/api/v1/...` |
| Request/Response | `ApiResponse<T>` envelope with `success`, `data`, `message`, `errors` |
| Pagination | Spring Data `Pageable` + custom `PageResponse<T>` |
| Filtering & Sorting | `Specification<T>` (JPA Criteria API) |
| Idempotency | Idempotency key header + Redis check for POST ops |
| Error Handling | `@RestControllerAdvice` + `ProblemDetail` (RFC 7807) |
| Caching Headers | `@Cacheable` + `Cache-Control` headers |
| OpenAPI / Swagger | **SpringDoc OpenAPI** |

---

## 2. Architecture Patterns

| Topic | Implementation |
|---|---|
| **Hexagonal Architecture** | Ports & Adapters — domain has zero framework deps |
| Design Patterns | Strategy (AI providers), Observer (domain events), Builder (schedule gen) |
| SOLID Principles | Port interfaces + adapter implementations, DI everywhere |
| Domain-Driven Design | `Task` aggregate root, `Priority` value object, bounded contexts |
| Event-Driven | `ApplicationEventPublisher` + `@EventListener` |
| CQRS (Light) | Read-optimized DTOs vs command objects |
| Caching | L1: `@Cacheable` → L2: **Redis** |
| Message Queues (Future) | **RabbitMQ** or **Kafka** — only if extracting microservices |
| Scalability | Stateless services + Redis sessions + **HikariCP** |
| Observability (Future) | **Micrometer + Prometheus**, **Sleuth/Zipkin** |
| CI/CD | **GitHub Actions** → build → test → Docker → deploy |
| Containerization | **Docker** + **Docker Compose** |

---

## 3. Security

| Topic | Implementation |
|---|---|
| Authentication | Spring Security + JJWT (access 15min + refresh 7d) |
| Authorization | `@PreAuthorize("hasRole('USER')")`, custom `@CurrentUser` |
| OAuth 2.0 | Spring Security OAuth2 Client (Google, GitHub) |
| Input Validation | Jakarta Validation (`@Valid`, `@NotBlank`, `@Size`) |
| Rate Limiting | Bucket4j — `/auth/login` (5/min), `/api/tasks` (100/min) |
| CORS | `CorsConfigurationSource` — whitelist frontend |
| Password Hashing | BCryptPasswordEncoder (strength 12) |
| API Key Management | Environment variables, `@Value("${ai.api-key}")` |
| Security Headers | Spring Security `headers()` auto-config |
| Audit Logging | Custom AOP aspect |

---

## 4. Future Additions (Not Yet Integrated)

| Technology | When to Add | Use Case |
|---|---|---|
| **HATEOAS** | If building public API for 3rd parties | Hypermedia links |
| **RabbitMQ / Kafka** | If extracting microservices | Async messaging |
| **Prometheus + Grafana** | Before production deploy | Monitoring |
| **Sleuth / Zipkin** | If going microservices | Distributed tracing |
| **OWASP Dependency-Check** | CI pipeline setup | Vulnerability scanning |

---

## 5. Full Dependency Reference

```
── CURRENT (Active in build.gradle) ──
spring-boot-starter-webmvc
spring-boot-starter-data-jpa
spring-boot-starter-security
spring-boot-starter-validation
postgresql + flyway-core
jjwt-api + jjwt-impl + jjwt-jackson
spring-boot-starter-oauth2-client
spring-boot-starter-data-redis
spring-boot-starter-websocket
spring-boot-starter-webflux
spring-cloud-gcp-starter-storage
bucket4j-core
springdoc-openapi-starter-webmvc-ui
lombok + mapstruct
testcontainers + junit-jupiter + postgresql

── FUTURE (Add when needed) ──
spring-boot-starter-amqp            (RabbitMQ)
spring-boot-starter-actuator        (Health checks)
micrometer-registry-prometheus       (Metrics)
```
