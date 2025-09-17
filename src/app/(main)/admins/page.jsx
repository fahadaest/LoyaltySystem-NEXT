"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import ManageAdminComponent from "@/components/admin/ManageAdminComponent";
import { showSuccess, showError, showWarning } from "@/store/slices/alertSlice";
import {
    useGetAllAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation
} from "@/store/slices/adminApis";

const AdminsPage = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [triggerSubmit, setTriggerSubmit] = useState(false);
    const totalPages = 10;
    const isEditMode = !!editingAdmin;

    const { data: adminsData, isLoading, error, refetch } = useGetAllAdminsQuery();
    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
    const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

    const transformedAdmins = adminsData?.map(admin => ({
        ...admin,
        name: `${admin.firstName || ''} ${admin.lastName || ''}`.trim() || admin.name || 'N/A',
        phone: admin.phoneNumber || admin.phone || 'N/A',
        status: admin.status === 'active' ? 'Active' : 'Inactive',
        loyaltyAccess: [
            admin.pointBasedLoyalty && 'Point',
            admin.productBasedLoyalty && 'Product'
        ].filter(Boolean).join(', ') || 'None',
        subscription: admin.subscription?.name || admin.subscriptionPlan || 'None',
        createdAt: admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A',
        originalData: admin
    })) || [];

    const renderNameCell = (item) => (
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                {item.avatar ? (
                    <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {item.name.charAt(0)}
                    </div>
                )}
            </div>
            <div className="flex flex-col">
                <span className="font-medium text-black">{item.name}</span>
                <span className="text-xs text-gray-500">{item.email}</span>
            </div>
        </div>
    );

    const renderStatusCell = (item) => (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Active" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"
            }`}>
            {item.status}
        </span>
    );

    const renderActionsCell = (item) => (
        <div className="flex items-center justify-center gap-2">
            <Button
                text="Edit"
                onClick={() => openModal(item.originalData)}
                backgroundColor="#000000"
                textColor="#FFFFFF"
                height="1.8rem"
                fontSize="0.65rem"
                padding="0px 12px"
                borderRadius="0.5rem"
            />
            <Button
                text="Details"
                onClick={() => console.log("Details clicked for:", item)}
                backgroundColor="#EDEDED"
                textColor="#000000"
                icon="/img/general/detail_eye.svg"
                showIcon={true}
                iconPosition="right"
                height="1.8rem"
                fontSize="0.65rem"
                padding="0px 4px 0px 8px"
                iconBackgroundColor="#000000"
                iconWidth="1.2rem"
                iconHeight="1.2rem"
                iconImageWidth="0.8rem"
                iconImageHeight="0.8rem"
                gap="6px"
                borderRadius="0.5rem"
            />
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300">
                <img src="/img/general/menu_dots.svg" alt="More options" className="w-4 h-4" />
            </div>
        </div>
    );

    const tableHeaders = [
        { label: "Name", key: "name", className: "flex-[2]", align: "left", render: renderNameCell },
        { label: "Phone Number", key: "phone", className: "flex-[1.5]", align: "left" },
        { label: "Status", key: "status", className: "flex-[1]", align: "left", render: renderStatusCell },
        { label: "Loyalty Access", key: "loyaltyAccess", className: "flex-[1.5]", align: "left" },
        { label: "Subscription", key: "subscription", className: "flex-[1]", align: "left" },
        { label: "Created At", key: "createdAt", className: "flex-[1]", align: "left" },
        { label: "Actions", key: "actions", className: "flex-[1.5]", align: "center", render: renderActionsCell }
    ];

    const openModal = (admin = null) => {
        setEditingAdmin(admin);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingAdmin(null);
    };

    const handleSubmitAdmin = async (apiPayload) => {
        try {
            console.log('Submitting admin with payload:', apiPayload);

            if (isEditMode && editingAdmin) {
                const result = await updateAdmin({
                    id: editingAdmin.id,
                    ...apiPayload
                }).unwrap();
                console.log('Admin updated successfully:', result);
                dispatch(showSuccess('Admin Updated Successfully!'));
            } else {
                const result = await createAdmin(apiPayload).unwrap();
                console.log('Admin created successfully:', result);
                dispatch(showSuccess('Admin Added Successfully!'));
            }

            refetch();
            closeModal();

        } catch (error) {

            if (error?.data?.message) {
                dispatch(showError(`Error: ${error.data.message}`));
            } else if (error?.message) {
                dispatch(showError(`Network Error: ${error.message}`));
            } else {
                dispatch(showError('An unexpected error occurred. Please try again.'));
            }
        }
    };

    const handleFormSubmit = () => {
        setTriggerSubmit(true);
        setTimeout(() => setTriggerSubmit(false), 100); // Reset trigger
    };

    const handlePagination = (direction) => {
        const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const isProcessing = isCreating || isUpdating;

    const footerButtons = [
        {
            text: "Previous",
            onClick: () => handlePagination('prev'),
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            iconBackgroundColor: '#000000',
            icon: "/img/general/arrow_left_white.svg",
            showIcon: true,
            iconPosition: 'left',
            disabled: currentPage === 1,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 12px 0px 4px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.5rem',
            iconImageHeight: '0.5rem',
            gap: '8px'
        },
        {
            text: "Next",
            onClick: () => handlePagination('next'),
            backgroundColor: '#000000',
            textColor: '#FFFFFF',
            icon: "/img/general/arrow_right_black.svg",
            showIcon: true,
            iconPosition: 'right',
            disabled: currentPage === totalPages,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 4px 0px 12px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.6rem',
            iconImageHeight: '0.6rem',
            gap: '8px'
        }
    ];

    const modalFooter = (
        <div className="flex justify-end gap-2">
            <Button
                text="Cancel"
                onClick={closeModal}
                backgroundColor="#F9FAFB"
                textColor="#6B7280"
                disabled={isProcessing}
                height="1.8rem"
                fontSize="0.6rem"
                padding="0px 16px"
                borderRadius="9999px"
                border="1px solid #E5E7EB"
            />
            <Button
                text={isProcessing ? 'Processing...' : (isEditMode ? 'Update Admin' : 'Add New Admin')}
                onClick={handleFormSubmit}
                backgroundColor="#000000"
                textColor="#FFFFFF"
                icon="/img/general/plus_black.svg"
                showIcon={true}
                iconPosition="right"
                disabled={isProcessing}
                height="1.8rem"
                fontSize="0.6rem"
                padding="0px 7px 0px 10px"
                iconBackgroundColor="#FFFFFF"
                iconWidth="1rem"
                iconHeight="1rem"
                iconImageWidth="0.5rem"
                iconImageHeight="0.5rem"
                gap="8px"
                borderRadius="9999px"
            />
        </div>
    );

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading admins...</div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-red-500 mb-2">Error loading admins</div>
                    <Button
                        text="Retry"
                        onClick={() => {
                            refetch();
                            dispatch(showWarning('Retrying to load admins...'));
                        }}
                        backgroundColor="#000000"
                        textColor="#FFFFFF"
                        height="2rem"
                        fontSize="0.875rem"
                        padding="0px 16px"
                        borderRadius="0.5rem"
                    />
                </div>
            );
        }

        if (transformedAdmins.length === 0) {
            return <NoDataComponent type="admins" onButtonClick={() => openModal()} />;
        }

        return (
            <Table
                headers={tableHeaders}
                data={transformedAdmins}
                headerFontSize="0.8rem"
                bodyFontSize="0.675rem"
                paginationInfo={`page ${currentPage} of ${totalPages}`}
                footerButtons={footerButtons}
            />
        );
    };

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Admin List"
                    subtitle="Manage admins here"
                    infoMessage="This page allows you to add, edit, and manage all your admins. Use the Add Admin button to create new admin accounts."
                />
                <Button
                    text="Add Admin"
                    onClick={() => openModal()}
                    backgroundColor="#000000"
                    textColor="#FFFFFF"
                    icon="/img/general/plus_black.svg"
                    showIcon={true}
                    iconPosition="right"
                    height="2rem"
                    fontSize="0.7rem"
                    padding="0px 4px 0px 12px"
                    iconWidth="1.4rem"
                    iconHeight="1.4rem"
                    iconImageWidth="1rem"
                    iconImageHeight="1rem"
                    gap="12px"
                    borderRadius="2rem"
                />
            </div>

            <div className="flex-1 min-h-0">
                {renderContent()}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={isEditMode ? "Edit Admin" : "Add Admin"}
                subtitle={isEditMode ? "Update the admin information below" : "Please provide the information required to add new admin"}
                maxWidth="40vw"
                footer={modalFooter}
            >
                <ManageAdminComponent
                    onClose={closeModal}
                    onSubmit={handleSubmitAdmin}
                    editingAdmin={editingAdmin}
                    isEditMode={isEditMode}
                    triggerSubmit={triggerSubmit}
                />
            </Modal>
        </main>
    );
};

export default AdminsPage;