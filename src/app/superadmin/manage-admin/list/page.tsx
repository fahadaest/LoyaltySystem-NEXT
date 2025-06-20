'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CustomModal from 'components/modal/CustomModal';
import Card from 'components/card';
import Button from 'components/button/Button';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import {
  IoEyeOutline,
  IoCreateOutline,
  IoTrashOutline,
  IoCopyOutline,
} from 'react-icons/io5';
import { MdAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';

type AdminRowObj = {
  id: number;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  lastLogin: string;
  countryCode: string;
  phoneNumber: string;
  loyaltyAccess: {
    pointBased: boolean;
    productBased: boolean;
  };
};

const AdminListPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [admins, setAdmins] = useState<AdminRowObj[]>([
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

  const [adminToDelete, setAdminToDelete] = useState<AdminRowObj | null>(null);

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

  const handleDeleteClick = (admin: AdminRowObj) => {
    setAdminToDelete(admin);
    onDeleteModalOpen();
  };

  const handleDeleteConfirm = () => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== adminToDelete?.id));
    onDeleteModalClose();
    setAdminToDelete(null);
  };

  const columnHelper = createColumnHelper<AdminRowObj>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState(() => [...admins]);

  useEffect(() => {
    setData([...admins]);
  }, [admins]);

  const columns = [
    columnHelper.accessor('name', {
      id: 'admin',
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Admin
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-navy-600">
              <span className="text-sm font-medium text-blue-700 dark:text-blue-200">
                {info.row.original.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {info.getValue()}
            </div>
            <div className="text-sm text-gray-500">
              {info.row.original.email}
            </div>
          </div>
        </div>
      ),
    }),
    columnHelper.accessor('role', {
      id: 'role',
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Role
        </p>
      ),
      cell: (info) => (
        <span className={getRoleBadge(info.getValue())}>{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Status
        </p>
      ),
      cell: (info) => (
        <span className={getStatusBadge(info.getValue())}>
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Created
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('lastLogin', {
      id: 'lastLogin',
      header: () => (
        <p className="text-sm font-semibold text-gray-700 dark:text-white">
          Last Login
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => (
        <p className="text-right text-sm font-semibold text-gray-700 dark:text-white">
          Actions
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            icon={IoEyeOutline}
            text="View"
            size="sm"
            color="bg-brandBlue"
            onClick={() =>
              router.push(
                `/superadmin/manage-admin/view/${info.row.original.id}`,
              )
            }
          />
          <Button
            icon={IoCreateOutline}
            text="Edit"
            size="sm"
            color="bg-brandGreen"
            onClick={() =>
              router.push(
                `/superadmin/manage-admin/edit/${info.row.original.id}`,
              )
            }
          />
          <Button
            icon={IoTrashOutline}
            text="Delete"
            size="sm"
            color="bg-brandRed"
            onClick={() => handleDeleteClick(info.row.original)}
          />
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Admins
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {admins.length}
              </h3>
            </div>
            <div className="rounded-lg bg-blue-50 p-3 dark:bg-navy-600">
              <svg
                className="h-6 w-6 text-blue-600 dark:text-blue-300"
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
        </Card>

        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Admins
              </p>
              <h3 className="text-2xl font-bold text-green-600">
                {admins.filter((admin) => admin.status === 'Active').length}
              </h3>
            </div>
            <div className="rounded-lg bg-green-50 p-3 dark:bg-navy-600">
              <svg
                className="h-6 w-6 text-green-500 dark:text-green-300"
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
        </Card>

        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Super Admins
              </p>
              <h3 className="text-2xl font-bold text-purple-600">
                {admins.filter((admin) => admin.role === 'Super Admin').length}
              </h3>
            </div>
            <div className="rounded-lg bg-purple-50 p-3 dark:bg-navy-600">
              <svg
                className="h-6 w-6 text-purple-500 dark:text-purple-300"
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
        </Card>

        <Card extra="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Inactive Admins
              </p>
              <h3 className="text-2xl font-bold text-red-600">
                {admins.filter((admin) => admin.status === 'Inactive').length}
              </h3>
            </div>
            <div className="rounded-lg bg-red-50 p-3 dark:bg-navy-600">
              <svg
                className="h-6 w-6 text-red-500 dark:text-red-300"
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
        </Card>
      </div>

      <Card extra="w-full h-full px-6 pb-6 sm:overflow-x-auto">
        <div className="flex items-center justify-between pt-4">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white">
            Admin List
          </h2>
          <Button
            icon={MdAdd}
            text="Add New Admin"
            size="md"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            onClick={() => router.push('/superadmin/manage-admin/create')}
          />
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full table-auto border-collapse overflow-hidden rounded-xl">
            <thead className="bg-gray-100 dark:bg-navy-700">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className={`cursor-pointer px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300 ${
                        header.column.id === 'actions' ? 'text-right' : ''
                      }`}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`transition-all duration-200 ${
                    index % 2 === 0
                      ? 'bg-white dark:bg-navy-700'
                      : 'bg-gray-50 dark:bg-navy-800'
                  } hover:bg-gray-100 dark:hover:bg-navy-600`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-3 text-sm ${
                        cell.column.id === 'actions' ? 'text-right' : ''
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CustomModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        title="Delete Admin"
        size="md"
      >
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-300"
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
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Delete Admin
          </h3>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete{' '}
            <strong>{adminToDelete?.name}</strong>? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <Button
            text="Cancel"
            size="md"
            color="bg-gray-200"
            hoverColor="hover:bg-gray-300"
            onClick={onDeleteModalClose}
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
      </CustomModal>
    </div>
  );
};

export default AdminListPage;
