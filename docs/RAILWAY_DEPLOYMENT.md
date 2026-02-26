# Railway Deployment Guide

This guide explains how to deploy the SeniorHub frontend to Railway.

## Prerequisites

- Railway account (https://railway.app)
- Backend API already deployed on Railway
- GitHub repository connected to Railway

## Deployment Steps

### 1. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select `seniorhub-frontend` repository
5. Railway will auto-detect the configuration

### 2. Configure Environment Variables

In Railway dashboard, add these environment variables:

**Required:**
```
VITE_API_URL=https://your-backend-service.up.railway.app
VITE_APP_ENV=production
VITE_API_VERSION=v1
```

**Optional (for Google OAuth):**
```
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_REDIRECT_URI=https://your-frontend.up.railway.app/auth/callback
```

### 3. Get Backend URL

1. Go to your backend service in Railway
2. Click on "Settings"
3. Under "Networking", find the public URL (e.g., `https://seniorhub-api-production.up.railway.app`)
4. Copy this URL and use it for `VITE_API_URL`

### 4. Deploy

Railway will automatically:
1. Install dependencies (`npm ci`)
2. Build the app (`npm run build`)
3. Start the preview server
4. Assign a public URL

### 5. Verify Deployment

1. Visit the generated Railway URL
2. Check browser console for errors
3. Test authentication flow
4. Verify API calls work correctly

## Configuration Files

### railway.toml
Defines build and deployment configuration:
- Builder: Nixpacks
- Start command: `npm run preview`
- Health check path: `/`

### nixpacks.toml
Specifies build phases:
- Setup: Node.js 20
- Install: `npm ci`
- Build: `npm run build`
- Start: Preview server on $PORT

### vite.config.ts
- Preview server listens on `0.0.0.0`
- Port from `$PORT` environment variable (Railway provides this)
- API proxy configured for development

## Architecture

```
┌─────────────────┐
│  Railway CDN    │
│   (Frontend)    │
└────────┬────────┘
         │ HTTPS
         │
         ├─────────► Static Assets
         │
         └─────────► API Calls (/api/*)
                          │
                          ▼
                   ┌──────────────┐
                   │   Backend    │
                   │   Railway    │
                   │  (API Server)│
                   └──────────────┘
```

## API Integration

The frontend makes API calls using the base URL from `VITE_API_URL`:

```typescript
// API client automatically uses VITE_API_URL
const apiClient = new ApiClient();

// Calls go to: https://your-backend.up.railway.app/v1/...
await apiClient.get('/v1/health');
```

## CORS Configuration

Ensure your backend allows the frontend domain:

```typescript
// Backend CORS config
app.register(cors, {
  origin: [
    'https://your-frontend.up.railway.app',
    'http://localhost:5173', // for development
  ],
  credentials: true,
});
```

## Custom Domain (Optional)

### Add Custom Domain to Frontend

1. Go to Railway project settings
2. Click "Generate Domain" or "Custom Domain"
3. Add your domain (e.g., `app.seniorhub.com`)
4. Update DNS records as instructed
5. Update `VITE_GOOGLE_REDIRECT_URI` if using OAuth

### Add Custom Domain to Backend

1. Configure backend with custom domain (e.g., `api.seniorhub.com`)
2. Update `VITE_API_URL` to use custom domain
3. Redeploy frontend

## Monitoring

### Railway Logs

View logs in Railway dashboard:
```bash
# Build logs
Shows npm install and build output

# Runtime logs
Shows preview server output and errors
```

### Health Check

Railway automatically checks `GET /` endpoint:
- Returns 200: Service is healthy
- Returns error: Service is restarted

## Troubleshooting

### Build Fails

**Issue:** TypeScript errors during build
```bash
# Check locally first
npm run typecheck
npm run build
```

**Issue:** Missing dependencies
```bash
# Ensure package-lock.json is committed
git add package-lock.json
git commit -m "chore: add package-lock.json"
```

### Runtime Issues

**Issue:** App loads but API calls fail
- Check `VITE_API_URL` is set correctly
- Verify backend CORS allows frontend domain
- Check backend health: `curl https://your-backend.up.railway.app/health`

**Issue:** Blank page
- Check browser console for errors
- Verify build completed successfully
- Check Railway logs for startup errors

**Issue:** Environment variables not working
- Remember: Vite env vars must start with `VITE_`
- Rebuild after changing env vars in Railway
- Check they're accessible: `import.meta.env.VITE_API_URL`

## Continuous Deployment

Railway automatically deploys when you push to `main`:

```bash
git add .
git commit -m "feat: your changes"
git push origin main
# Railway automatically builds and deploys
```

## Rollback

To rollback to a previous deployment:

1. Go to Railway dashboard
2. Click on "Deployments"
3. Find the working deployment
4. Click "Redeploy"

## Performance Optimization

### Enable Compression

Vite preview server automatically uses compression for production builds.

### CDN Caching

Railway provides CDN caching for static assets:
- JavaScript bundles
- CSS files
- Images
- Fonts

### Bundle Analysis

Check bundle size:
```bash
npm run build
# Check dist/ folder size
du -sh dist/
```

## Security

### Environment Variables

- Never commit `.env` files
- Use Railway dashboard to set production values
- Keep `VITE_GOOGLE_CLIENT_ID` secret

### HTTPS

Railway automatically provides HTTPS with Let's Encrypt certificates.

### Headers

Consider adding security headers in a reverse proxy or Railway config.

## Cost Estimation

Railway pricing is based on:
- Execution time
- Memory usage
- Data transfer

Frontend (static site) typically costs $5-10/month for production workload.

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: https://github.com/bencohensolal/seniorhub-frontend/issues
