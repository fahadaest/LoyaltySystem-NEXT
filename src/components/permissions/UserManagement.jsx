import { usePermissions } from '../hooks/usePermissions';
import { PermissionWrapper, RoleGuard } from './PermissionWrapper';
import { ROLES, PERMISSIONS } from '../utils/permissions';
import {
    useGetAdminsQuery,
    useGetManagersQuery,
    useGetCustomersQuery,
    useCreateUserMutation,
    useDeleteUserMutation
} from '../store/api';

export default function UserManagement() {
    const { userRole, hasPermission, isSuperAdmin, isAdmin } = usePermissions();

    const { data: admins } = useGetAdminsQuery(undefined, {
        skip: !hasPermission(PERMISSIONS.VIEW_ADMINS)
    });

    const { data: managers } = useGetManagersQuery(undefined, {
        skip: !hasPermission(PERMISSIONS.VIEW_MANAGERS)
    });

    const { data: customers } = useGetCustomersQuery(undefined, {
        skip: !hasPermission(PERMISSIONS.VIEW_CUSTOMERS)
    });

    const [createUser] = useCreateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">User Management</h1>

            {/* SuperAdmin and Admin can see this section */}
            <RoleGuard
                allowedRoles={[ROLES.SUPERADMIN, ROLES.ADMIN]}
                fallback={<p>You don't have permission to view this section.</p>}
            >
                <div className="grid gap-6">

                    {/* Only SuperAdmin can manage admins */}
                    <PermissionWrapper
                        role={ROLES.SUPERADMIN}
                        fallback={<p>Only SuperAdmin can manage admins</p>}
                    >
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Admins</h2>
                            <div className="grid gap-2">
                                {admins?.map(admin => (
                                    <div key={admin.id} className="flex justify-between items-center p-3 border rounded">
                                        <span>{admin.name} - {admin.email}</span>
                                        <button
                                            onClick={() => deleteUser({ id: admin.id, role: 'admin' })}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </PermissionWrapper>

                    {/* Admin and above can manage managers */}
                    <PermissionWrapper
                        permission={PERMISSIONS.VIEW_MANAGERS}
                    >
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Managers</h2>
                            <div className="grid gap-2">
                                {managers?.map(manager => (
                                    <div key={manager.id} className="flex justify-between items-center p-3 border rounded">
                                        <span>{manager.name} - {manager.email}</span>

                                        <PermissionWrapper permission={PERMISSIONS.DELETE_USERS}>
                                            <button
                                                onClick={() => deleteUser({ id: manager.id, role: 'manager' })}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </PermissionWrapper>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </PermissionWrapper>

                    {/* Manager and above can view customers */}
                    <PermissionWrapper permission={PERMISSIONS.VIEW_CUSTOMERS}>
                        <section>
                            <h2 className="text-xl font-semibold mb-4">Customers</h2>
                            <div className="grid gap-2">
                                {customers?.map(customer => (
                                    <div key={customer.id} className="flex justify-between items-center p-3 border rounded">
                                        <span>{customer.name} - {customer.email}</span>
                                        <span className="text-sm text-gray-500">Points: {customer.loyaltyPoints || 0}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </PermissionWrapper>

                </div>
            </RoleGuard>
        </div>
    );
}