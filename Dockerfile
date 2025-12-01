# Build stage - builds the app
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache python3 make g++

# Copy everything needed for build
COPY package*.json nx.json tsconfig*.json ./
COPY apps/api ./apps/api
COPY libs ./libs

# Install all dependencies
RUN --mount=type=cache,id=npm-build,target=/root/.npm \
    npm ci --legacy-peer-deps --ignore-scripts

# Build using the npm script
RUN cd apps/api && npx webpack-cli build --node-env=production

# Production runtime
FROM node:20-alpine AS runner

WORKDIR /app

# Install dumb-init
RUN apk add --no-cache dumb-init

# Copy package files
COPY package*.json ./

# Install ONLY production runtime dependencies
RUN --mount=type=cache,id=npm-prod,target=/root/.npm \
    npm ci --legacy-peer-deps --omit=dev --ignore-scripts && \
    npm cache clean --force

# Copy built application from builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app

USER nodejs

# Environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Use dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "apps/api/dist/main.js"]
