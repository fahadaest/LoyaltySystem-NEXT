import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authenticationApis } from './slices/authentication';
import { adminApis } from './slices/adminApis';
import { subscriptionApis } from './slices/subscriptionApis';
import { userProfileApis } from './slices/userProfileApis';
import authSlice from './slices/authSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        [authenticationApis.reducerPath]: authenticationApis.reducer,
        [adminApis.reducerPath]: adminApis.reducer,
        [subscriptionApis.reducerPath]: subscriptionApis.reducer,
        [userProfileApis.reducerPath]: userProfileApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authenticationApis.middleware,
            adminApis.middleware,
            subscriptionApis.middleware,
            userProfileApis.middleware
        ),
});

setupListeners(store.dispatch);