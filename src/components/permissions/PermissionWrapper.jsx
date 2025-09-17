import { useSelector } from 'react-redux';
import { selectCanAccess, selectHasPermission, selectHasRole } from '../store/slices/authSlice';

export const PermissionWrapper = ({
    children,
    role,
    permission,
    fallback = null,
    requireAll = false
}) => {
    const hasRole = useSelector(selectHasRole(role));
    const hasPermission = useSelector(selectHasPermission(permission));

    let canRender = true;

    if (role && permission) {
        canRender = requireAll ? (hasRole && hasPermission) : (hasRole || hasPermission);
    } else if (role) {
        canRender = hasRole;
    } else if (permission) {
        canRender = hasPermission;
    }

    return canRender ? children : fallback;
};