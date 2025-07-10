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

export const selectIsAdminOrAbove = createSelector(
    [selectUserRole],
    (role) => ['admin', 'superadmin'].includes(role as string)
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