'use client';
import React, { useState, useRef } from 'react';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { useDisclosure } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import { useCreateBeaconMutation, useGetAllBeaconsQuery, useGetBeaconByIdQuery, useUpdateBeaconMutation, useDeleteBeaconMutation } from 'store/apiEndPoints/settingsApi';
import { useGetAllCustomersQuery } from 'store/apiEndPoints/customerApi';
import Table from 'components/settings/walletAddress/Table';
import CustomModal from 'components/modal/CustomModal';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { useDispatch } from 'react-redux';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import AddBeacons from 'components/settings/walletBeacons/AddBeaconsForm';
import { FaUser } from "react-icons/fa";
import CustomerDetail from 'components/customer/CustomerDetail';

const Dashboard = () => {
  const { data: customersData, error: customerError, isLoading: customerLoading } = useGetAllCustomersQuery('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editRowData, setEditRowData] = useState(null);

  const dispatch = useDispatch();

  const columns = [
    {
      accessorKey: "firstName",
      header: "Name",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.firstName + " " + info.row.original.lastName}</p>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.email}</p>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.phoneNumber}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info: any) => <p className="text-sm text-gray-800 dark:text-white">{info.row.original.createdAt}</p>,
    },
  ];


  const handleDetailClick = (editRowData) => {
    console.log(editRowData)
    setEditRowData(editRowData)
    onOpen();
  };

  return (
    <div>
      <div className="mt-3 mb-5">
        <HeadingCard icon={<FaUser className="text-brandGreen text-3xl" />} subtitle="Customers List">
        </HeadingCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <Table
          data={customersData || []}
          columns={columns}
          onDetail={handleDetailClick}
        />
      </div>

      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        title={'Customer Detail'}
        size="4xl"
        handlePrint={undefined}
      >
        <CustomerDetail
          customer={editRowData}
        />
      </CustomModal>
    </div>
  );
};

export default Dashboard;
