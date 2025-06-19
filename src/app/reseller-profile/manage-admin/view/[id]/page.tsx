'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const AdminDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Get the 'id' from the URL
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState(null);

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
    // In a real app, you would send a DELETE request to your API
    alert(`Admin ${adminToDelete?.name} deleted! (Simulated)`);
    setShowDeleteModal(false);
    setAdminToDelete(null);
    router.push('/reseller-profile/manage-admin/list');
  };

  useEffect(() => {
    if (id) {
      const mockAdmins = [
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
      ];
      const adminFound = mockAdmins.find(
        (admin) => admin.id === parseInt(id[0]),
      );
      setSelectedAdmin(adminFound);
    }
  }, [id]);

  if (!selectedAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p className="text-gray-600">Loading admin details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/reseller-profile/manage-admin/list')}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Details</h1>
            <p className="mt-2 text-gray-600">View administrator information</p>
          </div>
        </div>

        {/* Admin Details Card */}
        <div className="rounded-xl border bg-white shadow-sm">
          {/* Profile Header */}
          <div className="border-b border-gray-200 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 flex-shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                  <span className="text-2xl font-medium text-blue-700">
                    {selectedAdmin.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedAdmin.name}
                </h2>
                <p className="text-gray-600">{selectedAdmin.email}</p>
                <div className="mt-2 flex items-center space-x-3">
                  <span className={getRoleBadge(selectedAdmin.role)}>
                    {selectedAdmin.role}
                  </span>
                  <span className={getStatusBadge(selectedAdmin.status)}>
                    {selectedAdmin.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    router.push(
                      `/reseller-profile/manage-admin/edit/${selectedAdmin.id}`,
                    )
                  }
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  Edit Admin
                </button>
                <button
                  onClick={() => handleDeleteClick(selectedAdmin)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                >
                  Delete Admin
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="p-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email Address
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone Number
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.countryCode} {selectedAdmin.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  System Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Role
                    </label>
                    <p className="mt-1">
                      <span className={getRoleBadge(selectedAdmin.role)}>
                        {selectedAdmin.role}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Status
                    </label>
                    <p className="mt-1">
                      <span className={getStatusBadge(selectedAdmin.status)}>
                        {selectedAdmin.status}
                      </span>
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Account Created
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.createdAt}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Last Login
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.lastLogin}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Loyalty Access Section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Loyalty Access Permissions
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                      selectedAdmin.loyaltyAccess.pointBased
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAdmin.loyaltyAccess.pointBased && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    Point-Based Loyalty
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                      selectedAdmin.loyaltyAccess.productBased
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAdmin.loyaltyAccess.productBased && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">
                    Product-Based Loyalty
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline (Optional Enhancement) */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-4 w-4 text-green-600"
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
              <div className="flex-1">
                <p className="text-sm text-gray-900">Last login</p>
                <p className="text-xs text-gray-500">
                  {selectedAdmin.lastLogin}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Account created</p>
                <p className="text-xs text-gray-500">
                  {selectedAdmin.createdAt}
                </p>
              </div>
            </div>
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
  );
};

export default AdminDetailPage;
