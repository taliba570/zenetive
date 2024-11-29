export interface User {
  userId: string | null;
  name?: string | null;
  email?: string | null;
  photo?: string | null;
  phone?: string | null;
  isVerified?: boolean;
  accessToken?: string | null;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}