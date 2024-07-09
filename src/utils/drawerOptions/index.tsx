//IMAGES
import {
  Home,
  ArrowDown,
  emptyWallet,
  flash,
  Swap,
  HomeDark,
  Features,
  FeauresDark,
  History,
  HistoryDark,
  AdminDark,
} from '../../images/drawer/light';
import { ArrowDown_, emptyWallet_, flash_, Swap_ } from '../../images/drawer/dark';
import { setting, settingDark, swapIcon, users, usersDark } from '../../images/other';
import { Dashboard, Wallet , Admin, CloundK2} from '../../images/drawer';

export interface DrawerOption {
  name: string;
  icon: React.ReactNode;
  icon_dark: string;
  url: string | null;
  key?: string;
  options?: DrawerOption[];
  active?: boolean;
  disable?: boolean;
  permissions: string[];
}
interface DrawerSection {
  options: DrawerOption[];
}

export const allDrawerOptions: DrawerSection[] = [
  {
    options: [
      {
        name: 'Dashboard',
        icon: <Dashboard />,
        icon_dark: HomeDark,
        url: '/',
        key: 'dashboard',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'dashboard'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Features',
        icon: <Dashboard />,
        icon_dark: FeauresDark,
        url: '/features',
        key: 'features',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'features'],
      },
    ],
  },

  // {
  //   options: [
  //     {
  //       name: 'Admins',
  //       icon: Admin,
  //       icon_dark: AdminDark,
  //       url: '/admins',
  //       key: 'admins',
  //       active: false,
  //       options: [],
  //       permissions: [`all`, `superadmin`, 'admins'],
  //     },
  //   ],
  // },

  {
    options: [
      {
        name: 'Tokens Settings',
        icon: <Dashboard />,
        icon_dark: emptyWallet_,
        url: '',
        key: 'token-settings',
        active: false,
        options: [
          {
            name: 'Tokens',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/tokens',
            key: 'tokens',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-assets'],
          },
          {
            name: 'Transition Setting',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/tokens/settings/transition',
            key: 'tokens-deposit-transition',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-transition'],
          },
        ],
        permissions: [`all`, `superadmin`, 'tokens_settings'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Wallet',
        icon: <Wallet />,

        icon_dark: emptyWallet_,
        url: '',
        key: 'wallet-settings',
        active: false,
        options: [
          {
            name: 'Deposit',
            icon: <Dashboard />,

            icon_dark: setting,
            url: '/history/deposithistory',
            key: 'deposit-history',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'deposit-history'],
          },
          {
            name: 'Withdraw',
            icon: <Dashboard />,

            icon_dark: setting,
            url: '/history/withdrawhistory',
            key: 'wallet-withdraw-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-withdraw'],
          },
          {
            name: 'Transfer',
            icon: <Dashboard />,

            icon_dark: setting,
            url: '/tokens/settings/migrate',
            key: 'tokens_settings-migrate',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-migrate'],
          },
          {
            name: 'Swap',
            icon: <Dashboard />,

            icon_dark: setting,
            url: '/wallet/settings/swap',
            key: 'wallet-swap-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-swap'],
          },
          {
            name: 'Faqs',
            icon: <Dashboard />,

            icon_dark: setting,
            url: '/history/faq',
            key: 'history-faq',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'history_faq'],
          },
        ],
        permissions: [`all`, `superadmin`, 'tokens_settings'],
      },
    ],
  },

  {
    options: [
      {
        name: 'Admins',
        icon: <Admin />,
        icon_dark: AdminDark,
        url: '/admins',
        key: 'admins',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Admins',
        icon: <Admin />,
        icon_dark: AdminDark,
        url: '/admins',
        key: 'admins',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Cloud k 2.0',
        icon: <CloundK2 />,
        icon_dark: AdminDark,
        url: '/admins',
        key: 'admins',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Community',
        icon: <Admin />,
        icon_dark: AdminDark,
        url: '/admins',
        key: 'admins',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
];
