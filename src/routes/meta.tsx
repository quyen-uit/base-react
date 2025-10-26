import type { UserRole } from '@/types';
import { ROUTES } from '@/constants';
import type { ComponentType } from 'react';
import {
  IconHome,
  IconPhoto,
  IconUsers,
  IconBriefcase,
  IconTable,
  IconLayoutDashboard,
  IconPackage,
  IconPalette,
  IconUserCircle,
  IconShoppingCart,
} from '@tabler/icons-react';

export interface NavItem {
  labelKey: string;
  to?: string;
  icon?: ComponentType<any>;
  requireAuth?: boolean;
  roles?: UserRole[];
  children?: NavItem[];
}

export const generalNav: NavItem[] = [
  { labelKey: 'nav.home', to: ROUTES.HOME, icon: IconHome },
];

export const examplesNav: NavItem = {
  labelKey: 'nav.examples',
  icon: IconPhoto,
  children: [
    { labelKey: 'nav.gallery', to: '/examples/gallery', icon: IconPhoto },
    { labelKey: 'nav.team', to: '/examples/team', icon: IconUsers },
    { labelKey: 'nav.services', to: '/examples/services', icon: IconBriefcase },
    { labelKey: 'nav.table', to: '/examples/table', icon: IconTable },
  ],
};

export const applicationsNav: NavItem[] = [
  { labelKey: 'nav.dashboard', to: ROUTES.DASHBOARD, icon: IconLayoutDashboard, requireAuth: true },
  { labelKey: 'nav.products', to: ROUTES.PRODUCTS, icon: IconPackage, requireAuth: true },
  { labelKey: 'nav.colors', to: ROUTES.COLORS, icon: IconPalette, requireAuth: true },
  { labelKey: 'nav.profile', to: ROUTES.PROFILE, icon: IconUserCircle, requireAuth: true },
];

export const adminNav: NavItem = {
  labelKey: 'nav.admin',
  to: ROUTES.ADMIN,
  icon: IconShoppingCart,
  requireAuth: true,
  roles: ['admin'],
};
