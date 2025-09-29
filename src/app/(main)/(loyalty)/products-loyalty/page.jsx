"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import ProductLoyaltyCard from "@/components/loyalty/ProductLoyaltyCard";
import NoDataComponent from "@/components/ui/NoDataComponent";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import { useGetAllLoyaltyProgramsQuery, useDeleteLoyaltyProgramMutation } from "@/store/slices/loyaltyApis";
import { useGetAllProductSizesQuery } from "@/store/slices/productSizesApis";
import Modal from "@/components/ui/Modal";
import BannerPreview from "@/components/loyalty/BannerPreview";

const ProductLoyalty = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState(null);
    const { data: productSizes = [] } = useGetAllProductSizesQuery();

    const {
        data: loyaltyData,
        isLoading,
        isError,
        error,
        refetch
    } = useGetAllLoyaltyProgramsQuery({ loyaltyType: 'product' });

    const [deleteLoyaltyProgram, { isLoading: isDeleting }] = useDeleteLoyaltyProgramMutation();

    const getSizeName = (sizeId) => {
        if (!sizeId || !productSizes.length) return 'N/A';
        const size = productSizes.find(s => s.id === sizeId);
        return size?.size || 'N/A';
    };

    const transformedData = useMemo(() => {
        if (!loyaltyData || !Array.isArray(loyaltyData)) return [];

        return loyaltyData.map(item => ({
            id: item.id,
            title: item.rewardTitle,
            product: item.product?.name
                ? `${item.product.name} (${getSizeName(item.product.sizeId)})`
                : "Unknown Product",
            purchaseQuantity: item.loyaltyDetail?.purchaseQuantity?.toString() || "0",
            rewardProduct: item.rewardProduct?.name
                ? `${item.rewardProduct.name} (${getSizeName(item.rewardProduct.sizeId)})`
                : "Unknown Reward",
            rewardQuantity: item.loyaltyDetail?.rewardQuantity?.toString() || "0",
            originalData: item
        }));
    }, [loyaltyData, productSizes]);

    const totalItems = transformedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = transformedData.slice(startIndex, endIndex);

    const handleView = (program) => {
        const baseUrl = window.location.origin;
        const registrationUrl = `${baseUrl}/register-customer?product&${program.id}&${program.originalData.adminId}`;

        setSelectedBanner({
            ...program.originalData,
            registrationUrl: registrationUrl,
            showQRCode: true
        });
        setShowBannerModal(true);
    };

    const handleEdit = (program) => {
        console.log("Edit product loyalty:", program.originalData);
        router.push(`/manage-loyalty/product/${program.id}`);
    };

    const closeBannerModal = () => {
        setShowBannerModal(false);
        setSelectedBanner(null);
    };

    const handlePrint = () => {
        const printStyles = `
        @page {
            size: A4;
            margin: 0;
        }
        
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            
            body * {
                visibility: hidden;
            }
            
            .print-area,
            .print-area * {
                visibility: visible;
            }
            
            .print-area {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: auto !important;
                height: auto !important;
                max-width: none !important;
                max-height: none !important;
                overflow: visible !important;
            }
            
            .print-area > div {
                display: inline-block !important;
            }
        }
    `;

        const styleSheet = document.createElement("style");
        styleSheet.innerText = printStyles;
        document.head.appendChild(styleSheet);

        setTimeout(() => {
            window.print();
            setTimeout(() => {
                document.head.removeChild(styleSheet);
            }, 100);
        }, 250);
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
                            rewardProduct={program.rewardProduct}
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

            {showBannerModal && selectedBanner && (
                <Modal
                    isOpen={showBannerModal}
                    onClose={closeBannerModal}
                    title="Banner Preview"
                    maxWidth="350px"
                    showCloseButton={true}
                    footer={
                        <div className="flex justify-center">
                            <Button
                                text="Print"
                                onClick={handlePrint}
                                backgroundColor="#000000"
                                textColor="#FFFFFF"
                                height="34px"
                                fontSize="12px"
                                padding="0 40px"
                                borderRadius="81px"
                                fontWeight="600"
                            />
                        </div>
                    }
                >
                    <div className="flex justify-center print-area max-h-[60vh] overflow-auto">
                        <div className="inline-block">
                            <BannerPreview
                                bannerTitle={selectedBanner.bannerTitle}
                                titleColor={selectedBanner.bannerTitleColor}
                                backgroundColor={selectedBanner.bannerBackgroundColor}
                                backgroundImage={selectedBanner.bannerBackgroundImage}
                                icon1={selectedBanner.bannerIcon1}
                                icon2={selectedBanner.bannerIcon2}
                                icon3={selectedBanner.bannerIcon3}
                                text1={selectedBanner.bannerIconText1}
                                text2={selectedBanner.bannerIconText2}
                                text3={selectedBanner.bannerIconText3}
                                registrationUrl={selectedBanner.registrationUrl}
                                showQRCode={selectedBanner.showQRCode}
                                showContainer={false}
                            />
                        </div>
                    </div>
                </Modal>
            )}

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