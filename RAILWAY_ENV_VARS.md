# Railway Environment Variables

This document lists all required environment variables for deploying the SeniorHub frontend on Railway.

## Required Environment Variables

### 1. Google OAuth Configuration

#### `VITE_GOOGLE_CLIENT_ID` (REQUIRED - User must provide)
- **Description**: Google OAuth 2.0 Client ID from Google Cloud Console
- **How to obtain**:
  1. Go to [Google Cloud Console](https://console.cloud.google.com/)
  2. Create a new project or select existing project
  3. Enable Google+ API
  4. Go to "APIs & Services" > "Credentials"
  5. Create "OAuth 2.0 Client ID" (Application type: Web application)
  6. Add authorized JavaScript origins: `https://your-railway-domain.railway.app`
  7. Add authorized redirect URIs: `https://your-railway-domain.railway.app/auth-callback.html`
  8. Copy the Client ID
- **Example**: `123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com`

#### `VITE_GOOGLE_REDIRECT_URI` (REQUIRED)
- **Description**: OAuth redirect URI for authentication callback
- **Value**: `https://your-railway-domain.railway.app/auth-callback.html`
- **Note**: Must match the redirect URI configured in Google Cloud Console
- **Example**: `https://seniorhub-frontend-production.up.railway.app/auth-callback.html`

### 2. Backend API Configuration

#### `VITE_API_URL` (REQUIRED)
- **Description**: Base URL of the SeniorHub backend API on Railway
- **Value**: Your Railway backend service URL
- **Example**: `https://seniorhub-backend-production.up.railway.app`

#### `VITE_API_VERSION` (OPTIONAL)
- **Description**: API version to use
- **Default**: `v1`
- **Value**: `v1`

### 3. Environment Configuration

#### `VITE_APP_ENV` (OPTIONAL)
- **Description**: Application environment
- **Default**: `development`
- **Value for Railway**: `production`

## Setting Environment Variables on Railway

1. Go to your Railway project dashboard
2. Select your frontend service
3. Go to "Variables" tab
4. Click "New Variable" for each variable above
5. Enter the variable name and value
6. Click "Add" or "Deploy" to apply changes

## Development Environment

For local development, copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Then edit `.env` with your local configuration.

## Security Notes

- **Never commit** the actual Google Client ID to version control
- The Google Client ID is considered **public** (it's sent to the browser)
- The client secret (if needed) should NEVER be in the frontend
- Railway will inject these variables at build time for Vite
- All `VITE_` prefixed variables are exposed to the client-side code

## Verification

After setting all variables on Railway:
1. Trigger a new deployment
2. Check the build logs to ensure variables are loaded
3. Test authentication flow in production
4. Verify API calls reach the backend correctly

## Troubleshooting

### "Google OAuth is not configured" error
- Ensure `VITE_GOOGLE_CLIENT_ID` is set on Railway
- Redeploy the service after adding the variable

### OAuth redirect mismatch error
- Verify `VITE_GOOGLE_REDIRECT_URI` matches the URI in Google Cloud Console
- Ensure the domain matches your Railway deployment domain

### API connection errors
- Verify `VITE_API_URL` points to the correct backend Railway service
- Ensure backend service is running and accessible
- Check CORS configuration on backend allows requests from frontend domain
