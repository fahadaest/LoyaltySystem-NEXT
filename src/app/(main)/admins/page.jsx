"use client";
import React, { useState } from "react";
import { Plus } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import Modal from "@/components/ui/Modal";
import NoDataComponent from "@/components/ui/NoDataComponent";
import ManageAdminComponent from "@/components/admin/ManageAdminComponent";
import {
    useGetAllAdminsQuery,
    useCreateAdminMutation,
    useUpdateAdminMutation
} from "@/store/slices/adminApis";

const AdminsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10);
    const [isManageAdminModalOpen, setIsManageAdminModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // API calls
    const { data: adminsData, isLoading, error, refetch } = useGetAllAdminsQuery();
    const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
    const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();

    // Transform API data for table display
    const transformedAdmins = adminsData?.map(admin => ({
        id: admin.id,
        name: `${admin.firstName || ''} ${admin.lastName || ''}`.trim() || admin.name || 'N/A',
        email: admin.email || 'N/A',
        phone: admin.phoneNumber || admin.phone || 'N/A',
        status: admin.status === 'active' ? 'Active' : 'Inactive',
        loyaltyAccess: [
            admin.pointBasedLoyalty && 'Point',
            admin.productBasedLoyalty && 'Product'
        ].filter(Boolean).join(', ') || 'None',
        subscription: admin.subscription?.name || admin.subscriptionPlan || 'None',
        createdAt: admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A',
        avatar: admin.avatar || null,
        // Keep original data for editing
        originalData: admin
    })) || [];

    const tableHeaders = [
        {
            label: "Name",
            key: "name",
            className: "flex-[2]",
            align: "left",
            render: (item) => (
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
            )
        },
        {
            label: "Phone Number",
            key: "phone",
            className: "flex-[1.5]",
            align: "left"
        },
        {
            label: "Status",
            key: "status",
            className: "flex-[1]",
            align: "left",
            render: (item) => (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Active"
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-700"
                    }`}>
                    {item.status}
                </span>
            )
        },
        {
            label: "Loyalty Access",
            key: "loyaltyAccess",
            className: "flex-[1.5]",
            align: "left"
        },
        {
            label: "Subscription",
            key: "subscription",
            className: "flex-[1]",
            align: "left"
        },
        {
            label: "Created At",
            key: "createdAt",
            className: "flex-[1]",
            align: "left"
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1.5]",
            align: "center",
            render: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        text={"Edit"}
                        onClick={() => handleEdit(item)}
                        backgroundColor={'#000000'}
                        textColor={'#FFFFFF'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px 12px'}
                        borderRadius={'0.5rem'}
                    />
                    <Button
                        text={"Details"}
                        onClick={() => handleDetails(item)}
                        backgroundColor={'#EDEDED'}
                        textColor={'#000000'}
                        icon={"/img/general/detail_eye.svg"}
                        showIcon={true}
                        iconPosition={'right'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px 4px 0px 8px'}
                        iconBackgroundColor={'#000000'}
                        iconWidth={'1.2rem'}
                        iconHeight={'1.2rem'}
                        iconImageWidth={'0.8rem'}
                        iconImageHeight={'0.8rem'}
                        gap={'6px'}
                        borderRadius={'0.5rem'}
                    />
                    <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300">
                        <img src="/img/general/menu_dots.svg" alt="More options" className="w-4 h-4" />
                    </div>
                </div>
            )
        }
    ];

    const handleEdit = (admin) => {
        console.log("Edit clicked for:", admin);
        setEditingAdmin(admin.originalData || admin);
        setIsEditMode(true);
        setIsManageAdminModalOpen(true);
    };

    const handleDetails = (admin) => {
        console.log("Details clicked for:", admin);
        // Handle details action here
    };

    const handleAddAdmin = () => {
        console.log("Add Admin button clicked!");
        setEditingAdmin(null);
        setIsEditMode(false);
        setIsManageAdminModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsManageAdminModalOpen(false);
        setEditingAdmin(null);
        setIsEditMode(false);
    };

    const handleSubmitAdmin = async (adminData) => {
        try {
            console.log(`${isEditMode ? 'Editing' : 'Adding'} admin:`, adminData);

            // Transform form data to API format
            const apiData = {
                firstName: adminData.fullName?.split(' ')[0] || '',
                lastName: adminData.fullName?.split(' ').slice(1).join(' ') || '',
                email: adminData.email,
                phoneNumber: adminData.phoneNumber,
                password: adminData.password,
                pointBasedLoyalty: adminData.pointBasedLoyalty,
                productBasedLoyalty: adminData.productBasedLoyalty,
                subscriptionId: adminData.subscriptionPlan ? 1 : null, // You may need to map subscription name to ID
                status: 'active'
            };

            if (isEditMode && editingAdmin) {
                console.log("Updating admin with ID:", editingAdmin.id);
                await updateAdmin({
                    id: editingAdmin.id,
                    ...apiData
                }).unwrap();
            } else {
                console.log("Creating new admin");
                await createAdmin(apiData).unwrap();
            }

            // Refetch data to update table
            refetch();

            // Close modal
            setIsManageAdminModalOpen(false);
            setEditingAdmin(null);
            setIsEditMode(false);

        } catch (error) {
            console.error('Error submitting admin:', error);
            // Handle error - you can show toast notification here
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log("Previous page:", currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log("Next page:", currentPage + 1);
        }
    };

    // Footer pagination info
    const paginationInfo = `page ${currentPage} of ${totalPages}`;

    // Footer buttons
    const footerButtons = [
        {
            text: "Previous",
            onClick: handlePrevious,
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
            onClick: handleNext,
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

    // Modal footer content
    const modalFooter = (
        <div className="flex justify-end gap-3">
            <button
                onClick={handleCloseModal}
                disabled={isCreating || isUpdating}
                className="h-10 px-8 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Cancel
            </button>
            <button
                onClick={() => handleSubmitAdmin({})}
                disabled={isCreating || isUpdating}
                className="h-10 px-4 pr-8 pl-6 bg-black rounded-full flex items-center gap-3 text-xs font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isCreating || isUpdating ? 'Processing...' : (isEditMode ? 'Update Admin' : 'Add New Admin')}
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-2.5 h-2.5 text-black" />
                </div>
            </button>
        </div>
    );

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <div className=" flex items-start justify-between flex-shrink-0 ">
                <ComponentHeader
                    title="Admin List"
                    subtitle="Manage admins here"
                    infoMessage="This page allows you to add, edit, and manage all your admins. Use the Add Admin button to create new admin accounts."
                />

                <Button
                    text={"Add Admin"}
                    onClick={handleAddAdmin}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus_black.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 4px 0px 12px'}
                    iconWidth={'1.4rem'}
                    iconHeight={'1.4rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                    borderRadius={'2rem'}
                />
            </div>

            <div className=" flex-1 min-h-0">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-gray-500">Loading admins...</div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="text-red-500 mb-2">Error loading admins</div>
                        <button
                            onClick={refetch}
                            className="px-4 py-2 bg-black text-white rounded-lg text-sm"
                        >
                            Retry
                        </button>
                    </div>
                ) : transformedAdmins.length === 0 ? (
                    <NoDataComponent
                        type="admins"
                        onButtonClick={handleAddAdmin}
                    />
                ) : (
                    <Table
                        headers={tableHeaders}
                        data={transformedAdmins}
                        headerFontSize="0.8rem"
                        bodyFontSize="0.675rem"
                        paginationInfo={paginationInfo}
                        footerButtons={footerButtons}
                    />
                )}
            </div>

            {/* Manage Admin Modal */}
            <Modal
                isOpen={isManageAdminModalOpen}
                onClose={handleCloseModal}
                title={isEditMode ? "Edit Admin" : "Add Admin"}
                subtitle={isEditMode ? "Update the admin information below" : "Please provide the information required to add new admin"}
                maxWidth="40vw"
                footer={modalFooter}
            >
                <ManageAdminComponent
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitAdmin}
                    editingAdmin={editingAdmin}
                    isEditMode={isEditMode}
                />
            </Modal>
        </main>
    );
};

export default AdminsPage;