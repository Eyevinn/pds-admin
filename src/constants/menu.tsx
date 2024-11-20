import { IconUsers } from '@tabler/icons-react';

export type MenuItem = {
  text: string;
  path: string;
  icon?: JSX.Element;
  betaIcon?: JSX.Element;
  tourId?: string;
};

export const MenuItems: MenuItem[] = [
  {
    text: 'Accounts',
    path: '/dashboard/accounts',
    icon: <IconUsers />
  }
];
