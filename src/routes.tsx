import React from 'react';
import {
  MdHome,
  MdInventory2,
  MdPeopleAlt,
  MdLoyalty,
  MdSupervisorAccount,
  MdOutlineSubscriptions,
  MdSettings,
  MdCreditCard,
  MdBarChart,
  MdDashboard,
  MdQrCodeScanner,
  MdBusiness
} from 'react-icons/md';
import {
  FaBox,
  FaThLarge,
  FaCreditCard,
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaCog
} from 'react-icons/fa';

const routes = [
  {
    heading: 'Overview',
    name: 'Main Dashboard',
    layout: '/admin',
    path: 'dashboard',
    icon: <MdBarChart className="h-6 w-6" />,
  },
  {
    heading: 'Product & Loyalties',
    name: 'Products',
    icon: <FaBox className="h-6 w-6" />,
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
    icon: <FaThLarge className="h-6 w-6" />,
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
    icon: <FaCreditCard className="h-6 w-6" />,
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
    icon: <FaUsers className="h-6 w-6" />,
    showDivider: false,
  },
  {
    name: 'Sales Person',
    layout: '/admin',
    path: 'sales-person',
    icon: <FaBriefcase className="h-6 w-6" />,
    showDivider: false,
  },
  {
    name: 'Managers',
    layout: '/admin',
    path: 'managers',
    icon: <FaBuilding className="h-6 w-6" />,
  },
  {
    heading: 'Settings',
    name: 'Settings',
    icon: <FaCog className="h-6 w-6" />,
    layout: '/admin/settings',
    path: '',
    showDivider: false,
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
    icon: <MdSupervisorAccount className="h-6 w-6" />,
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
    heading: 'Dashboard',
    name: 'Dashboard',
    icon: <MdDashboard className="h-6 w-6" />,
    layout: '/sales',
    path: 'dashboard',
  },
  {
    heading: 'Sales',
    name: 'Scan Card',
    icon: <MdQrCodeScanner className="h-6 w-6" />,
    layout: '/sales',
    path: 'card-scanner',
    showDivider: false,
  },
];

export default { superAdminroutes, routes, salesRoutes };