# Optimized Dockerfile for Render deployment
# Two-stage build: builder stage for compilation, runner stage for production

# ============================================
# Stage 1: Builder - Build the application
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies (needed for native npm packages)
RUN apk add --no-cache python3 make g++

# Copy package files for dependency installation
COPY package*.json ./

# Install ALL dependencies (including devDependencies needed for build)
RUN npm ci --legacy-peer-deps --prefer-offline

# Copy workspace configuration files
COPY nx.json tsconfig*.json ./

# Copy the API application and shared libraries
COPY apps/api ./apps/api
COPY libs ./libs

# Build the API using webpack
WORKDIR /app/apps/api
RUN npx webpack-cli build --node-env=production

# Verify build succeeded
RUN ls -la dist/ && test -f dist/main.js

# ============================================
# Stage 2: Runner - Production runtime
# ============================================
FROM node:20-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --legacy-peer-deps --omit=dev --prefer-offline && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Expose Render's default port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/api', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "apps/api/dist/main.js"]
