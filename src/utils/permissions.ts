import { UserRole } from '@/types';

export const hasRole = (userRole: UserRole, allowedRoles: UserRole[]): boolean => {
  return allowedRoles.includes(userRole);
};

export const isAdmin = (userRole: UserRole): boolean => {
  return userRole === 'admin';
};
