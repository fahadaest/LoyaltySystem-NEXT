"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import NoDataComponent from "@/components/ui/NoDataComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import { useGetAllLoyaltyProgramsQuery, useDeleteLoyaltyProgramMutation } from "@/store/slices/loyaltyApis";

const PointLoyalty = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const {
        data: loyaltyData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetAllLoyaltyProgramsQuery({ loyaltyType: 'point' });

    const [deleteLoyaltyProgram, { isLoading: isDeleting }] = useDeleteLoyaltyProgramMutation();

    const transformedData = useMemo(() => {
        if (!loyaltyData || !Array.isArray(loyaltyData)) return [];

        return loyaltyData.map(item => ({
            id: item.id,
            name: item.rewardTitle,
            spendingAmount: `AED ${item.loyaltyDetail?.spendingAmount || 0}`,
            rewardPoints: item.loyaltyDetail?.rewardPoints?.toString() || "0",
            originalData: item
        }));
    }, [loyaltyData]);

    const totalItems = transformedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = transformedData.slice(startIndex, endIndex);

    const handleDelete = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            try {
                await deleteLoyaltyProgram(itemToDelete.id).unwrap();
                console.log('Loyalty program deleted successfully');
            } catch (error) {
                console.error('Failed to delete loyalty program:', error);
            }
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleView = (item) => {
        console.log("View clicked for:", item.originalData);
    };

    const handleEdit = (program) => {
        console.log("Edit point loyalty:", program.originalData);
        router.push(`/manage-loyalty/points/${program.id}`);
    };

    const handleDuplicate = (item) => {
        console.log("Duplicate clicked for:", item.originalData);
    };

    const handleAddNewLoyalty = () => {
        router.push('/manage-loyalty/points');
    };

    const tableHeaders = [
        {
            label: "Name",
            key: "name",
            className: "flex-[2.5]",
            align: "left"
        },
        {
            label: "Spending Amount",
            key: "spendingAmount",
            className: "flex-[1.5]",
            align: "left"
        },
        {
            label: "Reward Points",
            key: "rewardPoints",
            className: "flex-[1.2]",
            align: "left",
            render: (item) => (
                <div className="flex items-center">
                    <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                        {item.rewardPoints}
                    </span>
                </div>
            )
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[2.5]",
            align: "center",
            render: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button text={"View"} onClick={() => handleView(item)} backgroundColor={'#EDEDED'} textColor={'#000000'} icon={"/img/general/detail_eye.svg"} showIcon={true} iconPosition={'right'} disabled={false} height={'2rem'} fontSize={'0.7rem'} padding={'0px 4px 0px 12px'} iconBackgroundColor={'#000000'} iconWidth={'1.4rem'} iconHeight={'1.4rem'} iconImageWidth={'1rem'} iconImageHeight={'1rem'} gap={'12px'} />
                    <Button text={"Edit"} onClick={() => handleEdit(item)} backgroundColor={'#41CC40'} textColor={'#000000'} disabled={false} height={'2rem'} fontSize={'0.7rem'} padding={'0px 12px'} />
                    <Button text={""} onClick={() => handleDelete(item)} backgroundColor={'#EDEDED'} textColor={'#000000'} iconBackgroundColor={'#EDEDED'} icon={"/img/general/delete_icon.svg"} showIcon={true} iconPosition={'center'} disabled={isDeleting} height={'2rem'} width={'2rem'} fontSize={'0.7rem'} padding={'0px'} iconWidth={'1.2rem'} iconHeight={'1.2rem'} iconImageWidth={'1rem'} iconImageHeight={'1rem'} borderRadius={'50%'} />
                    <Button text={""} onClick={() => handleDuplicate(item)} backgroundColor={'#000000'} textColor={'#FFFFFF'} icon={"/img/general/copy.svg"} showIcon={true} iconPosition={'center'} disabled={false} height={'2rem'} width={'2rem'} fontSize={'0.7rem'} padding={'0px'} iconWidth={'1rem'} iconHeight={'1rem'} iconImageWidth={'0.8rem'} iconImageHeight={'0.8rem'} borderRadius={'50%'} />
                </div>
            )
        }
    ];

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginationInfo = `page ${currentPage} of ${totalPages}`;

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

    if (!transformedData || transformedData.length === 0) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Point Loyalty"
                        subtitle="Manage Point-Based Loyalties Reward"
                        infoMessage="This page allows you to add, edit, and manage all your loyalty programs. Use the Add New Loyalty button to create new reward programs."
                    />
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <NoDataComponent
                        type="pointloyalty"
                        onButtonClick={handleAddNewLoyalty}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Point Loyalty"
                    subtitle="Manage Point-Based Loyalties Reward"
                    infoMessage="This page allows you to add, edit, and manage all your loyalty programs. Use the Add New Loyalty button to create new reward programs."
                />
            </div>

            <div className="w-full h-[calc(100vh-14rem)] flex-1">
                <Table
                    headers={tableHeaders}
                    data={paginatedData}
                    headerFontSize="0.8rem"
                    bodyFontSize="0.675rem"
                    paginationInfo={paginationInfo}
                    footerButtons={footerButtons}
                />
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                            itemName={itemToDelete?.name || "this item"}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default PointLoyalty;