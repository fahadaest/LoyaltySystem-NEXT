import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authenticationApis } from './slices/authentication';
import { adminApis } from './slices/adminApis';
import { subscriptionApis } from './slices/subscriptionApis';
import { userProfileApis } from './slices/userProfileApis';
import { productsApis } from './slices/productsApis';
import { productSizesApis } from './slices/productSizesApis';
import { loyaltyApis } from './slices/loyaltyApis';
import { salespersonsApis } from './slices/salespersonsApis';
import { managersApis } from './slices/managersApis';
import { permissionsApis } from './slices/permissionsApis';
import { customerApis } from './slices/customerApis';
import { adminSettingsApis } from './slices/adminSettingsApis';
import { loyaltyManagementApis } from './slices/loyaltyManagementApis';
import { dashboardApis } from './slices/dashboardApis';
import authSlice from './slices/authSlice';
import alertSlice from './slices/alertSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        alert: alertSlice,
        [authenticationApis.reducerPath]: authenticationApis.reducer,
        [adminApis.reducerPath]: adminApis.reducer,
        [subscriptionApis.reducerPath]: subscriptionApis.reducer,
        [userProfileApis.reducerPath]: userProfileApis.reducer,
        [productsApis.reducerPath]: productsApis.reducer,
        [productSizesApis.reducerPath]: productSizesApis.reducer,
        [loyaltyApis.reducerPath]: loyaltyApis.reducer,
        [salespersonsApis.reducerPath]: salespersonsApis.reducer,
        [managersApis.reducerPath]: managersApis.reducer,
        [permissionsApis.reducerPath]: permissionsApis.reducer,
        [customerApis.reducerPath]: customerApis.reducer,
        [adminSettingsApis.reducerPath]: adminSettingsApis.reducer,
        [loyaltyManagementApis.reducerPath]: loyaltyManagementApis.reducer,
        [dashboardApis.reducerPath]: dashboardApis.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authenticationApis.middleware,
            adminApis.middleware,
            subscriptionApis.middleware,
            userProfileApis.middleware,
            productsApis.middleware,
            productSizesApis.middleware,
            loyaltyApis.middleware,
            salespersonsApis.middleware,
            managersApis.middleware,
            permissionsApis.middleware,
            customerApis.middleware,
            adminSettingsApis.middleware,
            loyaltyManagementApis.middleware,
            dashboardApis.middleware,
        ),
});

setupListeners(store.dispatch);