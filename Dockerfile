# Stage 1: Build the application
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY nx.json tsconfig*.json ./

# Copy workspace configuration and libs
COPY apps/api/package.json ./apps/api/
COPY apps/api/project.json ./apps/api/
COPY apps/api/tsconfig*.json ./apps/api/
COPY apps/api/webpack.config.js ./apps/api/

# Copy libs and commons (shared code)
COPY libs ./libs

# Install ALL dependencies (needed for build)
RUN npm ci --legacy-peer-deps --ignore-scripts

# Copy source code (includes src/msg and src/assets)
COPY apps/api/src ./apps/api/src

# Build the API with Nx
RUN npx nx build @hanapp-ph/api --prod --verbose

# Verify build output
RUN ls -la apps/api/dist && cat apps/api/dist/main.js | head -20

# Stage 2: Production runtime image
FROM node:20-alpine AS runner

WORKDIR /app

# Install runtime dependencies only
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies
RUN npm ci --legacy-peer-deps --omit=dev --ignore-scripts && \
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
