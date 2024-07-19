//REACT
import React from 'react';
//ROUTER-DOM
import { createBrowserRouter } from 'react-router-dom';
//COMPONENTS
import Loader from '../components/Loader/Loader';
import Layout from '../components/Layout';
//CONSTANTS
import PathConstants from './pathConstants';
import AuthLayout from '../components/AuthLayout';
//PAGES
import Signin from '../pages/Signin';
import Error from '../pages/Error';
import { ProtectedRoute } from '../utils/protectedRoute';
import Tokens from '../pages/Tokens';
import Users from '../pages/Users';
import UserVerificationRequests from '../pages/Users/UserVerifications';
import WithdrawRequests from '../pages/Wallet/WithdrawRequests';

import AddProduct from '../pages/Products/AddProduct';
import UserVerificationDetails from '../pages/Users/UserVerifications/UserVerificationDetails';
import MigrationRequests from '../pages/Wallet/MigrationRequests';
import Features from '../pages/Features';
import QuickyPaySettings from '../pages/Settings/QucikyPaySettings';
import Dashboard from '../pages/Dashboard';
import UserDetails from '../pages/Users/UserDetails';
import Links from '../pages/Settings/Links';
import PrivacyPolicy from '../pages/Settings/PrivacyPolicy';
import TermsAndConditions from '../pages/Settings/TermsAndConditions';
import Profile from '../pages/Profile';
import Admins from '../pages/Admins';
import SwapPriority from '../pages/Settings/SwapPriority';
import ShowPages from '../pages/Settings/ShowPages';
import AdminDeatils from '../components/Admin/AdminDeatils';
import Maintenance from '../pages/Admins/Maintenance';
import SliderImages from '../pages/Admins/AuthSlider/SliderImages';
import DepositHistory from '../pages/Wallet/DepositHistory';
import Faqs from '../pages/Wallet/Faqs';
import AddFaqs from '../pages/Wallet/Faqs/AddFaqs';
import MigrationHistory from '../pages/Wallet/MIgrationHistory';
import FeaturePurchaseHistory from '../pages/Wallet/FeaturePurchaseHistory';
import ProductPurchaseHistory from '../pages/Wallet/ProductPurchaseHistory';
import SwapHistory from '../pages/Wallet/SwapHistory';
import Cloud2 from '../pages/Cloud2';

import AuthSlider from '../pages/Admins/AuthSlider';
import InflationRules from '../pages/Cloud2/InflationRules';
import AdminRoles from '../pages/Admins/AdminRoles';
import WithdrawSetting from '../pages/Wallet/WithdrawSetting';
import SwapSettings from '../pages/Tokens/SwapSettings';
import DepositSettings from '../pages/Tokens/DepositSettings';
import NetworkSettings from '../pages/Tokens/NetworkSettings';
import ProductList from '../pages/Cloud2/ProductList';
import MachineList from '../pages/Cloud2/MachineList';
import CronJob from '../pages/Admins/CronJobs';
import AutoCompoundPenality from '../pages/Defi-360/AutoCompoundPenality';
import Simulation from '../pages/Cloud2/Simulation';
import Marketing from '../pages/Marketing';
import CommunityFriends from '../pages/community/Friends';
import CommunitySupernode from../pages/community/FriendsNode';

export const router = createBrowserRouter([
  {
    path: PathConstants.DASHBOARD,
    element: (
      <React.Suspense fallback={<Loader />}>
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </React.Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/tokens',
        element: (
          <ProtectedRoute>
            <Tokens />
          </ProtectedRoute>
        ),
      },
      ////////////////////////
      ////////////////////////
      {
        path: '/tokens',
        element: (
          <ProtectedRoute>
            <Tokens />
          </ProtectedRoute>
        ),
      },
      {
        path: '/token/swap-settings',
        element: (
          <ProtectedRoute>
            <SwapSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: '/token/deposit-settings',
        element: (
          <ProtectedRoute>
            <DepositSettings />
          </ProtectedRoute>
        ),
      },
      {
        path: '/token/networks',
        element: (
          <ProtectedRoute>
            <NetworkSettings />
          </ProtectedRoute>
        ),
      },
      ////////////////////////
      ////////////////////////
      {
        path: '/cloudk',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Cloud2 />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/community/friends',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <CommunityFriends />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/community/super-node',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <CommunitySupernode />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/marketing',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Marketing />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      // {
      //   path: '/tokens/settings/withdraw',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenWithdrawSettings />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: '/tokens/settings/swap',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenSwapSettings />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: '/tokens/settings/transfer',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenSwapSettings />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: '/tokens/settings/token-pairs',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenPairs />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: '/tokens/settings/token-pair/details/:id',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenPairSettingDetails />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      // {
      //   path: '/tokens/settings/migrate',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <TokenMigrateSettings />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // }
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/view/:id',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/edit/:id',
        element: (
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users/verifications',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserVerificationRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/users/verifications/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <UserVerificationDetails />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/withdraw-requests',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WithdrawRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/migration-requests',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <MigrationRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/wallet/swap',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SwapHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      // {
      //   path: '/wallet/transfer',
      //   element: (
      //     <React.Suspense fallback={<Loader />}>
      //       <ProtectedRoute>
      //         <SwapHistory />
      //       </ProtectedRoute>
      //     </React.Suspense>
      //   ),
      // },
      {
        path: '/wallet/withdraw',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WithdrawRequests />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/token/withdraw-settings',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <WithdrawSetting />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/wallet/deposit',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <DepositHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/faq',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Faqs />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/faq/add',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddFaqs />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/migrationhistory',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <MigrationHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/feature-purchase-history',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <FeaturePurchaseHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/history/product-purchase-history',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ProductPurchaseHistory />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },

      {
        path: 'cloudk2/products/add',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'cloudk2/products/details/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/features',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Features />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/quicky-pay',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <QuickyPaySettings />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/links',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Links />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/show-pages',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ShowPages />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/swap-priority',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SwapPriority />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/privacypolicy',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <PrivacyPolicy />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/profile',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-setting/admins',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Admins />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-setting/admins/view/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-setting/admins/edit/:id',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-setting/admins/create',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminDeatils create={true} />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'admin-setting/roles',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AdminRoles />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: 'admin-setting/cron-jobs',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <CronJob />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-settings/maintenance',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Maintenance />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/cloudk2/inflation-rules',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <InflationRules />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/cloudk2/simulation',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <Simulation />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/cloudk2/products',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/cloudk2/machines',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <MachineList />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/admin-settings/auth-slider-settings',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AuthSlider />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/adminsettings/authslider/images',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SliderImages />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/adminsettings/authslider/text',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <SliderImages />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/settings/termsandconditions',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <TermsAndConditions />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
      {
        path: '/defi-360/auto-compound-penality',
        element: (
          <React.Suspense fallback={<Loader />}>
            <ProtectedRoute>
              <AutoCompoundPenality />
            </ProtectedRoute>
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <React.Suspense fallback={<Loader />}>
        <AuthLayout />
      </React.Suspense>
    ),
    children: [
      {
        path: 'signin',
        element: (
          <React.Suspense fallback={<Loader />}>
            <Signin />
          </React.Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <React.Suspense fallback={<Loader />}>
        <Error />
      </React.Suspense>
    ),
  },
]);
