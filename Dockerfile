# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies with cache mount for faster builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --ignore-scripts --prefer-offline

# Copy only what's needed for the build
COPY nx.json tsconfig*.json ./
COPY apps/api ./apps/api
COPY libs ./libs

# Build the API with Nx (with cache mount)
RUN --mount=type=cache,target=/app/.nx/cache \
    npx nx build @hanapp-ph/api --prod --skip-nx-cache=false

# Stage 2: Production runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies with cache
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --omit=dev --ignore-scripts --prefer-offline && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Set environment
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "apps/api/dist/main.js"]
