'use client';

import React, { useState } from 'react';
import CustomModal from 'components/modal/CustomModal';
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { IoPeopleOutline } from 'react-icons/io5';
import Table from 'components/ui/Table';
import {
  useListAdminsQuery,
  useDeleteAdminMutation,
  useCreateAdminMutation,
  useUpdateAdminMutation
} from 'store/apiEndPoints/adminApi';
import { useListSubscriptionsQuery } from 'store/apiEndPoints/subscriptionApi';
import AdminForm from 'components/form/AdminForm';
import { MdAdd, MdEdit, MdPersonAdd } from 'react-icons/md';
import { useDisclosure } from '@chakra-ui/react';
import DeleteConfirmationModal from 'components/modal/DeleteConfirmationModal';
import { showAlert } from 'store/apiEndPoints/alertSlice';
import { useDispatch } from 'react-redux';
import AdminDetail from 'components/superadmin/AdminDetail';
import { getImageUrl } from 'utils/imageUtils';

const AdminListPage = () => {
  const { data: admin, error, isLoading } = useListAdminsQuery();
  const { data: subscriptions = [] } = useListSubscriptionsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [createAdmin, { isLoading: isCreating, isSuccess: isCreateSuccess }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] = useUpdateAdminMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'Admin',
    status: 'Active',
    countryCode: '+971',
    phoneNumber: '',
    loyaltyAccess: { pointBased: false, productBased: false },
    subscriptionId: '',
    startDate: '',
    endDate: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const columns = [
    {
      accessorKey: "nameEmail",
      header: "Name & Email",
      cell: (info) => {
        const firstName = info.row.original.firstName || '';
        const lastName = info.row.original.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();
        const email = info.row.original.email || '';
        const image = getImageUrl(info.row.original.profileImage) || '';

        const getInitials = (name) => {
          return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
        };

        const initials = getInitials(fullName || email);

        return (
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {image ? (
                <img
                  src={image}
                  alt={fullName || 'Admin'}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-10 h-10 bg-green-200 rounded-full flex items-center justify-center ${image ? 'hidden' : ''}`}
              >
                <span className="text-sm font-medium text-green-800">
                  {initials}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {fullName || 'No Name'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {email}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {info.row.original.phoneNumber}
        </p>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.row.original.status === 'active'
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
          {info.row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "loyaltyAccess",
      header: "Loyalty Access",
      cell: (info) => {
        const { pointBasedLoyalty, productBasedLoyalty } = info.row.original;
        const loyaltyTypes = [];
        if (pointBasedLoyalty) loyaltyTypes.push('Point');
        if (productBasedLoyalty) loyaltyTypes.push('Product');

        return (
          <p className="text-sm text-gray-800 dark:text-white">
            {loyaltyTypes.length > 0 ? loyaltyTypes.join(', ') : 'None'}
          </p>
        );
      },
    },
    {
      accessorKey: "subscription",
      header: "Subscription",
      cell: (info) => {
        const subscription = info.row.original.subscriptions?.[0];
        return (
          <p className="text-sm text-gray-800 dark:text-white">
            {subscription ? subscription.name : 'No subscription'}
          </p>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (info) => (
        <p className="text-sm text-gray-800 dark:text-white">
          {new Date(info.row.original.createdAt).toLocaleDateString()}
        </p>
      ),
    },
  ];

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      role: 'Admin',
      status: 'Active',
      countryCode: '+971',
      phoneNumber: '',
      loyaltyAccess: { pointBased: false, productBased: false },
      subscriptionId: '',
      startDate: '',
      endDate: ''
    });
    setErrors({});
    setPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setSelectedAdmin(null);
    setIsDeleteMode(false);
    setIsViewMode(false);
    resetForm();
    onClose();
  };

  const handleOpenAddModal = () => {
    resetForm();
    setSelectedAdmin(null);
    setIsDeleteMode(false);
    setIsViewMode(false);
    onOpen();
  };

  const handleOpenEditModal = (row) => {
    setSelectedAdmin(row);

    const phoneMatch = row.phoneNumber?.match(/^(\+\d{1,4})(\d{9,11})$/);
    const countryCode = phoneMatch?.[1] || '+971';
    const phoneNumber = phoneMatch?.[2] || row.phoneNumber?.replace(/\D/g, '') || '';

    const formatDateTimeForInput = (dateString) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toISOString().slice(0, 16);
      } catch {
        return '';
      }
    };

    setFormData({
      email: row.email || '',
      password: '',
      confirmPassword: '',
      name: [row.firstName, row.lastName].filter(Boolean).join(' ') || '',
      role: row.role || 'Admin',
      status: row.status || 'Active',
      countryCode,
      phoneNumber,
      loyaltyAccess: {
        pointBased: row.pointBasedLoyalty || false,
        productBased: row.productBasedLoyalty || false
      },
      subscriptionId: row.subscriptionId || '',
      startDate: formatDateTimeForInput(row.startDate) || '',
      endDate: formatDateTimeForInput(row.endDate) || ''
    });

    setErrors({});
    setPasswordVisible(false);
    setConfirmPasswordVisible(false);
    setIsDeleteMode(false);
    setIsViewMode(false);
    onOpen();
  };

  const handleViewAdmin = (row) => {
    setSelectedAdmin(row);
    setIsViewMode(true);
    setIsDeleteMode(false);
    onOpen();
  };

  const handleDeleteAdmin = (row) => {
    setSelectedAdmin(row);
    setIsDeleteMode(true);
    setIsViewMode(false);
    onOpen();
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Email is invalid';

    // Updated phone number validation
    if (!formData.phoneNumber.trim()) {
      errs.phoneNumber = 'Phone number is required';
    } else {
      const numericPhone = formData.phoneNumber.replace(/\D/g, '');
      if (!/^\d{9}$|^\d{10}$|^\d{11}$/.test(numericPhone)) {
        errs.phoneNumber = 'Phone number must be 9, 10, or 11 digits';
      }
    }

    const isEditMode = !!selectedAdmin;
    if (!isEditMode || formData.password || formData.confirmPassword) {
      if (!formData.password) errs.password = 'Password is required';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters';
      if (!formData.confirmPassword) errs.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    }
    if (!formData.subscriptionId) errs.subscriptionId = 'Subscription plan is required';
    if (!formData.loyaltyAccess.pointBased && !formData.loyaltyAccess.productBased) {
      errs.loyaltyAccess = 'Please select at least one loyalty access option';
    }

    // Date validation (optional fields)
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (startDate >= endDate) {
        errs.endDate = 'End date must be after start date';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const [firstName = '', lastName = ''] = formData.name.trim().split(/ (.+)/);
    const isEditMode = !!selectedAdmin;

    try {
      const formatDateTimeToUTC = (dateTimeValue) => {
        if (!dateTimeValue) return null;
        try {
          const localDate = new Date(dateTimeValue);
          const utcDate = new Date(localDate.getTime() - (localDate.getTimezoneOffset() * 60000));
          return utcDate.toISOString();
        } catch {
          return null;
        }
      };

      const payload = {
        firstName,
        lastName,
        email: formData.email,
        password: formData.password || undefined,
        phoneNumber: formData.countryCode + formData.phoneNumber.replace(/\D/g, ''),
        role: formData.role.toLowerCase(),
        status: formData.status.toLowerCase(),
        subscriptionId: formData.subscriptionId,
        pointBasedLoyalty: formData.loyaltyAccess.pointBased,
        productBasedLoyalty: formData.loyaltyAccess.productBased,
        ...(formData.startDate && { startDate: formatDateTimeToUTC(formData.startDate) }),
        ...(formData.endDate && { endDate: formatDateTimeToUTC(formData.endDate) })
      };

      if (isEditMode) {
        await updateAdmin({ id: selectedAdmin.id, data: payload }).unwrap();
        dispatch(showAlert({ message: 'Admin updated successfully!', severity: 'success', duration: 2000 }));
        handleCloseModal();
      } else {
        await createAdmin(payload).unwrap();
        dispatch(showAlert({ message: 'Admin created successfully!', severity: 'success', duration: 2000 }));
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      }

    } catch (err) {
      console.error('Failed to submit form:', err);
      dispatch(showAlert({ message: 'Something went wrong!', severity: 'error', duration: 2000 }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      const numericValue = value.replace(/\D/g, '');
      const limitedValue = numericValue.slice(0, 11);
      setFormData((prev) => ({ ...prev, [name]: limitedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      loyaltyAccess: { ...prev.loyaltyAccess, [name]: checked }
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };

  const isEditMode = !!selectedAdmin;

  return (
    <div className="mt-5 grid grid-cols-1 gap-5">

      <div className="mt-3">
        <HeadingCard title="Admin List" subtitle="Manage admins here" icon={<IoPeopleOutline className="text-3xl text-brandGreen dark:text-white" />}>
          <HeaderButton
            icon={MdAdd}
            text="Add Admin"
            size="md"
            color="bg-brandGreen"
            onClick={handleOpenAddModal}
            variant={undefined}
          />
        </HeadingCard>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Table
          data={admin || []}
          columns={columns}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleDeleteAdmin}
          onView={handleViewAdmin}
        />
      </div>

      <CustomModal
        isOpen={isOpen && !isDeleteMode && !isViewMode}
        onClose={handleCloseModal}
        headerTitle={isEditMode ? "Edit Admin" : "Add Admin"}
        headerDescription={isEditMode ? "Edit Admin details" : "Add New Admin"}
        icon={<IoPeopleOutline className="" />}
        size="xl"
        showFooter={true}
        showFooterCancelButton={true}
        footerConfirmButtonText={isEditMode ? "Edit Admin" : "Add Admin"}
        footerConfirmation={handleFormSubmit}
        footerConfirmButtonIcon={isEditMode ? MdEdit : MdPersonAdd}
        isLoading={isSubmitting}
      >
        <AdminForm
          formData={formData}
          errors={errors}
          subscriptions={subscriptions}
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          isCreating={isCreating}
          isUpdating={isUpdating}
          isCreateSuccess={isCreateSuccess}
          isUpdateSuccess={isUpdateSuccess}
          passwordVisible={passwordVisible}
          confirmPasswordVisible={confirmPasswordVisible}
          onChange={handleFormChange}
          onCheckboxChange={handleCheckboxChange}
          onTogglePasswordVisibility={togglePasswordVisibility}
          onToggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
          onSubmit={handleFormSubmit}
        />
      </CustomModal>

      <CustomModal
        isOpen={isOpen && isViewMode}
        onClose={handleCloseModal}
        size="xl"
        showFooter={false}
      >
        <AdminDetail admin={selectedAdmin} />
      </CustomModal>

      <DeleteConfirmationModal
        isOpen={isOpen && isDeleteMode}
        onClose={handleCloseModal}
        onConfirm={async () => {
          try {
            if (selectedAdmin?.id) {
              await deleteAdmin(selectedAdmin.id).unwrap();
              dispatch(showAlert({ message: 'Admin deleted successfully!', severity: 'success', duration: 2000 }));
              handleCloseModal();
            }
          } catch (err) {
            console.error("Failed to delete admin:", err);
            dispatch(showAlert({ message: 'Failed to delete admin!', severity: 'error', duration: 2000 }));
          }
        }}
        itemName={`${selectedAdmin?.firstName || ''} ${selectedAdmin?.lastName || ''}`}
        title="Delete Admin"
      />
    </div>
  );
};

export default AdminListPage;