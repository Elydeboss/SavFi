// src/types/auth.ts
export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  username?: string;
  createdAt?: string;

  accessToken?: string;
  refreshToken?: string;
}
