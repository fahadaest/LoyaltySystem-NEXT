import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'store/apiEndPoints/authApi';

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'superadmin';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    token: null,
};

// Helper function to normalize user data from different API responses
const normalizeUserData = (userData: any): User => {
    console.log('🔧 Normalizing user data:', userData);

    // Handle both login response (_id) and verify response (id)
    const id = userData.id || userData._id;

    const normalized = {
        id: id.toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role as 'admin' | 'superadmin'
    };

    console.log('🔧 Normalized result:', normalized);
    return normalized;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            state.isInitialized = true;
            console.log('🔄 Auth slice - credentials set:', user);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            console.log('🔄 Auth slice - logged out');
        },
        setInitialized: (state) => {
            state.isInitialized = true;
            console.log('🔄 Auth slice - marked as initialized');
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle token verification success
            .addMatcher(
                authApi.endpoints.verifyToken.matchFulfilled,
                (state, { payload }) => {
                    console.log('🔍 Raw verify token payload:', payload);

                    // IMPORTANT: The payload IS the user data directly
                    // Your API returns the user object directly, not wrapped in { user: ... }
                    const normalizedUser = normalizeUserData(payload);

                    state.user = normalizedUser;
                    state.isAuthenticated = true;
                    state.isInitialized = true;
                    console.log('🔄 Auth slice - token verification success:', normalizedUser);
                }
            )
            // Handle token verification failure
            .addMatcher(
                authApi.endpoints.verifyToken.matchRejected,
                (state, { payload, error }) => {
                    console.log('🔄 Auth slice - token verification failed:', { payload, error });
                    state.user = null;
                    state.isAuthenticated = false;
                    state.isInitialized = true;
                    state.token = null;
                }
            );
    },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;