import React from 'react';
import { MdHome, MdInventory2, MdPeopleAlt, MdLoyalty, MdSupervisorAccount } from 'react-icons/md';
import { MdOutlineSubscriptions, } from 'react-icons/md';

const routes = [
  {
    heading: 'Overview',
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
    heading: 'Management',
    name: 'Customers',
    layout: '/admin/customer',
    path: 'view',
    icon: <MdPeopleAlt className="h-6 w-6" />,
    showDivider: false,
  },
  {
    name: 'Sales Person',
    layout: '/admin',
    path: 'sales-person',
    icon: <MdSupervisorAccount className="h-6 w-6" />,
    showDivider: false,
  },
  {
    name: 'Managers',
    layout: '/admin',
    path: 'managers',
    icon: <MdSupervisorAccount className="h-6 w-6" />,
    showDivider: false,
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

const salesRoutes = [
  {
    heading: 'Admin',
    name: 'Manage Admin',
    icon: <MdInventory2 className="h-6 w-6" />,
    layout: '/superadmin',
    path: 'manage-admin',
  },

];

export default { superAdminroutes, routes, salesRoutes };