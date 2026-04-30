import {
  FileText01,
  LayoutDashboard,
  LogOut01,
  Settings01,
  Ticket01,
  Users01,
} from './TemplateIcons.jsx'

export const defaultNavigationPath = '/dashboard'

export const implementedNavigationPaths = [
  '/dashboard',
  '/tickets',
  '/documents',
  '/users',
  '/settings',
]

export const primaryNavigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'tickets',
    label: 'Tickets',
    href: '/tickets',
    icon: Ticket01,
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/documents',
    icon: FileText01,
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    icon: Users01,
  },
]

export const secondaryNavigationItems = [
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings01,
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout',
    icon: LogOut01,
    variant: 'danger',
  },
]
