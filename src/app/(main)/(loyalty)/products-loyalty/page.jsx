"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import ProductLoyaltyCard from "@/components/loyalty/ProductLoyaltyCard";

const ProductLoyalty = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(2);

    const mockProductLoyaltyPrograms = [
        {
            id: 1,
            title: "Buy 4 Hot Chocolate and get 2 FREE",
            product: "Hot Chocolate (Small)",
            purchaseQuantity: "10",
            rewardProduct: "Hot Chocolate"
        },
        {
            id: 2,
            title: "Buy 3 Cappuccino and get 2 FREE",
            product: "Cappuccino (Medium)",
            purchaseQuantity: "10",
            rewardProduct: "Cappuccino"
        },
        {
            id: 3,
            title: "Buy 6 Espresso Shots and get 2 FREE",
            product: "Espresso (Large)",
            purchaseQuantity: "10",
            rewardProduct: "Espresso"
        }
    ];

    const handleView = (program) => {
        console.log("View product loyalty:", program);
    };

    const handleEdit = (program) => {
        console.log("Edit product loyalty:", program);
    };

    const handleCopy = (program) => {
        console.log("Copy product loyalty:", program);
    };

    const handleDelete = (program) => {
        console.log("Delete product loyalty:", program);
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

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Product Loyalty"
                    subtitle="Manage Product-Based Loyalties Reward"
                    infoMessage="This page allows you to add, edit, and manage all your product-based loyalty programs. Use the Add New Loyalty button to create new reward programs."
                />

                <Button
                    text={"Add New Loyalty"}
                    onClick={null}
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
                <div className="grid grid-cols-4 gap-2 ">
                    {mockProductLoyaltyPrograms.map((program) => (
                        <ProductLoyaltyCard
                            key={program.id}
                            title={program.title}
                            product={program.product}
                            purchaseQuantity={program.purchaseQuantity}
                            rewardProduct={program.rewardProduct}
                            onView={() => handleView(program)}
                            onEdit={() => handleEdit(program)}
                            onCopy={() => handleCopy(program)}
                            onDelete={() => handleDelete(program)}
                        />
                    ))}
                </div>

            </div>
        </main>
    );
};

export default ProductLoyalty;