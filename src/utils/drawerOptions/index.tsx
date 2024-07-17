//IMAGES
import { Dashboard, Wallet, Admin, CloundK2 } from '../../images/drawer';
import { HomeDark, AdminDark } from '../../images/drawer/light';
import { emptyWallet_ } from '../../images/drawer/dark';
import { setting } from '../../images/other';

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
        name: 'Tokens',
        icon: <Dashboard />,
        icon_dark: emptyWallet_,
        url: '',
        key: 'tokens',
        active: false,
        options: [
          {
            name: 'Tokens settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/tokens',
            key: 'tokens-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          },
          {
            name: 'Transition Setting',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/tokens/settings/transition',
            key: 'tokens-transition-settings',
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
        key: 'wallet',
        active: false,
        options: [
          {
            name: 'Deposit',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/wallet/deposit',
            key: 'wallet-deposit',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'deposit-history'],
          },
          {
            name: 'Withdraw',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/wallet/withdraw',
            key: 'wallet-withdraw',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-withdraw'],
          },
          {
            name: 'Transfer',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/wallet/transfer',
            key: 'wallet-transfer',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-migrate'],
          },
          {
            name: 'Swap',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/wallet/swap',
            key: 'wallet-swap',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-swap'],
          },
          {
            name: 'Faqs',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/history/faq',
            key: 'wallet-faq',
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
        name: 'Cloud k 2.0',
        icon: <CloundK2 />,
        icon_dark: AdminDark,
        url: '',
        key: 'cloudk2',
        active: false,
        options: [
          {
            name: 'Inflation Rules',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/cloudk2/inflation-rules',
            key: 'inflation-rules',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          },

        ],
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
        url: '',
        key: 'community',
        active: false,
        options: [
          {
            name: 'Friends',
            icon: <Admin />,
            icon_dark: AdminDark,
            url: '/community/friends',
            key: 'community-friends',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admins'],
          },
          {
            name: 'Super Node',
            icon: <Admin />,
            icon_dark: AdminDark,
            url: '/community/super-node',
            key: 'community-super-node',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admins'],
          },
        ],
        permissions: [`all`, `superadmin`, 'admins'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Admin Setting',
        icon: <Admin />,
        icon_dark: emptyWallet_,
        url: '',
        key: 'admin',
        active: false,
        options: [
          {
            name: 'Maintenance settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/admin-settings/maintenance',
            key: 'admins-setting-maintenance',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          },
          {
            name: 'Auth Slider Setting',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/admin-settings/auth-slider-settings',
            key: 'admins-setting-auth-slider',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          }
        ],
        permissions: [`all`, `superadmin`, 'tokens_settings'],
      },
    ],
  },
];
