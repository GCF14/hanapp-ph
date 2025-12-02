# ========================
# Build stage - builds the app
# ========================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files and config
COPY package*.json nx.json tsconfig*.json ./

# Copy only the API source code
COPY apps/api ./apps/api

# Copy libs only if your API depends on shared libraries
# Uncomment the line below if you have shared libs
# COPY libs ./libs

# Install all dependencies (needed for build)
RUN npm ci --legacy-peer-deps --ignore-scripts

# Build the API using Nx
RUN npx nx build @hanapp-ph/api --prod

# ========================
# Production runtime stage
# ========================
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy package files for production dependencies
COPY package*.json ./

# Install ONLY production runtime dependencies
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts && \
    npm cache clean --force

# Copy built application from builder
# Nx outputs to apps/api/dist
COPY --from=builder /app/apps/api/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Health check for Render monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/healthz', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/main.js"]