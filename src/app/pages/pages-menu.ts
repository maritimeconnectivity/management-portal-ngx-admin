import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Administration',
    icon: 'lock-outline',
    children: [
      {
        title: 'Approve',
        link: '/pages/approve-org',
      },
    ],
  },
  {
    title: 'My organization',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Organizations',
    icon: 'grid-outline',
    link: '/pages/organizations',
  },
  {
    title: 'Identity Registry',
    icon: 'lock-outline',
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
      {
        title: 'Agents',
        link: '/pages/ir/agents',
      },
      {
        title: 'Acting For',
        link: '/pages/ir/acting',
      },
    ],
  },
  {
    title: 'Service Registry',
    icon: 'layers-outline',
    children: [
      {
        title: 'How To?',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Specifications',
        link: '/pages/layout/stepper',
      },
      {
        title: 'Designs',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Instances',
        link: '/pages/layout/stepper',
      },
    ],
  },
  {
    title: 'Service Registry - 2.0',
    icon: 'layers-outline',
    children: [
      {
        title: 'My services in MSR',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Add service to MSR',
        link: '/pages/layout/stepper',
      },
      {
        title: 'My services in ledger',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Add service to ledger',
        link: '/pages/layout/stepper',
      },
      {
        title: 'Service Management',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Approve MSR registration',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Approve ledger registration',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'MSR Ledger',
    icon: 'cube-outline',
    children: [
      {
        title: 'Search',
        link: '/pages/tables/smart-table',
      },
    ],
  },
  {
    title: 'Report bug',
    icon: 'alert-circle-outline',
    link: '/pages/guide',
  },
  {
    title: 'User guide',
    icon: 'question-mark-circle-outline',
    link: '/pages/guide',
  },
  {
    title: 'About',
    icon: 'bulb-outline',
    link: '/pages/about',
  },
  {
    title: 'Backup',
    group: true,
  },
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/pages/layout/stepper',
      },
      {
        title: 'List',
        link: '/pages/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/pages/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/pages/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/pages/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/pages/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/pages/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/pages/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/pages/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/pages/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/pages/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/pages/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/pages/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/pages/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/pages/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/pages/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/pages/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/pages/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/pages/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/pages/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/pages/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/pages/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/pages/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/pages/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/pages/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/pages/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/pages/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/pages/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/pages/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/pages/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/pages/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/pages/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
