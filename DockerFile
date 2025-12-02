# ============================================
# Stage 1: Builder - Install deps and build
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies (needed for native modules)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including devDependencies for build)
RUN npm ci --legacy-peer-deps --prefer-offline

# Copy source code (workspace root needed for Nx)
COPY . .

# Build the API using Nx
WORKDIR /app/apps/api
RUN npx nx build @hanapp-ph/api --configuration=production

# ============================================
# Stage 2: Runner - Production image
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

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Copy necessary config files
COPY --from=builder /app/nx.json ./nx.json
COPY --from=builder /app/tsconfig.base.json ./tsconfig.base.json

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose port
EXPOSE 10000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:10000/api', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/apps/api/main.js"]
