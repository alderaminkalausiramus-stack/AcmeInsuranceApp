export type UserRole = 'superadmin' | 'user';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  title: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserInput {
  email: string;
  password: string;
  fullName: string;
  title: string;
  role: UserRole;
}

export interface UpdateUserInput {
  userId: string;
  fullName?: string;
  title?: string;
  role?: UserRole;
  isActive?: boolean;
  password?: string;
}
