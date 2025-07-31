import React from 'react';
import { useSelector } from 'react-redux';
import {
  MdHome,
  MdSupervisorAccount,
  MdOutlineSubscriptions,
  MdBarChart,
  MdQrCodeScanner,
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

import {
  selectIsSuperAdmin, selectIsAdmin, selectIsSalesPerson, selectIsManager,
  canAccessDashboard, selectCanManageProducts, selectCanManageProductSizes, selectCanManageProductLoyalty, selectCanManagePointLoyalty, selectCanManageWalletCards, selectCanManageCustomers, selectCanManageSalesPerson, selectCanManageManagers, selectCanAccessSettings, selectCanAccessWalletAddress, selectCanAccessWalletSocialLinks, selectCanAccessWalletBeacons, selectCanAccessWalletSupport, selectCanAccessWalletTermsAndConditions, selectCanScanCards
} from 'store/selectors/authSelectors';

export const useRoutes = () => {
  const isSuperAdmin = useSelector(selectIsSuperAdmin);
  const isAdmin = useSelector(selectIsAdmin);
  const isSalesPerson = useSelector(selectIsSalesPerson);
  const isManager = useSelector(selectIsManager);

  const dashboardAccess = useSelector(canAccessDashboard);
  const canManageProducts = useSelector(selectCanManageProducts);
  const canManageProductSizes = useSelector(selectCanManageProductSizes);
  const canManageProductLoyalty = useSelector(selectCanManageProductLoyalty);
  const canManagePointLoyalty = useSelector(selectCanManagePointLoyalty);
  const canManageWalletCards = useSelector(selectCanManageWalletCards);
  const canManageCustomers = useSelector(selectCanManageCustomers);
  const canManageSalesPerson = useSelector(selectCanManageSalesPerson);
  const canManageManagers = useSelector(selectCanManageManagers);
  const canAccessSettings = useSelector(selectCanAccessSettings);
  const canAccessWalletAddress = useSelector(selectCanAccessWalletAddress);
  const canAccessWalletSocialLinks = useSelector(selectCanAccessWalletSocialLinks);
  const canAccessWalletBeacons = useSelector(selectCanAccessWalletBeacons);
  const canAccessWalletSupport = useSelector(selectCanAccessWalletSupport);
  const canAccessWalletTermsAndConditions = useSelector(selectCanAccessWalletTermsAndConditions);
  const canScanCards = useSelector(selectCanScanCards);

  const allRoutes = [

    ...(isAdmin || dashboardAccess ? [{
      heading: 'Overview',
      name: 'Main Dashboard',
      layout: '/main',
      path: 'dashboard',
      icon: <MdBarChart className="h-6 w-6" />,
    }] : []),

    ...(canScanCards ? [{
      heading: 'Sales',
      name: 'Scan Card',
      icon: <MdQrCodeScanner className="h-6 w-6" />,
      layout: '/main',
      path: 'card-scanner',
      showDivider: false,
    }] : []),

    ...(isAdmin || canManageProducts || canManageProductSizes ? [{
      heading: 'Product & Loyalties',
      name: 'Products',
      icon: <FaBox className="h-6 w-6" />,
      layout: '/main/product',
      path: '',
      showDivider: false,
      submenu: [
        ...(isAdmin || canManageProducts ? [{
          name: 'Product Listing',
          layout: '/main/product',
          path: 'all',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canManageProductSizes ? [{
          name: 'Product Sizes',
          layout: '/main/product',
          path: 'size',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
      ],
    }] : []),

    ...(isAdmin || canManageProductLoyalty || canManagePointLoyalty ? [{
      name: 'Loyalty',
      icon: <FaThLarge className="h-6 w-6" />,
      layout: '/main/loyalty',
      path: '',
      showDivider: false,
      submenu: [
        ...(isAdmin || canManageProductLoyalty ? [{
          name: 'Product Loyalty',
          layout: '/main/loyalty',
          path: 'product',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canManagePointLoyalty ? [{
          name: 'Point Loyalty',
          layout: '/main/loyalty',
          path: 'point',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
      ],
    }] : []),

    ...(isAdmin || canManageWalletCards ? [{
      name: 'Cards',
      icon: <FaCreditCard className="h-6 w-6" />,
      layout: '/main/walletCards',
      path: '',
      submenu: [
        {
          name: 'Manage Wallet Cards',
          layout: '/main/walletCards',
          path: 'view',
          icon: <MdHome className="h-6 w-6" />,
        },
      ],
    }] : []),

    ...(isAdmin || canManageCustomers ? [{
      heading: 'Management',
      name: 'Customers',
      layout: '/main/customer',
      path: 'view',
      icon: <FaUsers className="h-6 w-6" />,
      showDivider: false,
    }] : []),

    ...(isAdmin || canManageSalesPerson ? [{
      name: 'Sales Person',
      layout: '/main',
      path: 'sales-person',
      icon: <FaBriefcase className="h-6 w-6" />,
      showDivider: false,
    }] : []),

    ...(isAdmin || canManageManagers ? [{
      name: 'Managers',
      layout: '/main',
      path: 'managers',
      icon: <FaBuilding className="h-6 w-6" />,
    }] : []),

    ...(isAdmin || canAccessSettings ? [{
      heading: 'Settings',
      name: 'Settings',
      icon: <FaCog className="h-6 w-6" />,
      layout: '/main/settings',
      path: '',
      showDivider: false,
      submenu: [
        ...(isAdmin || canAccessWalletAddress ? [{
          name: 'Wallet Address',
          layout: '/main/settings',
          path: 'wallet-address',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canAccessWalletSocialLinks ? [{
          name: 'Wallet Social Links',
          layout: '/main/settings',
          path: 'wallet-social-links',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canAccessWalletBeacons ? [{
          name: 'Wallet Beacons',
          layout: '/main/settings',
          path: 'wallet-beacons',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canAccessWalletSupport ? [{
          name: 'Wallet Support',
          layout: '/main/settings',
          path: 'wallet-support',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
        ...(isAdmin || canAccessWalletTermsAndConditions ? [{
          name: 'Terms & Conditions',
          layout: '/main/settings',
          path: 'wallet-terms-conditions',
          icon: <MdHome className="h-6 w-6" />,
        }] : []),
      ],
    }] : []),

    ...(isSuperAdmin ? [{
      heading: 'Admin',
      name: 'Manage Admin',
      icon: <MdSupervisorAccount className="h-6 w-6" />,
      layout: '/main',
      path: 'manage-admin',
    }] : []),

    ...(isSuperAdmin ? [{
      showDivider: false,
      heading: 'Subscriptions',
      name: 'Manage Subscription',
      layout: '/main',
      path: 'subscriptions',
      icon: <MdOutlineSubscriptions className="h-6 w-6" />,
    }] : []),
  ];

  return allRoutes;
};