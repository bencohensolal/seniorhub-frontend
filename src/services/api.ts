import axios, { AxiosInstance, AxiosError } from 'axios';
import { env } from '@/app/config/env';

export class ApiClient {
  private client: AxiosInstance;
  private authToken: string | null = null;
  private userContext: {
    userId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  } | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: env.apiUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth headers
    this.client.interceptors.request.use(
      (config) => {
        // Add user context headers if available
        if (this.userContext) {
          if (this.userContext.userId) config.headers['x-user-id'] = this.userContext.userId;
          if (this.userContext.email) config.headers['x-user-email'] = this.userContext.email;
          if (this.userContext.firstName)
            config.headers['x-user-first-name'] = this.userContext.firstName;
          if (this.userContext.lastName)
            config.headers['x-user-last-name'] = this.userContext.lastName;
        }

        // Add auth token if available
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          // Server responded with error status
          console.error('[API Error]', {
            status: error.response.status,
            data: error.response.data,
            url: error.config?.url,
          });
        } else if (error.request) {
          // Request made but no response
          console.error('[API Error] No response:', error.message);
        } else {
          // Error setting up request
          console.error('[API Error] Setup:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token: string | null) {
    this.authToken = token;
  }

  setUserContext(context: {
    userId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  } | null) {
    this.userContext = context;
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

// Singleton instance
export const apiClient = new ApiClient();
