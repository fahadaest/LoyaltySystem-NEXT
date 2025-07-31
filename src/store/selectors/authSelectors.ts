import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectAuth = (state: RootState) => state.auth;

export const selectUser = createSelector([selectAuth], (auth) => auth.user);

export const selectIsAuthenticated = createSelector(
    [selectAuth],
    (auth) => auth.isAuthenticated
);

export const selectIsInitialized = createSelector(
    [selectAuth],
    (auth) => auth.isInitialized
);

export const selectToken = createSelector(
    [selectAuth],
    (auth) => auth.token
);

// Role-based selectors
export const selectUserRole = createSelector(
    [selectUser],
    (user) => user?.role
);

export const selectIsSuperAdmin = createSelector(
    [selectUserRole],
    (role) => role === 'superadmin'
);

export const selectIsAdmin = createSelector(
    [selectUserRole],
    (role) => role === 'admin'
);

export const selectIsSalesPerson = createSelector(
    [selectUserRole],
    (role) => role === 'salesperson'
);

export const selectIsManager = createSelector(
    [selectUserRole],
    (role) => role === 'manager'
);

export const selectIsAdminOrAbove = createSelector(
    [selectUserRole],
    (role) => ['admin', 'superadmin'].includes(role as string)
);


// permission based selectors
export const selectUserPermissions = createSelector(
    [selectUser],
    (user) => user?.permissions || []
);

export const canAccessDashboard = createSelector(
    [selectUserPermissions, selectUserRole],
    (permissions) => {
        return permissions.some((permission: any) => permission.name === 'access_dashboard');
    }
);

export const selectCanManageProducts = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_products')
);

export const selectCanManageProductSizes = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_product_sizes')
);

export const selectCanManageProductLoyalty = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_product_loyalty')
);

export const selectCanManagePointLoyalty = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_point_loyalty')
);

export const selectCanManageWalletCards = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_wallet_card')
);

export const selectCanManageCustomers = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_customers')
);

export const selectCanManageSalesPerson = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_salespersons')
);

export const selectCanManageManagers = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_managers')
);

export const selectCanAccessSettings = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_settings')
);

export const selectCanAccessWalletAddress = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_wallet_address')
);

export const selectCanAccessWalletSocialLinks = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_wallet_social_links')
);

export const selectCanAccessWalletBeacons = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_wallet_beacons')
);

export const selectCanAccessWalletSupport = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_wallet_support')
);

export const selectCanAccessWalletTermsAndConditions = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'manage_terms_conditions')
);

export const selectCanScanCards = createSelector(
    [selectUserPermissions],
    (permissions) => permissions.some((permission: any) => permission.name === 'scan_cards')
);

// Factory selectors for flexible role checking
export const selectHasRole = createSelector(
    [selectUserRole],
    (role) => (requiredRole: string) => role === requiredRole
);

export const selectHasAnyRole = createSelector(
    [selectUserRole],
    (role) => (requiredRoles: string[]) => requiredRoles.includes(role as string)
);