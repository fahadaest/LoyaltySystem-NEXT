'use client';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const AdminListPage = () => {
  const router = useRouter();

  // Admin data state - This should ideally come from an API or global state in a real app
  const [admins, setAdmins] = useState([
    {
      id: 1,
      email: 'john.doe@example.com',
      name: 'John Doe',
      role: 'Super Admin',
      status: 'Active',
      createdAt: '2024-01-15',
      lastLogin: '2024-06-17',
      countryCode: '+1',
      phoneNumber: '1234567890',
      loyaltyAccess: {
        pointBased: true,
        productBased: true,
      },
    },
    {
      id: 2,
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      role: 'Admin',
      status: 'Active',
      createdAt: '2024-02-20',
      lastLogin: '2024-06-16',
      countryCode: '+44',
      phoneNumber: '9876543210',
      loyaltyAccess: {
        pointBased: true,
        productBased: false,
      },
    },
    {
      id: 3,
      email: 'mike.johnson@example.com',
      name: 'Mike Johnson',
      role: 'Admin',
      status: 'Inactive',
      createdAt: '2024-03-10',
      lastLogin: '2024-06-10',
      countryCode: '+1',
      phoneNumber: '5555555555',
      loyaltyAccess: {
        pointBased: false,
        productBased: true,
      },
    },
    {
      id: 4,
      email: 'sarah.wilson@example.com',
      name: 'Sarah Wilson',
      role: 'Admin',
      status: 'Active',
      createdAt: '2024-04-05',
      lastLogin: '2024-06-15',
      countryCode: '+91',
      phoneNumber: '7777777777',
      loyaltyAccess: {
        pointBased: true,
        productBased: true,
      },
    },
  ]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

  // Helper functions (moved from original AdminManagement)
  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    return status === 'Active'
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  const getRoleBadge = (role) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    return role === 'Super Admin'
      ? `${baseClasses} bg-purple-100 text-purple-800`
      : `${baseClasses} bg-blue-100 text-blue-800`;
  };

  const handleDeleteClick = (admin) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== adminToDelete.id));
    setShowDeleteModal(false);
    setAdminToDelete(null);
  };

  // Simulate fetching data on component mount
  useEffect(() => {
    // In a real application, you would fetch data here
    // For now, we're using the initial `admins` state
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Management
              </h1>
              <p className="mt-2 text-gray-600">Manage system administrators</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push('/superadmin/manage-admin/create')}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              >
                Add New Admin
              </button>
              <button className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700">
                Export List
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Admins</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {admins.length}
                  </h3>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <svg
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 0 014.5 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Admins</p>
                  <h3 className="text-2xl font-bold text-green-600">
                    {admins.filter((admin) => admin.status === 'Active').length}
                  </h3>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <svg
                    className="h-6 w-6 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Super Admins</p>
                  <h3 className="text-2xl font-bold text-purple-600">
                    {
                      admins.filter((admin) => admin.role === 'Super Admin')
                        .length
                    }
                  </h3>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <svg
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Inactive Admins</p>
                  <h3 className="text-2xl font-bold text-red-600">
                    {
                      admins.filter((admin) => admin.status === 'Inactive')
                        .length
                    }
                  </h3>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Admin List
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Admin
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {admins.map((admin) => (
                    <tr key={admin.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                              <span className="text-sm font-medium text-blue-700">
                                {admin.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {admin.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {admin.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={getRoleBadge(admin.role)}>
                          {admin.role}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={getStatusBadge(admin.status)}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {admin.createdAt}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {admin.lastLogin}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/superadmin/manage-admin/view/${admin.id}`,
                              )
                            }
                            className="text-gray-600 hover:text-gray-900"
                          >
                            View
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/superadmin/manage-admin/edit/${admin.id}`,
                              )
                            }
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(admin)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>

              <div className="text-center">
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Delete Admin
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                  Are you sure you want to delete{' '}
                  <strong>{adminToDelete?.name}</strong>? This action cannot be
                  undone.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminListPage;
