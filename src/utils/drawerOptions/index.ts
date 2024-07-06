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
  Admin,
  AdminDark,
} from '../../images/drawer/light';
import { ArrowDown_, emptyWallet_, flash_, Swap_ } from '../../images/drawer/dark';
import { setting, settingDark, swapIcon, users, usersDark } from '../../images/other';

export interface DrawerOption {
  name: string;
  icon_light: string;
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
        icon_light: Home,
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
        icon_light: Features,
        icon_dark: FeauresDark,
        url: '/features',
        key: 'features',
        active: false,
        options: [],
        permissions: [`all`, `superadmin`, 'features'],
      },
    ],
  },
  {
    options: [
      {
        name: 'Tokens Settings',
        icon_light: emptyWallet,
        icon_dark: emptyWallet_,
        url: '',
        key: 'token-settings',
        active: false,
        options: [
          {
            name: 'Assets',
            icon_light: setting,
            icon_dark: setting,
            url: '/tokens',
            key: 'tokens',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-assets'],
          },
          {
            name: 'Deposit',
            icon_light: setting,
            icon_dark: setting,
            url: '/tokens/settings/deposit',
            key: 'tokens-deposit-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-deposit'],
          },
          {
            name: 'Withdraw',
            icon_light: setting,
            icon_dark: setting,
            url: '/tokens/settings/withdraw',
            key: 'tokens-withdraw-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-withdraw'],
          },
          {
            name: 'Migrate',
            icon_light: setting,
            icon_dark: setting,
            url: '/tokens/settings/migrate',
            key: 'token-migrate-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-migrate'],
          },
          {
            name: 'Swap',
            icon_light: setting,
            icon_dark: setting,
            url: '/tokens/settings/swap',
            key: 'token-swap-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-swap'],
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
        icon_light: emptyWallet,
        icon_dark: emptyWallet_,
        url: '',
        key: 'wallet-settings',
        active: false,
        options: [
          {
            name: 'Assets',
            icon_light: setting,
            icon_dark: setting,
            url: '/wallet',
            key: 'wallet',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-assets'],
          },
          {
            name: 'Deposit',
            icon_light: setting,
            icon_dark: setting,
            url: '/wallet/settings/deposit',
            key: 'wallet-deposit-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-deposit'],
          },
          {
            name: 'Withdraw',
            icon_light: setting,
            icon_dark: setting,
            url: '/wallet/settings/withdraw',
            key: 'wallet-withdraw-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-withdraw'],
          },
          {
            name: 'Migrate',
            icon_light: setting,
            icon_dark: setting,
            url: '/wallet/settings/migrate',
            key: 'wallet-migrate-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-migrate'],
          },
          {
            name: 'Swap',
            icon_light: setting,
            icon_dark: setting,
            url: '/wallet/settings/swap',
            key: 'wallet-swap-settings',
            active: false,
            options: [],
            permissions: [`all`, `superadmin`, 'tokens_settings-swap'],
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
        icon_light: Admin,
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
