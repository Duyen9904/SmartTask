# ══════════════════════════════════════════════════════════════
#  SmartTask Backend — Multi-stage Dockerfile
#  Build:  docker build -t smarttask-backend .
#  Run:    docker run -p 8080:8080 smarttask-backend
# ══════════════════════════════════════════════════════════════

# ── Stage 1: Build ────────────────────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS builder

WORKDIR /app

# Copy Gradle wrapper and build files first (layer caching)
COPY gradlew .
COPY gradle/ gradle/
COPY build.gradle settings.gradle ./

# Make gradlew executable and download dependencies (cached unless build files change)
RUN chmod +x gradlew && \
    ./gradlew dependencies --no-daemon

# Copy source code
COPY src/ src/

# Build the application JAR (skip tests — they run in CI)
RUN ./gradlew bootJar --no-daemon -x test

# ── Stage 2: Runtime ─────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine AS runtime

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the built JAR from builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Switch to non-root user
USER appuser

# Expose application port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
