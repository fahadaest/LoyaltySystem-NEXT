import React from 'react';
import { MdHome, MdOutlineShoppingCart, MdBarChart, MdPerson, MdLock, MdInventory2, MdCardGiftcard, MdPeopleAlt, MdListAlt, MdLineStyle, MdLoyalty, MdStar, MdSupervisorAccount, MdReport, MdSettings, MdAccountBalanceWallet, MdLink, MdWifiTethering, MdSupport, MdGavel, } from 'react-icons/md';

import {
  MdAdminPanelSettings,
  MdOutlineSubscriptions,
  MdOutlineCreate,
} from 'react-icons/md';

const routes = [
  {
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Products',
    icon: <MdInventory2 className="h-6 w-6" />,
    layout: '/admin/product',
    path: '',
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
    layout: '/loyalty',
    path: '',
    submenu: [
      {
        name: 'Product Loyalty',
        layout: '/loyalty',
        path: 'product',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Point Loyalty',
        layout: '/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    name: 'Customers',
    layout: '/customer',
    path: 'all',
    icon: <MdPeopleAlt className="h-6 w-6" />,
  },
  {
    name: 'Sales Person',
    layout: '/customer',
    path: 'default',
    icon: <MdSupervisorAccount className="h-6 w-6" />,
  },
  {
    name: 'Managers',
    layout: '/customer',
    path: 'default',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Report',
    layout: '/customer',
    path: 'default',
    icon: <MdReport className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    icon: <MdSettings className="h-6 w-6" />,
    layout: '/loyalty',
    path: '',
    submenu: [
      {
        name: 'Wallet Address',
        layout: '/loyalty',
        path: 'product',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Social Links',
        layout: '/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Beacons',
        layout: '/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Wallet Support',
        layout: '/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Terms & Conditions',
        layout: '/loyalty',
        path: 'point',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
];

const superAdminroutes = [
  {
    name: 'Manage Admin',
    icon: <MdInventory2 className="h-6 w-6" />,
    layout: '/superadmin/manage-admin',
    path: 'manage-admin',
    submenu: [
      {
        name: 'Create Admin',
        layout: '/superadmin/manage-admin',
        path: 'create',
        icon: <MdOutlineCreate className="h-6 w-6" />,
      },
      {
        name: 'Admin List',
        layout: '/superadmin/manage-admin',
        path: 'list',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    name: 'Manage Subscription',
    layout: '/superadmin',
    path: 'subscriptions/list',
    icon: <MdOutlineSubscriptions className="h-6 w-6" />,
  },
];
export default { superAdminroutes, routes };
