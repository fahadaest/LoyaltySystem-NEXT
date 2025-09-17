export const PERMISSIONS = {
    // Point and loyalty permissions
    POINT_LOYALTY: 'point_loyalty',

    // Product permissions
    PRODUCT_LOYALTY: 'product_loyalty',

    // View permissions
    VIEW_CUSTOMERS: 'view_customers',
    VIEW_MANAGERS: 'view_managers',
    VIEW_SALESPERSONS: 'view_salespersons',
    VIEW_ADMINS: 'view_admins',

    // CRUD permissions
    CREATE_USERS: 'create_users',
    UPDATE_USERS: 'update_users',
    DELETE_USERS: 'delete_users',

    CREATE_PRODUCTS: 'create_products',
    UPDATE_PRODUCTS: 'update_products',
    DELETE_PRODUCTS: 'delete_products',

    MANAGE_SUBSCRIPTIONS: 'manage_subscriptions',
    VIEW_ACTIVITY_LOGS: 'view_activity_logs',
};

export const ROLE_PERMISSIONS = {
    [ROLES.SUPERADMIN]: Object.values(PERMISSIONS),
    [ROLES.ADMIN]: [
        PERMISSIONS.VIEW_CUSTOMERS,
        PERMISSIONS.VIEW_MANAGERS,
        PERMISSIONS.VIEW_SALESPERSONS,
        PERMISSIONS.CREATE_USERS,
        PERMISSIONS.UPDATE_USERS,
        PERMISSIONS.DELETE_USERS,
        PERMISSIONS.CREATE_PRODUCTS,
        PERMISSIONS.UPDATE_PRODUCTS,
        PERMISSIONS.DELETE_PRODUCTS,
        PERMISSIONS.MANAGE_SUBSCRIPTIONS,
        PERMISSIONS.VIEW_ACTIVITY_LOGS,
        PERMISSIONS.POINT_LOYALTY,
        PERMISSIONS.PRODUCT_LOYALTY,
    ],
    [ROLES.MANAGER]: [
        PERMISSIONS.VIEW_CUSTOMERS,
        PERMISSIONS.VIEW_SALESPERSONS,
        PERMISSIONS.UPDATE_USERS,
        PERMISSIONS.VIEW_ACTIVITY_LOGS,
        PERMISSIONS.POINT_LOYALTY,
        PERMISSIONS.PRODUCT_LOYALTY,
    ],
    [ROLES.SALESPERSON]: [
        PERMISSIONS.VIEW_CUSTOMERS,
        PERMISSIONS.POINT_LOYALTY,
    ],
    [ROLES.CUSTOMER]: [],
};