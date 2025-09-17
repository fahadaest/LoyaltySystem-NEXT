import { useSelector } from 'react-redux';
import {
    selectHasRole,
    selectHasPermission,
    selectCanAccess,
    selectUserRole,
    selectPermissions,
    ROLES
} from '../store/slices/authSlice';

export const usePermissions = () => {
    const userRole = useSelector(selectUserRole);
    const permissions = useSelector(selectPermissions);

    return {
        userRole,
        permissions,
        hasRole: (role) => useSelector(selectHasRole(role)),
        hasPermission: (permission) => useSelector(selectHasPermission(permission)),
        canAccess: (role, permission) => useSelector(selectCanAccess(role, permission)),
        isSuperAdmin: userRole === ROLES.SUPERADMIN,
        isAdmin: userRole === ROLES.ADMIN,
        isManager: userRole === ROLES.MANAGER,
        isSalesperson: userRole === ROLES.SALESPERSON,
        isCustomer: userRole === ROLES.CUSTOMER,
    };
};
