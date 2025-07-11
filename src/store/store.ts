import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './apiEndPoints/authApi';
import { adminApi } from './apiEndPoints/adminApi';
import { subscriptionApi } from './apiEndPoints/subscriptionApi';
import { productsApi } from './apiEndPoints/productsApi';
import { productSizesApi } from './apiEndPoints/productSizesApi';
import { productLoyaltyApi } from './apiEndPoints/productLoyalty';
import { pointLoyaltyApi } from './apiEndPoints/pointLoyalty';
import { userProfileApi } from './apiEndPoints/userApi';
import { settingsApi } from './apiEndPoints/settingsApi';
import { customersApi } from './apiEndPoints/customerApi';
import { appleWalletApi } from './apiEndPoints/appleWalletApi';
import { customWalletCardsApi } from './apiEndPoints/customWalletCard';
import { salespersonsApi } from './apiEndPoints/salesPersonApi';
import alertReducer from './apiEndPoints/alertSlice';
import authReducer from './slices/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [productSizesApi.reducerPath]: productSizesApi.reducer,
        [productLoyaltyApi.reducerPath]: productLoyaltyApi.reducer,
        [pointLoyaltyApi.reducerPath]: pointLoyaltyApi.reducer,
        [userProfileApi.reducerPath]: userProfileApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [customersApi.reducerPath]: customersApi.reducer,
        [appleWalletApi.reducerPath]: appleWalletApi.reducer,
        [customWalletCardsApi.reducerPath]: customWalletCardsApi.reducer,
        [salespersonsApi.reducerPath]: salespersonsApi.reducer,
        alert: alertReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        })
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(productsApi.middleware)
            .concat(productSizesApi.middleware)
            .concat(productLoyaltyApi.middleware)
            .concat(pointLoyaltyApi.middleware)
            .concat(userProfileApi.middleware)
            .concat(settingsApi.middleware)
            .concat(customersApi.middleware)
            .concat(appleWalletApi.middleware)
            .concat(customWalletCardsApi.middleware)
            .concat(salespersonsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;