export const RoleGuard = ({ children, allowedRoles, fallback = null }) => {
    const userRole = useSelector(selectUserRole);

    if (!userRole || !allowedRoles.includes(userRole)) {
        return fallback;
    }

    return children;
};