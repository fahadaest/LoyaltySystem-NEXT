import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
import { adminApi } from './adminApi';
import { subscriptionApi } from './subscriptionApi';
import { productsApi } from './productsApi';
import { productSizesApi } from './productSizesApi';
import { productLoyaltyApi } from './productLoyalty';
import alertReducer from './alertSlice';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [subscriptionApi.reducerPath]: subscriptionApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [productSizesApi.reducerPath]: productSizesApi.reducer,
        [productLoyaltyApi.reducerPath]: productLoyaltyApi.reducer,
        alert: alertReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(adminApi.middleware)
            .concat(subscriptionApi.middleware)
            .concat(productsApi.middleware)
            .concat(productSizesApi.middleware)
            .concat(productLoyaltyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;