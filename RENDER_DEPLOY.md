# Render Deployment Guide for HanApp API

## Quick Start

### Option 1: Using Render Blueprint (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Blueprint**
3. Connect your GitHub repository: `GCF14/hanapp-ph`
4. Render will automatically detect `render.yaml` and configure everything
5. Add your environment variables in the Render dashboard
6. Click **Apply** to deploy

### Option 2: Manual Web Service Creation
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `GCF14/hanapp-ph`
4. Configure the following settings:

## Render Service Settings

### Basic Settings
- **Name**: `hanapp-api`
- **Region**: Oregon (US West) or closest to your users
- **Branch**: `main`
- **Root Directory**: Leave empty (use repo root)

### Build & Deploy Settings
- **Runtime**: Docker
- **Dockerfile Path**: `./Dockerfile`
- **Docker Build Context Directory**: `.` (just a dot)

### Environment Variables (Add these in Render Dashboard)
```
NODE_ENV=production
PORT=10000
DATABASE_URL=your_database_url
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Advanced Settings
- **Auto-Deploy**: Yes (deploy on git push)
- **Health Check Path**: `/api`
- **Plan**: Free (or upgrade for better performance)

## File Structure

```
hanapp-ph/
├── Dockerfile              # Optimized multi-stage Docker build
├── .dockerignore          # Excludes unnecessary files from Docker
├── render.yaml            # Render Blueprint configuration
├── render-build.sh        # Alternative build script (not used with Docker)
├── render-package.json    # Render-specific npm scripts
├── apps/
│   └── api/              # Your NestJS API application
├── libs/                 # Shared libraries
└── package.json          # Main workspace package.json
```

## How the Deployment Works

1. **Build Stage**: 
   - Installs all dependencies
   - Copies source code
   - Builds API with webpack
   - Creates production bundle

2. **Runtime Stage**:
   - Uses minimal Alpine Linux
   - Only includes production dependencies
   - Runs as non-root user for security
   - Exposes port 10000 (Render's default)

## Troubleshooting

### Build fails with "Cannot find package-lock.json"
- Ensure `package-lock.json` is committed to git
- Check `.dockerignore` doesn't exclude it

### Build times out
- Render free tier has 15-minute build timeout
- If needed, upgrade to paid plan for unlimited build time

### App doesn't start
- Check logs in Render dashboard
- Verify environment variables are set correctly
- Ensure PORT is set to 10000

## Useful Commands

Test Docker build locally:
```bash
docker build -t hanapp-api .
docker run -p 10000:10000 -e NODE_ENV=production hanapp-api
```

View logs on Render:
```bash
# In Render dashboard, go to Logs tab
```

## Performance Optimization

- Docker multi-stage build reduces final image size
- Only production dependencies in runtime image
- Health checks ensure service reliability
- Non-root user for security

## Support

For issues, check:
1. Render dashboard logs
2. Build logs for errors
3. Runtime logs for startup issues
