"use client";
import React from "react";
import { Plus, Download } from 'lucide-react';
import ComponentHeader from "@/components/ui/ComponentHeader";
import ProductsGrid from "@/components/product/ProductGrid";

const AddProductPage = () => {
    const handleAddClick = () => {
        console.log("Add button clicked");
    };

    const handleExportClick = () => {
        console.log("Export button clicked");
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
        </main>
    );
};

export default AddProductPage;