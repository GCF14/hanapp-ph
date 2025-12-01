# ========================
# 1. Builder stage
# ========================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY tsconfig*.json ./
COPY nx.json ./
COPY apps ./apps
COPY libs ./libs

RUN npm ci --legacy-peer-deps

# Build only the API project
RUN npx nx build @hanapp-ph/api --prod

# ------------------------
# 2. Prune workspace (optional but recommended)
# ------------------------
RUN npx nx prune --project @hanapp-ph/api

# ========================
# 3. Production image
# ========================
FROM node:20-alpine AS runner
WORKDIR /app

# Copy pruned output produced in: apps/api/dist
COPY --from=builder /app/apps/api/dist ./dist

WORKDIR /app/dist
EXPOSE 3000

CMD ["node", "main.js"]
