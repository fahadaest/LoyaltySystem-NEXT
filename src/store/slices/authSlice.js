import { createSlice } from '@reduxjs/toolkit';
import { authenticationApis } from './authentication';

const ROLES = {
    SUPERADMIN: 'superadmin',
    ADMIN: 'admin',
    MANAGER: 'manager',
    SALESPERSON: 'salesperson',
    CUSTOMER: 'customer',
};

const ROLE_HIERARCHY = {
    [ROLES.SUPERADMIN]: 5,
    [ROLES.ADMIN]: 4,
    [ROLES.MANAGER]: 3,
    [ROLES.SALESPERSON]: 2,
    [ROLES.CUSTOMER]: 1,
};

// Cookie helper functions
const getCookie = (name) => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
};

const setCookie = (name, value, hours = 1) => {
    if (typeof document === 'undefined') return;
    const expires = new Date();
    expires.setTime(expires.getTime() + hours * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const deleteCookie = (name) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

// Helper to decode JWT and get user data (simplified)
const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch {
        return null;
    }
};

const getStoredUser = () => {
    if (typeof localStorage === 'undefined') return null;
    try {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    } catch {
        return null;
    }
};

const setStoredUser = (user) => {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('user', JSON.stringify(user));
};

const removeStoredUser = () => {
    if (typeof localStorage === 'undefined') return;
    localStorage.removeItem('user');
};

// Initialize state with token from cookies and user from localStorage
const token = getCookie('token');
const storedUser = getStoredUser();

const initialState = {
    user: storedUser,
    token: token,
    isAuthenticated: !!(token && storedUser),
    permissions: storedUser?.permissions || [],
    role: storedUser?.role || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.permissions = [];
            state.role = null;
            deleteCookie('token');
            removeStoredUser();
        },
        setPermissions: (state, action) => {
            state.permissions = action.payload;
        },
        refreshToken: (state) => {
            // Refresh token expiry on activity
            if (state.token) {
                setCookie('token', state.token, 1);
            }
        },
        restoreAuthState: (state) => {
            // Restore auth state from cookies/localStorage
            const token = getCookie('token');
            const storedUser = getStoredUser();

            if (token && storedUser) {
                state.token = token;
                state.user = storedUser;
                state.isAuthenticated = true;
                state.role = storedUser.role;
                state.permissions = storedUser.permissions || [];
            } else {
                // Clear everything if incomplete data
                state.user = null;
                state.token = null;
                state.isAuthenticated = false;
                state.permissions = [];
                state.role = null;
                deleteCookie('token');
                removeStoredUser();
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authenticationApis.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                // Extract user data (everything except token)
                const { token, ...userData } = payload;

                state.user = userData;
                state.token = token;
                state.isAuthenticated = true;
                state.role = userData.role;
                state.permissions = userData.permissions || [];

                setCookie('token', token, 1); // Save for 1 hour
                setStoredUser(userData); // Store user data in localStorage
            }
        );

        // Refresh token on any successful API call
        builder.addMatcher(
            (action) => {
                return action.type.endsWith('/fulfilled') &&
                    action.type.startsWith('api/');
            },
            (state) => {
                if (state.token && state.isAuthenticated) {
                    setCookie('token', state.token, 1); // Extend for another hour
                }
            }
        );
    },
});

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;
export const selectPermissions = (state) => state.auth.permissions;

// Role-based selectors
export const selectHasRole = (requiredRole) => (state) => {
    const userRole = state.auth.role;
    if (!userRole) return false;
    return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const selectHasPermission = (permission) => (state) => {
    return state.auth.permissions?.includes(permission) || false;
};

export const selectCanAccess = (requiredRole, requiredPermission) => (state) => {
    const hasRole = selectHasRole(requiredRole)(state);
    const hasPermission = requiredPermission ? selectHasPermission(requiredPermission)(state) : true;
    return hasRole && hasPermission;
};

export const { logout, setPermissions, refreshToken, restoreAuthState } = authSlice.actions;
export { ROLES, ROLE_HIERARCHY };
export default authSlice.reducer;