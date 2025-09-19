"use client";
import React, { useState } from "react";
import { Plus, Download } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import ProductsGrid from "@/components/product/ProductGrid";
import Modal from "@/components/ui/Modal";
import AddProductComponent from "@/components/product/AddProductComponent";

const ProductPage = () => {
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddProductModalOpen(false);
    };

    const handleSubmitProduct = (productData) => {
        console.log("Product submitted:", productData);
        setIsAddProductModalOpen(false);
    };

    const buttons = [
        {
            text: "Add Product",
            onClick: handleAddClick,
            backgroundColor: "#000000",
            textColor: "#FFFFFF",
            showIcon: true,
            iconPosition: "right",
            icon: <Plus className="w-2 h-2" />
        },
    ];

    // Footer content for the modal
    const modalFooter = (
        <div className="flex justify-end gap-3">
            <button
                onClick={handleCloseModal}
                className="h-8 px-5 bg-gray-50 border border-gray-200 rounded-full text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={() => handleSubmitProduct({})}
                className="h-8 px-5 bg-black rounded-full flex items-center gap-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
            >
                Add Product
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <Plus className="w-2.5 h-2.5 text-black" />
                </div>
            </button>
        </div>
    );

    return (
        <main className="min-h-[78vh]">
            <div className="mb-6">
                <ComponentHeader
                    title="Manage Products"
                    subtitle="Manage your products"
                    buttons={buttons}
                    infoMessage="This page allows you to add, edit, and manage all your products. Use the Add Product button to create new products."
                />
            </div>

            <ProductsGrid />

            <Modal
                isOpen={isAddProductModalOpen}
                onClose={handleCloseModal}
                title="Add Product"
                subtitle="Please provide the basic information required to add this product"
                maxWidth="55vw"
                maxHeight="65vh"
                footer={modalFooter}
            >
                <AddProductComponent
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitProduct}
                />
            </Modal>
        </main>
    );
};

export default ProductPage;