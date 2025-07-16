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

const normalizeUserData = (userData: any): User => {
    const id = userData.id || userData._id;

    const normalized = {
        id: id.toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role as 'admin' | 'superadmin'
    };

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
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        setInitialized: (state) => {
            state.isInitialized = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.verifyToken.matchFulfilled,
                (state, { payload }) => {
                    const normalizedUser = normalizeUserData(payload);
                    state.user = normalizedUser;
                    state.isAuthenticated = true;
                    state.isInitialized = true;
                }
            )
            .addMatcher(
                authApi.endpoints.verifyToken.matchRejected,
                (state, { payload, error }) => {
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