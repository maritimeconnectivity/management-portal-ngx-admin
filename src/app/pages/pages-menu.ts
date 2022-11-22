/*
 * Copyright (c) 2022 Maritime Connectivity Platform Consortium
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NbMenuItem } from '@nebular/theme';

/**
 * menu for pages
 */
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
        title: 'Services',
        link: '/pages/sr/instances',
      },
      {
        title: 'Search',
        link: '/pages/sr/search',
      },
      {
        title: 'User Guide',
        link: '/pages/sr/guide',
      },
    ],
  },
  {
    title: 'Global Service Discovery',
    icon: 'radio-outline',
    children: [
      {
        title: 'MSR Ledger Search',
        link: '/pages/ledger/search',
      },
    ],
  },
  {
    title: 'About',
    icon: 'bulb-outline',
    link: '/pages/about',
  },
];

export const MIR_MENU_FOR_ADMIN = {
  title: 'Approve organization',
  link: '/pages/ir/orgcandidates',
};

export const MIR_MENU_FOR_ORG = {
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

export const MSR_MENU_FOR_ORG = {
  title: 'My Organization',
  children: [
    {
      title: 'Services',
      link: '/pages/sr/instanceorg',
    },
  ],
};