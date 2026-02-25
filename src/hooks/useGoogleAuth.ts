import { useState, useCallback } from 'react';
import type { AuthenticatedUser } from '@/types/auth.types';
import { env, isGoogleAuthConfigured } from '@/app/config/env';

interface UseGoogleAuthReturn {
  user: AuthenticatedUser | null;
  accessToken: string | null;
  isAuthenticating: boolean;
  errorMessage: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

/**
 * Hook for Google OAuth authentication
 * Handles the OAuth flow in a popup window
 */
export function useGoogleAuth(): UseGoogleAuthReturn {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signInWithGoogle = useCallback(async () => {
    if (!isGoogleAuthConfigured) {
      setErrorMessage('Google OAuth is not configured');
      console.error('[GoogleAuth] Missing Google Client ID in environment variables');
      return;
    }

    setIsAuthenticating(true);
    setErrorMessage(null);

    try {
      // Build Google OAuth URL
      const redirectUri = env.googleRedirectUri || `${window.location.origin}/auth/callback`;
      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');

      authUrl.searchParams.append('client_id', env.googleClientId);
      authUrl.searchParams.append('redirect_uri', redirectUri);
      authUrl.searchParams.append('response_type', 'token');
      authUrl.searchParams.append('scope', [
        'openid',
        'profile',
        'email',
      ].join(' '));

      // Open popup window
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl.toString(),
        'google-auth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        throw new Error('Failed to open authentication popup. Please allow popups for this site.');
      }

      // Listen for the OAuth callback
      const handleCallback = async (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'google-auth-success') {
          const { access_token } = event.data;

          // Fetch user profile
          const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }

          const profile = await response.json();

          const authenticatedUser: AuthenticatedUser = {
            userId: profile.id,
            email: profile.email,
            firstName: profile.given_name || '',
            lastName: profile.family_name || '',
          };

          setUser(authenticatedUser);
          setAccessToken(access_token);
          setIsAuthenticating(false);

          window.removeEventListener('message', handleCallback);
        } else if (event.data.type === 'google-auth-error') {
          throw new Error(event.data.error || 'Authentication failed');
        }
      };

      window.addEventListener('message', handleCallback);

      // Check if popup was closed
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          window.removeEventListener('message', handleCallback);
          setIsAuthenticating(false);
          if (!user) {
            setErrorMessage('Authentication was cancelled');
          }
        }
      }, 1000);
    } catch (error) {
      console.error('[GoogleAuth] Authentication error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Authentication failed');
      setIsAuthenticating(false);
    }
  }, [user]);

  const signOut = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setErrorMessage(null);
  }, []);

  return {
    user,
    accessToken,
    isAuthenticating,
    errorMessage,
    signInWithGoogle,
    signOut,
  };
}
