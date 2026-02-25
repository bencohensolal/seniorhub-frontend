export interface AuthenticatedUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserContext {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthData {
  user: AuthenticatedUser;
  token: string;
}
