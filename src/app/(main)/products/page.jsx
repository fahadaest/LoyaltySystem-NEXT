"use client";
import React, { useState } from "react";
import { Plus } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import ProductsGrid from "@/components/product/ProductGrid";
import Modal from "@/components/ui/Modal";
import AddProductComponent from "@/components/product/AddProductComponent";
import { useGetAllProductSizesQuery, useDeleteProductSizeMutation } from "@/store/slices/productSizesApis";
import { useCreateProductMutation, useUpdateProductMutation } from "@/store/slices/productsApis";
import DeleteConfirmationComponent from "@/components/ui/DeleteConfirmationModal";
import { showSuccess, showError, showWarning } from "@/store/slices/alertSlice";

const ProductPage = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sizeToDelete, setSizeToDelete] = useState(null);
    const [sizeIdToDelete, setSizeIdToDelete] = useState(null);
    const [deleteProductSize] = useDeleteProductSizeMutation();
    const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    const handleAddClick = () => setIsAddProductModalOpen(true);
    const handleCloseModal = () => setIsAddProductModalOpen(false);

    const handleSubmitProduct = async (productData) => {
        if (!productData?.name || !productData?.description) {
            alert("Please fill required fields");
            return;
        }

        try {
            const apiData = {
                name: productData.name,
                description: productData.description,
                price: productData.productPrice,
                currency: productData.currency,
                sizeId: productData.sizeId,
                image: productData.image
            };
            await createProduct(apiData).unwrap();
            setIsAddProductModalOpen(false);
        } catch (error) {
            alert(`Error creating product: ${error.message || 'Unknown error'}`);
        }
    };

    const handleDeleteSize = async (sizeId) => {
        try {
            await deleteProductSize(sizeId).unwrap();
        } catch (error) {
            alert(`Error deleting size: ${error.message || 'Unknown error'}`);
        }
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setIsEditProductModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditProductModalOpen(false);
        setProductToEdit(null);
    };

    const buttons = [{
        text: "Add Product",
        onClick: handleAddClick,
        backgroundColor: "#000000",
        textColor: "#FFFFFF",
        showIcon: true,
        iconPosition: "right",
        icon: "/img/general/plus_black.svg",
        height: "32px",
        fontSize: "10px",
        padding: "0px 8px 0px 12px",
        iconWidth: "16px",
        iconHeight: "16px",
        iconImageWidth: "10px",
        iconImageHeight: "10px"
    }];

    const getModalFooter = (isEditMode) => (
        <div className="flex justify-end gap-3">
            <button
                onClick={isEditMode ? handleCloseEditModal : handleCloseModal}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-8 px-5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
                Cancel
            </button>
            <button
                onClick={() => document.querySelector('form').requestSubmit()}
                disabled={isEditMode ? isUpdating : isCreating}
                className="h-8 px-5 bg-black rounded-full flex items-center gap-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
                {isEditMode ? (isUpdating ? "Updating..." : "Update Product") : (isCreating ? "Adding..." : "Add Product")}
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-2.5 h-2.5 text-black" />
                </div>
            </button>
        </div>
    );

    const handleEditProduct = async (productData) => {
        if (!productData?.name || !productData?.description) {
            alert("Please fill required fields");
            return;
        }

        try {
            const apiData = {
                id: productToEdit.id,
                name: productData.name,
                description: productData.description,
                price: productData.productPrice,
                currency: productData.currency,
                sizeId: productData.sizeId,
            };

            if (productData.image) {
                apiData.image = productData.image;
            }

            await updateProduct(apiData).unwrap();
            setIsEditProductModalOpen(false);
            setProductToEdit(null);
        } catch (error) {
            alert(`Error updating product: ${error.message || 'Unknown error'}`);
        }
    };

    return (
        <main className="min-h-[78vh] flex flex-col">
            <div className="mb-2">
                <ComponentHeader
                    title="Manage Products"
                    subtitle="Manage your products"
                    buttons={buttons}
                    infoMessage="This page allows you to add, edit, and manage all your products. Use the Add Product button to create new products."
                />
            </div>

            <div className="flex-1">
                <ProductsGrid onAddProduct={handleAddClick} onEditProduct={handleEditClick} />
            </div>

            <Modal
                isOpen={isAddProductModalOpen}
                onClose={handleCloseModal}
                title="Add Product"
                subtitle="Please provide the basic information required to add this product"
                maxWidth="53vw"
                maxHeight="65vh"
                footer={getModalFooter(false)}
            >
                <AddProductComponent
                    onSubmit={handleSubmitProduct}
                    setSizeToDelete={setSizeToDelete}
                    setSizeIdToDelete={setSizeIdToDelete}
                    setShowDeleteModal={setShowDeleteModal}
                />
            </Modal>

            <Modal
                isOpen={isEditProductModalOpen}
                onClose={handleCloseEditModal}
                title="Edit Product"
                subtitle="Update your product information"
                maxWidth="53vw"
                maxHeight="65vh"
                footer={getModalFooter(true)}
            >
                <AddProductComponent
                    onSubmit={handleEditProduct}
                    setSizeToDelete={setSizeToDelete}
                    setSizeIdToDelete={setSizeIdToDelete}
                    setShowDeleteModal={setShowDeleteModal}
                    editMode={true}
                    initialData={productToEdit}
                />
            </Modal>

            {showDeleteModal && sizeToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-md w-full mx-4">
                        <DeleteConfirmationComponent
                            itemName={sizeToDelete}
                            onConfirm={async () => {
                                await handleDeleteSize(sizeIdToDelete);
                                setShowDeleteModal(false);
                                setSizeToDelete(null);
                                setSizeIdToDelete(null);
                            }}
                            onCancel={() => {
                                setShowDeleteModal(false);
                                setSizeToDelete(null);
                                setSizeIdToDelete(null);
                            }}
                        />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ProductPage;