import { createSlice } from '@reduxjs/toolkit';
import { authApi } from 'store/apiEndPoints/authApi';

const initialState = {
    user: null,
    isAuthenticated: false,
    isInitialized: false,
    token: null,
};

const normalizeUserData = (userData) => {
    const id = userData.id || userData._id;

    const normalized = {
        id: id.toString(),
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        role: userData.role,
        permissions: userData.permissions,
    };

    return normalized;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
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