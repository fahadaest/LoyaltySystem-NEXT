import React from 'react';
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
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
    icon: <MdHome className="h-6 w-6" />,
    layout: '/product',
    path: '',
    submenu: [
      {
        name: 'Product Listing',
        layout: '/product',
        path: 'all',
        icon: <MdHome className="h-6 w-6" />,
      },
      {
        name: 'Product Sizes',
        layout: '/product',
        path: 'size',
        icon: <MdHome className="h-6 w-6" />,
      },
    ],
  },
  {
    name: 'Loyalty',
    icon: <MdHome className="h-6 w-6" />,
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
    name: 'NFT Marketplace',
    layout: '/admin',
    path: 'nft-marketplace',
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,

    secondary: true,
  },
  {
    name: 'Data Tables',
    layout: '/admin',
    icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];

const superAdminroutes = [
  {
    name: 'Create Admin',
    layout: '/superadmin',
    path: 'manage-admin/create',
    icon: <MdOutlineCreate className="h-6 w-6" />,
  },
  {
    name: 'Admin List',
    layout: '/superadmin',
    path: 'manage-admin/list',
    icon: <MdAdminPanelSettings className="h-6 w-6" />,
  },
  {
    name: 'Manage Subscription',
    layout: '/superadmin',
    path: 'subscriptions/list',
    icon: <MdOutlineSubscriptions className="h-6 w-6" />,
  },
];
export default { superAdminroutes, routes };
