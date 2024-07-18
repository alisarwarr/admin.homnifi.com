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
import {
  ArrowDown_,
  emptyWallet_,
  flash_,
  Swap_,
} from '../../images/drawer/dark';
import {
  setting,
  settingDark,
  swapIcon,
  users,
  usersDark,
} from '../../images/other';
import {
  Dashboard,
  Wallet,
  Admin,
  CloundK2,
  Token,
  AdminSetting,
  Community,
} from '../../images/drawer';

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
        icon: <Token />,
        icon_dark: emptyWallet_,
        url: '',
        key: 'tokens',
        active: false,
        options: [
          {
            name: 'Deposit Settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/token/deposit-settings',
            key: 'deposit-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens'],
          },
          {
            name: 'Swap Settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/token/swap-settings',
            key: 'swap-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens'],
          },
          {
            name: 'Network Settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/token/network-settings',
            key: 'network-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens'],
          },

          {
            name: 'Tokens settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/tokens',
            key: 'tokens-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens'],
          },
          // {
          //   name: 'Transition Setting',
          //   icon: <Dashboard />,
          //   icon_dark: setting,
          //   url: '/tokens/settings/transition',
          //   key: 'tokens-transition-settings',
          //   active: false,
          //   options: [],
          //   permissions: [`all`, `superadmin`, 'tokens'],
          // },
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
            name: 'Withdraw Settings',
            icon: <Dashboard />,
            icon_dark: setting,
            url: '/wallet/withdraw-settings',
            key: 'wallet-withdraw-settings',
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
        name: 'Cloud k 2.0',
        icon: <CloundK2 />,
        icon_dark: AdminDark,
        url: '',
        key: 'cloudk2',
        active: false,
        options: [
          {
            name: 'Product List',
            icon: <></>,
            icon_dark: setting,
            url: '/cloudk2/products',
            key: 'product_list',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          },
          {
            name: 'Machine List',
            icon: <></>,
            icon_dark: setting,
            url: '/cloudk2/machines',
            key: 'machine_list',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings'],
          },
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
        icon: <Community />,
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
        name: 'Defi 360',
        icon: <Community />,
        icon_dark: AdminDark,
        url: '',
        key: 'defi-360',
        active: false,
        options: [
          {
            name: 'Auto Compound Penality',
            icon: <Admin />,
            icon_dark: AdminDark,
            url: '/defi-360/auto-compound-penality',
            key: 'community-friends',
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
        icon: <AdminSetting />,
        icon_dark: AdminDark,
        url: '',
        key: 'admin',
        active: false,
        options: [
          {
            name: 'Admins',
            icon: <Admin />,
            icon_dark: setting,
            url: 'admin-setting/admins',
            key: 'admin-settings-admin',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admin_maintenance_settings'],
          },
          {
            name: 'Roles',
            icon: <Admin />,
            icon_dark: setting,
            url: 'admin-setting/roles',
            key: 'admin-settings-roles',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admin_settings_roles'],
          },
          {
            name: 'Cron Jobs',
            icon: <Admin />,
            icon_dark: setting,
            url: 'admin-setting/cron-jobs',
            key: 'admin-settings-cron-jobs',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admin_settings_cron_jobs'],
          },
          {
            name: 'Maintenance Setting',
            icon: <></>,
            icon_dark: setting,
            url: '/admin-settings/maintenance',
            key: 'admins-setting-maintenance',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'admins_setting_maintenance'],
          },
        ],
        permissions: [`all`, `superadmin`, 'tokens_settings'],
      },
    ],
  },
];
