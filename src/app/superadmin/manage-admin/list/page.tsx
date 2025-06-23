'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import CustomModal from 'components/modal/CustomModal';
import Card from 'components/card';
import Button from 'components/button/Button';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { IoPeopleOutline } from 'react-icons/io5';
import DataTable from 'components/admin/default/AdminListTable';
import { useListAdminsQuery } from 'store/adminApi';

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

type AdminData = {
  name: string;
  spendingAmount: number;
  rewardPoints: number;
  admin?: string;
};

const mockData: AdminData[] = [
  { name: "John Doe", spendingAmount: 150.5, rewardPoints: 120, admin: "Yes" },
  { name: "Jane Smith", spendingAmount: 220.9, rewardPoints: 90, admin: "No" },
];

const columnHelper = createColumnHelper<AdminData>();

const mockDataColumns = [
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor("spendingAmount", {
    header: () => <span>Spending</span>,
    cell: (info) => (
      <span>
        {info.getValue().toFixed(2)} <span className="text-brandGreen">AED</span>
      </span>
    ),
  }),
  columnHelper.accessor("rewardPoints", {
    header: () => <span>Points</span>,
    cell: (info) => (
      <span className="bg-brandGreen text-white px-2 py-1 rounded-md text-xs">
        {info.getValue()}
      </span>
    ),
  }),
];

const extraColumns = [
  columnHelper.accessor("admin", {
    header: () => <span>Admin</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
];



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
  const { data: admin, error, isLoading } = useListAdminsQuery();
  console.log(admin)
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


  return (
    <div className="mt-5 grid grid-cols-1 gap-5">
      <div className="mt-3">
        <HeadingCard subtitle="Admin List" icon={<IoPeopleOutline className="text-3xl text-brandGreen dark:text-white" />}>
          <HeaderButton
            icon={MdAdd}
            text="Add New Admin"
            size="md"
            color="bg-brandGreen"
            onClick={onOpen}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <DataTable
          data={mockData}
          columns={mockDataColumns}
          extraColumns={extraColumns}
          onAddClick={() => console.log("Add clicked")}
          actions={[
            {
              type: "view",
              label: "View",
              icon: IoEyeOutline,
              color: "bg-brandBlue",
              onClick: (row) => console.log("View", row),
            },
            {
              type: "edit",
              label: "Edit",
              icon: IoCreateOutline,
              color: "bg-brandGreen",
              onClick: (row) => console.log("Edit", row),
            },
            {
              type: "delete",
              label: "Delete",
              icon: IoTrashOutline,
              color: "bg-brandRed",
              onClick: (row) => console.log("Delete", row),
            },
            {
              type: "copy",
              label: "Copy",
              icon: IoCopyOutline,
              color: "bg-brandYellow",
              onClick: (row) => console.log("Copy", row),
            },
          ]}
        />
      </div>

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

