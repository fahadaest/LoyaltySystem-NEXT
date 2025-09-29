"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import ProductLoyaltyCard from "@/components/loyalty/ProductLoyaltyCard";
import NoDataComponent from "@/components/ui/NoDataComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import { useGetAllLoyaltyProgramsQuery, useDeleteLoyaltyProgramMutation } from "@/store/slices/loyaltyApis";

const ProductLoyalty = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // 4 columns * 3 rows for better grid display
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const {
        data: loyaltyData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetAllLoyaltyProgramsQuery({ loyaltyType: 'product' });

    const [deleteLoyaltyProgram, { isLoading: isDeleting }] = useDeleteLoyaltyProgramMutation();

    const transformedData = useMemo(() => {
        if (!loyaltyData || !Array.isArray(loyaltyData)) return [];

        return loyaltyData.map(item => ({
            id: item.id,
            title: item.rewardTitle,
            product: item.loyaltyDetail?.productId || "Unknown Product",
            purchaseQuantity: item.loyaltyDetail?.purchaseQuantity?.toString() || "0",
            rewardProductId: item.loyaltyDetail?.rewardProductId || "Unknown Reward",
            rewardQuantity: item.loyaltyDetail?.rewardQuantity?.toString() || "0",
            originalData: item
        }));
    }, [loyaltyData]);

    const totalItems = transformedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = transformedData.slice(startIndex, endIndex);

    const handleView = (program) => {
        console.log("View product loyalty:", program.originalData);
    };

    const handleEdit = (program) => {
        console.log("Edit product loyalty:", program.originalData);
        // router.push(`/manage-loyalty/products/edit/${program.id}`);
    };

    const handleCopy = (program) => {
        console.log("Copy product loyalty:", program.originalData);
        // Implement duplication logic
    };

    const handleDelete = (program) => {
        setItemToDelete(program);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete) {
            try {
                await deleteLoyaltyProgram(itemToDelete.id).unwrap();
                console.log('Product loyalty program deleted successfully');
            } catch (error) {
                console.error('Failed to delete product loyalty program:', error);
            }
        }
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    const handleAddNewLoyalty = () => {
        router.push('/manage-loyalty/products');
    };

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

    if (isLoading) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Product Loyalty"
                        subtitle="Manage Product-Based Loyalties Reward"
                        infoMessage="This page allows you to add, edit, and manage all your product-based loyalty programs. Use the Add New Loyalty button to create new reward programs."
                    />
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">Loading...</div>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Product Loyalty"
                        subtitle="Manage Product-Based Loyalties Reward"
                        infoMessage="This page allows you to add, edit, and manage all your product-based loyalty programs. Use the Add New Loyalty button to create new reward programs."
                    />
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-red-500">
                        Error loading loyalty programs: {error?.message || 'Unknown error'}
                        <Button
                            text="Retry"
                            onClick={() => refetch()}
                            backgroundColor="#000000"
                            textColor="#FFFFFF"
                        />
                    </div>
                </div>
            </main>
        );
    }

    if (!transformedData || transformedData.length === 0) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Product Loyalty"
                        subtitle="Manage Product-Based Loyalties Reward"
                        infoMessage="This page allows you to add, edit, and manage all your product-based loyalty programs. Use the Add New Loyalty button to create new reward programs."
                    />
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <NoDataComponent
                        type="productloyalty"
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
                    title="Product Loyalty"
                    subtitle="Manage Product-Based Loyalties Reward"
                    infoMessage="This page allows you to add, edit, and manage all your product-based loyalty programs. Use the Add New Loyalty button to create new reward programs."
                />

                <Button
                    text={"Add Product Loyalty"}
                    onClick={handleAddNewLoyalty}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus.svg"}
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
                />
            </div>

            {/* Cards Grid */}
            <div className="flex-1 min-h-0 overflow-auto">
                <div className="grid grid-cols-4 gap-2">
                    {paginatedData.map((program, index) => (
                        <ProductLoyaltyCard
                            key={`${program.id}-${index}`}
                            title={program.title}
                            product={program.product}
                            purchaseQuantity={program.purchaseQuantity}
                            rewardProductId={program.rewardProductId}
                            rewardQuantity={program.rewardQuantity}
                            onView={() => handleView(program)}
                            onEdit={() => handleEdit(program)}
                            onCopy={() => handleCopy(program)}
                            onDelete={() => handleDelete(program)}
                            isDeleting={isDeleting && itemToDelete?.id === program.id}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-4 pb-4">
                        <Button
                            text="Previous"
                            onClick={handlePrevious}
                            backgroundColor={currentPage === 1 ? '#EDEDED' : '#FFFFFF'}
                            textColor='#000000'
                            iconBackgroundColor='#000000'
                            icon="/img/general/arrow_left_white.svg"
                            showIcon={true}
                            iconPosition='left'
                            disabled={currentPage === 1}
                            height='1.5rem'
                            fontSize='0.5rem'
                            padding='0px 12px 0px 4px'
                            iconWidth='1rem'
                            iconHeight='1rem'
                            iconImageWidth='0.5rem'
                            iconImageHeight='0.5rem'
                            gap='8px'
                        />

                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>

                        <Button
                            text="Next"
                            onClick={handleNext}
                            backgroundColor={currentPage === totalPages ? '#EDEDED' : '#000000'}
                            textColor={currentPage === totalPages ? '#000000' : '#FFFFFF'}
                            icon="/img/general/arrow_right_black.svg"
                            showIcon={true}
                            iconPosition='right'
                            disabled={currentPage === totalPages}
                            height='1.5rem'
                            fontSize='0.5rem'
                            padding='0px 4px 0px 12px'
                            iconWidth='1rem'
                            iconHeight='1rem'
                            iconImageWidth='0.6rem'
                            iconImageHeight='0.6rem'
                            gap='8px'
                        />
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                            itemName={itemToDelete?.title || "this loyalty program"}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ProductLoyalty;