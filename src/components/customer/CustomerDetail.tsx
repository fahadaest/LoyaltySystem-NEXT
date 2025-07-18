import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Table from "components/ui/Table";
import Card from "components/card";

interface LoyaltyProgram {
    id: number;
    customerId: number;
    loyaltyId: number;
    type: "POINT" | "PRODUCT";
    createdAt: string;
    updatedAt: string;
    pointLoyalty?: {
        id: number;
        loyaltyTemplates: string;
        rewardTitle: string;
        pointsRequired: number;
        rewardValue: number;
        rewardProducts: any[];
    } | null;
    productLoyalty?: {
        id: number;
        loyaltyTemplates: string;
        rewardTitle: string;
        purchaseQuantity: number;
        rewardProducts: any[];
    } | null;
}

interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    adminId: number;
    createdAt: string;
    updatedAt: string;
    loyaltyPrograms: LoyaltyProgram[];
}

interface CustomerDetailProps {
    customer: Customer;
    onEditLoyalty?: (loyalty: LoyaltyProgram) => void;
    onDeleteLoyalty?: (loyalty: LoyaltyProgram) => void;
    onViewLoyalty?: (loyalty: LoyaltyProgram) => void;
}

export default function CustomerDetail({
    customer,
    onEditLoyalty,
    onDeleteLoyalty,
    onViewLoyalty,
}: CustomerDetailProps) {
    // Filter loyalty programs by type
    const pointLoyalties = customer.loyaltyPrograms.filter(
        (loyalty) => loyalty.type === "POINT"
    );
    const productLoyalties = customer.loyaltyPrograms.filter(
        (loyalty) => loyalty.type === "PRODUCT"
    );

    // Column definitions for Point-based loyalty programs
    const pointLoyaltyColumns: ColumnDef<LoyaltyProgram>[] = [
        {
            accessorKey: "pointLoyalty.rewardTitle",
            header: "Reward Title",
            cell: ({ row }) => (
                <span className="text-gray-900 dark:text-white">
                    {row.original.pointLoyalty?.rewardTitle || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "pointLoyalty.pointsRequired",
            header: "Points Required",
            cell: ({ row }) => (
                <span className="font-medium text-blue-600">
                    {row.original.pointLoyalty?.pointsRequired || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "pointLoyalty.rewardValue",
            header: "Reward Value",
            cell: ({ row }) => (
                <span className="font-medium text-green-600">
                    ${row.original.pointLoyalty?.rewardValue || "0"}
                </span>
            ),
        },
        {
            accessorKey: "pointLoyalty.loyaltyTemplates",
            header: "Template",
            cell: ({ row }) => (
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {row.original.pointLoyalty?.loyaltyTemplates || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) => (
                <span className="text-gray-600 dark:text-gray-400">
                    {new Date(getValue() as string).toLocaleDateString()}
                </span>
            ),
        },
    ];

    // Column definitions for Product-based loyalty programs
    const productLoyaltyColumns: ColumnDef<LoyaltyProgram>[] = [
        {
            accessorKey: "productLoyalty.rewardTitle",
            header: "Reward Title",
            cell: ({ row }) => (
                <span className="text-gray-900 dark:text-white">
                    {row.original.productLoyalty?.rewardTitle || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "productLoyalty.purchaseQuantity",
            header: "Purchase Quantity",
            cell: ({ row }) => (
                <span className="font-medium text-purple-600">
                    {row.original.productLoyalty?.purchaseQuantity || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "productLoyalty.loyaltyTemplates",
            header: "Template",
            cell: ({ row }) => (
                <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    {row.original.productLoyalty?.loyaltyTemplates || "N/A"}
                </span>
            ),
        },
        {
            accessorKey: "productLoyalty.rewardProducts",
            header: "Reward Products",
            cell: ({ row }) => (
                <span className="text-gray-600 dark:text-gray-400">
                    {row.original.productLoyalty?.rewardProducts?.length || 0} products
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({ getValue }) => (
                <span className="text-gray-600 dark:text-gray-400">
                    {new Date(getValue() as string).toLocaleDateString()}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-6 p-10">
            {/* Customer Information */}
            <Card>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {customer.firstName} {customer.lastName}
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Phone Number
                                </label>
                                <p className="text-gray-900 dark:text-white">{customer.phoneNumber}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <p className="text-gray-900 dark:text-white">{customer.email}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Member Since
                                </label>
                                <p className="text-gray-900 dark:text-white">
                                    {new Date(customer.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loyalty Programs Summary */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Loyalty Programs Summary
                            </h3>
                            <div className="flex space-x-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-brandGreen">{pointLoyalties.length}</p>
                                    <p className="text-sm text-brandGreen dark:text-gray-400">Point Programs</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-brandGreen">{productLoyalties.length}</p>
                                    <p className="text-sm text-brandGreen dark:text-gray-400">Product Programs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Point-based Loyalty Programs */}
            {pointLoyalties.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Point-Based Loyalty Programs
                    </h3>
                    <Table
                        data={pointLoyalties}
                        columns={pointLoyaltyColumns} isLoading={false} />
                </div>
            )}

            {/* Product-based Loyalty Programs */}
            {productLoyalties.length > 0 && (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Product-Based Loyalty Programs
                    </h3>
                    <Table
                        data={productLoyalties}
                        columns={productLoyaltyColumns} isLoading={false} />
                </div>
            )}

            {/* No Loyalty Programs */}
            {customer.loyaltyPrograms.length === 0 && (
                <Card>
                    <div className="p-6 text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            This customer is not enrolled in any loyalty programs.
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}