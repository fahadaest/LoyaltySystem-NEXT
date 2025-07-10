import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

interface RoleGuardProps {
    allowedRoles: Array<'admin' | 'superadmin'>;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
    allowedRoles,
    children,
    fallback = <div className="text-red-500 p-4">Access denied</div>,
    redirectTo
}) => {
    const { user, isInitialized, hasAnyRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isInitialized && redirectTo && (!user || !hasAnyRole(allowedRoles))) {
            router.push(redirectTo);
        }
    }, [user, isInitialized, redirectTo, allowedRoles, hasAnyRole, router]);

    if (!isInitialized) {
        return <div className="flex justify-center p-4">Loading...</div>;
    }

    if (!user || !hasAnyRole(allowedRoles)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};

interface ShowForRolesProps {
    roles: Array<'admin' | 'superadmin'>;
    children: React.ReactNode;
}

export const ShowForRoles: React.FC<ShowForRolesProps> = ({ roles, children }) => {
    const { user, hasAnyRole } = useAuth();

    if (!user || !hasAnyRole(roles)) {
        return null;
    }

    return <>{children}</>;
};