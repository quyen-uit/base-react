export interface Profile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  company?: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  company?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateAvatarResponse {
  avatar: string;
  message: string;
}
