export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:4000',
  apiVersion: import.meta.env.VITE_API_VERSION ?? 'v1',
  appEnv: import.meta.env.VITE_APP_ENV ?? 'development',
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '',
  googleRedirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI ?? '',
} as const;

export const isProduction = env.appEnv === 'production';
export const isDevelopment = env.appEnv === 'development';
export const isGoogleAuthConfigured = env.googleClientId.length > 0;
