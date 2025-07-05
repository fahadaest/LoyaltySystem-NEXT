import React from 'react';
import { MdHome, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock, MdInventory2, MdCardGiftcard, MdPeopleAlt, MdListAlt, MdLineStyle, MdLoyalty, MdStar, MdSupervisorAccount, MdReport, MdSettings, MdAccountBalanceWallet, MdLink, MdWifiTethering, MdSupport, MdGavel, } from 'react-icons/md';

import {
  MdAdminPanelSettings,
  MdOutlineSubscriptions,
  MdOutlineCreate,
} from 'react-icons/md';

const routes = [
  {
    heading: 'Dashboard',
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    heading: 'Product & Loyalties',
    name: 'Products',
    icon: <MdInventory2 className="h-6 w-6" />,
    layout: '/admin/product',
    path: '',
    showDivider: false,
    submenu: [
      {
        name: 'Product Listing',
        layout: '/admin/product',
        path: 'all',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Product Sizes',
        layout: '/admin/product',
        path: 'size',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    name: 'Loyalty',
    icon: <MdLoyalty className="h-6 w-6" />,
    layout: '/admin/loyalty',
    path: '',
    showDivider: false,
    submenu: [
      {
        name: 'Product Loyalty',
        layout: '/admin/loyalty',
        path: 'product',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Point Loyalty',
        layout: '/admin/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    name: 'Cards',
    icon: <MdLoyalty className="h-6 w-6" />,
    layout: '/admin/walletCards',
    path: '',
    submenu: [
      {
        name: 'Manage Wallet Cards',
        layout: '/admin/walletCards',
        path: 'view',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    heading: 'Customer Management',
    name: 'Customers',
    layout: '/admin/customer',
    path: 'view',
    icon: <MdPeopleAlt className="h-6 w-6" />,
  },
  {
    heading: 'Settings',
    name: 'Settings',
    icon: <MdLoyalty className="h-6 w-6" />,
    layout: '/admin/settings',
    path: '',
    submenu: [
      {
        name: 'Wallet Address',
        layout: '/admin/settings',
        path: 'wallet-address',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Social Links',
        layout: '/admin/settings',
        path: 'wallet-social-links',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Beacons',
        layout: '/admin/settings',
        path: 'wallet-beacons',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Support',
        layout: '/admin/settings',
        path: 'wallet-support',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Terms & Conditions',
        layout: '/admin/settings',
        path: 'wallet-terms-conditions',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  // {
  //   name: 'Sales Person',
  //   layout: '/customer',
  //   path: 'default',
  //   icon: <MdSupervisorAccount className="h-6 w-6" />,
  // },
  // {
  //   name: 'Managers',
  //   layout: '/customer',
  //   path: 'default',
  //   icon: <MdPerson className="h-6 w-6" />,
  // },
  // {
  //   name: 'Report',
  //   layout: '/customer',
  //   path: 'default',
  //   icon: <MdReport className="h-6 w-6" />,
  // },
  // {
  //   name: 'Settings',
  //   icon: <MdSettings className="h-6 w-6" />,
  //   layout: '/loyalty',
  //   path: '',
  //   submenu: [
  //     {
  //       name: 'Wallet Address',
  //       layout: '/loyalty',
  //       path: 'product',
  //       icon: <MdHome className="h-6 w-6" />,
  //     },
  //     {
  //       name: 'Wallet Social Links',
  //       layout: '/loyalty',
  //       path: 'point',
  //       icon: <MdHome className="h-6 w-6" />,
  //     },
  //     {
  //       name: 'Wallet Beacons',
  //       layout: '/loyalty',
  //       path: 'point',
  //       icon: <MdHome className="h-6 w-6" />,
  //     },
  //     {
  //       name: 'Wallet Support',
  //       layout: '/loyalty',
  //       path: 'point',
  //       icon: <MdHome className="h-6 w-6" />,
  //     },
  //     {
  //       name: 'Terms & Conditions',
  //       layout: '/loyalty',
  //       path: 'point',
  //       icon: <MdHome className="h-6 w-6" />,
  //     },
  //   ],
  // },
];

const superAdminroutes = [
  {
    heading: 'Admin',
    name: 'Manage Admin',
    icon: <MdInventory2 className="h-6 w-6" />,
    layout: '/superadmin',
    path: 'manage-admin',
  },
  {
    showDivider: false,
    heading: 'Subscriptions',
    name: 'Manage Subscription',
    layout: '/superadmin',
    path: 'subscriptions',
    icon: <MdOutlineSubscriptions className="h-6 w-6" />,
  },
];
export default { superAdminroutes, routes };
