'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Card from 'components/card';
import Button from 'components/button/Button';
import CustomModal from 'components/modal/CustomModal';

import {
  MdOutlineArrowBack,
  MdEdit,
  MdDelete,
  MdInfoOutline,
  MdCheckCircle,
  MdCalendarMonth,
  MdLogin,
  MdClose,
} from 'react-icons/md';

const AdminDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<any>(null);

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    return status === 'Active'
      ? `${baseClasses} bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100`
      : `${baseClasses} bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100`;
  };

  const getRoleBadge = (role: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    return role === 'Super Admin'
      ? `${baseClasses} bg-purple-100 text-purple-800 dark:bg-purple-700 dark:text-purple-100`
      : `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100`;
  };

  const handleDeleteClick = (admin: any) => {
    setAdminToDelete(admin);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    console.log(`Admin ${adminToDelete?.name} deleted! (Simulated)`);
    setShowDeleteModal(false);
    setAdminToDelete(null);
    router.push('/superadmin/manage-admin/list');
  };

  useEffect(() => {
    const fetchAdminDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
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
          (admin) => admin.id === parseInt(Array.isArray(id) ? id[0] : id),
        );

        if (adminFound) {
          setSelectedAdmin(adminFound);
        } else {
          setError('Admin not found.');
        }
      } catch (err) {
        console.error('Failed to fetch admin details:', err);
        setError('Failed to load admin details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-3 flex h-full min-h-[300px] items-center justify-center rounded-3xl bg-white px-4 py-5 shadow-lg shadow-brand-400/30 dark:!bg-navy-800 dark:shadow-none">
        <p className="text-xl font-medium text-gray-700 dark:text-white">
          Loading admin details...
        </p>
      </div>
    );
  }

  if (error || !selectedAdmin) {
    return (
      <div className="mt-3 flex h-full min-h-[300px] items-center justify-center rounded-3xl border border-red-200 bg-red-100 px-4 py-5 shadow-lg shadow-red-400/30 dark:border-red-900 dark:!bg-navy-800 dark:shadow-none">
        <p className="text-red-600 dark:text-red-300">
          {error || 'Admin not found.'}
        </p>
        <Button
          text="Go back to list"
          size="sm"
          color="bg-gray-200"
          // textColor="text-gray-700"
          hoverColor="hover:bg-gray-300"
          onClick={() => router.back()}
          extra="ml-4"
          icon={undefined}
        />
      </div>
    );
  }

  return (
    <div className="mt-3 h-full px-4 py-5">
      <div className="mb-6 flex flex-col justify-between rounded-lg px-4 py-3 md:flex-row md:items-center">
        <div className="flex items-center space-x-4">
          <Button
            icon={MdOutlineArrowBack}
            onClick={() => router.back()}
            text=""
            size="md"
            color="bg-gray-200"
            // textColor="text-gray-700"
            hoverColor="hover:bg-gray-300"
          />
          <div>
            <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
              Admin Details
            </h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View administrator information
            </p>
          </div>
        </div>
      </div>

      <Card extra="p-6">
        <div className="border-b border-gray-200 pb-6 dark:border-white/10">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="h-24 w-24 flex-shrink-0">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-brandLinear text-3xl font-medium text-white dark:bg-brandGreen">
                {selectedAdmin.name
                  .split(' ')
                  .map((n: string) => n[0])
                  .join('')}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                {selectedAdmin.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedAdmin.email}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span className={getRoleBadge(selectedAdmin.role)}>
                  {selectedAdmin.role}
                </span>
                <span className={getStatusBadge(selectedAdmin.status)}>
                  {selectedAdmin.status}
                </span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2 sm:mt-0">
              <Button
                icon={MdEdit}
                text="Edit Admin"
                size="md"
                color="bg-brandGreen"
                hoverColor="hover:bg-brandGreenDark"
                onClick={() =>
                  router.push(
                    `/superadmin/manage-admin/edit/${selectedAdmin.id}`,
                  )
                }
              />
              <Button
                icon={MdDelete}
                text="Delete Admin"
                size="md"
                color="bg-brandRed"
                hoverColor="hover:bg-red-700"
                onClick={() => handleDeleteClick(selectedAdmin)}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                Personal Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Full Name
                  </label>
                  <p className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                    {selectedAdmin.name}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Email Address
                  </label>
                  <p className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                    {selectedAdmin.email}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Phone Number
                  </label>
                  <p className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                    {selectedAdmin.countryCode} {selectedAdmin.phoneNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                System Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Role
                  </label>
                  <p className="mt-1">
                    <span className={getRoleBadge(selectedAdmin.role)}>
                      {selectedAdmin.role}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </label>
                  <p className="mt-1">
                    <span className={getStatusBadge(selectedAdmin.status)}>
                      {selectedAdmin.status}
                    </span>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Account Created
                  </label>
                  <p className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                    {selectedAdmin.createdAt}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Last Login
                  </label>
                  <p className="mt-1 text-sm font-medium text-navy-700 dark:text-white">
                    {selectedAdmin.lastLogin}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8 dark:border-white/10">
            <h3 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
              Loyalty Access Permissions
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                    selectedAdmin.loyaltyAccess.pointBased
                      ? 'border-brandLinear bg-brandLinear dark:border-brandGreen dark:bg-brandGreen'
                      : 'border-gray-300 dark:border-white/10'
                  }`}
                >
                  {selectedAdmin.loyaltyAccess.pointBased && (
                    <MdCheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Point-Based Loyalty
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <div
                  className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                    selectedAdmin.loyaltyAccess.productBased
                      ? 'border-brandLinear bg-brandLinear dark:border-brandGreen dark:bg-brandGreen'
                      : 'border-gray-300 dark:border-white/10'
                  }`}
                >
                  {selectedAdmin.loyaltyAccess.productBased && (
                    <MdCheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Product-Based Loyalty
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card extra="mt-6 p-6">
        <h3 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">
          Recent Activity
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brandLinear/10 text-brandGreen dark:bg-brandGreen/20">
              <MdLogin className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Last login
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedAdmin.lastLogin}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brandLinear/10 text-brandBlue dark:bg-brandBlue/20">
              <MdCalendarMonth className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Account created
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {selectedAdmin.createdAt}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <CustomModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Admin"
        size="md"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <MdInfoOutline className="h-6 w-6 text-red-600 dark:text-red-300" />
          </div>

          <div className="text-center">
            <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
              Delete Admin
            </h3>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{' '}
              <strong className="dark:text-white">{adminToDelete?.name}</strong>
              ? This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-center space-x-3">
            <Button
              text="Cancel"
              size="md"
              color="bg-gray-200"
              // textColor="text-gray-700"
              hoverColor="hover:bg-gray-300"
              onClick={() => setShowDeleteModal(false)}
              extra="flex-1"
              icon={undefined}
            />
            <Button
              text="Delete"
              size="md"
              color="bg-brandRed"
              hoverColor="hover:bg-red-700"
              onClick={handleDeleteConfirm}
              extra="flex-1"
              icon={undefined}
            />
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AdminDetailPage;
