import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Identity Registry',
    icon: 'lock-outline',
    children: [
      {
        title: 'Organizations',
        link: '/pages/ir/organizations',
      },
      {
        title: 'User Guide',
        link: '/pages/ir/guide',
      },
    ],
  },
  {
    title: 'Service Registry',
    icon: 'layers-outline',
    children: [
      {
        title: 'Search',
        link: '/pages/sr/search',
      },
      {
        title: 'Administration',
        children: [
          {
            title: 'Approve ledger registration',
            link: '/pages/sr/approve-svc',
          },
          {
            title: 'Services',
            link: '/pages/sr/instances',
          },
        ],
      },
      {
        title: 'My Organization',
        children: [
          {
            title: 'Register service',
            link: '/pages/sr/instances/register',
          },
          {
            title: 'Services',
            link: '/pages/sr/instances',
          },
        ],
      },
      {
        title: 'User Guide',
        link: '/pages/sr/guide',
      },
    ],
  },
  {
    title: 'Contact',
    icon: 'email',
    link: '/pages/contact',
  },
  {
    title: 'Report Bug',
    icon: 'alert-circle-outline',
    link: '/pages/bug-report',
  },
  {
    title: 'About',
    icon: 'bulb-outline',
    link: '/pages/about',
  },
];

export const MENU_FOR_ADMIN = {
  title: 'Administration',
  children: [
    {
      title: 'Approve',
      link: '/pages/ir/approve-org',
    },
  ],
};

export const MENU_FOR_ORG = {
  title: 'My Organization',
  home: true,
  children: [
    {
      title: 'Devices',
      link: '/pages/ir/devices',
    },
    {
      title: 'ID Services',
      link: '/pages/ir/services',
    },
    {
      title: 'Users',
      link: '/pages/ir/users',
    },
    {
      title: 'Vessels',
      link: '/pages/ir/vessels',
    },
    {
      title: 'Roles',
      link: '/pages/ir/roles',
    },
  ],
};
