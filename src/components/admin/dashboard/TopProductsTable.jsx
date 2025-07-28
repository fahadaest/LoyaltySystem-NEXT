import React, { useState } from 'react';
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdShoppingCart, MdAttachMoney, MdTrendingUp, MdExpandMore, MdExpandLess, MdUnfoldMore } from "react-icons/md";
import { useGetTopProductsQuery } from "store/apiEndPoints/dashboardApi";
import { IoMdCube } from "react-icons/io";
import { getImageUrl } from "utils/imageUtils"; // Adjust the import path as needed

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export default function TopProductsTable() {
    const [sorting, setSorting] = useState([]);
    const [filters, setFilters] = useState({
        filter: 'month',
        productType: 'all',
        limit: 10
    });

    // Build API parameters based on filter state
    const apiParams = {
        filter: filters.filter,
        limit: filters.limit,
        ...(filters.productType === 'all' && {}),
        ...(filters.productType === 'point' && { isPointProducts: true }),
        ...(filters.productType === 'product' && { isProductProducts: true }),
    };

    const { data, isLoading, error, refetch } = useGetTopProductsQuery(apiParams);

    const products = data || [];

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 2,
        }).format(parseFloat(amount));
    };

    const getSortIcon = (column) => {
        const sortDirection = column.getIsSorted();
        if (sortDirection === 'asc') {
            return <MdExpandLess className="w-4 h-4 text-gray-500" />;
        } else if (sortDirection === 'desc') {
            return <MdExpandMore className="w-4 h-4 text-gray-500" />;
        } else {
            return <MdUnfoldMore className="w-4 h-4 text-gray-400 opacity-50" />;
        }
    };

    const columns = [
        columnHelper.accessor("productName", {
            id: "productName",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
                    <MdShoppingCart /> PRODUCT
                </p>
            ),
            cell: (info) => (
                <div className="flex items-center gap-3">
                    {/* Product Image */}
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {info.row.original.productImage ? (
                            <img
                                src={getImageUrl(info.row.original.productImage)}
                                alt={info.getValue()}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: info.row.original.productImage ? 'none' : 'flex' }}>
                            <MdShoppingCart className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div>
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {info.getValue()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {info.row.original.productDescription}
                        </p>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor("productPrice", {
            id: "productPrice",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
                    <MdAttachMoney /> PRICE
                </p>
            ),
            cell: (info) => (
                <p className="text-sm font-bold text-navy-700 dark:text-white">
                    {formatCurrency(info.getValue())}
                </p>
            ),
        }),
        columnHelper.accessor("purchaseCount", {
            id: "purchaseCount",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
                    <MdTrendingUp /> PURCHASES
                </p>
            ),
            cell: (info) => (
                <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {info.getValue()}
                    </p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">purchases</span>
                </div>
            ),
        }),
        columnHelper.display({
            id: "totalSales",
            header: () => (
                <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
                    <MdAttachMoney /> TOTAL SALES
                </p>
            ),
            cell: (info) => {
                const price = parseFloat(info.row.original.productPrice || 0);
                const quantity = parseInt(info.row.original.purchaseCount || 0);
                const totalSales = price * quantity;

                return (
                    <div className="flex flex-col">
                        <p className="text-sm font-bold text-navy-700 dark:text-white">
                            {formatCurrency(totalSales)}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {price} × {quantity}
                        </span>
                    </div>
                );
            },
        }),
    ];

    const table = useReactTable({
        data: products,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    if (error) {
        return (
            <Card extra={"w-full h-full px-6 pb-6"}>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 dark:text-red-400 mb-2">Failed to load products</p>
                        <button
                            onClick={() => refetch()}
                            className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </Card>
        );
    }

    return (
        <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>

            <div className="relative flex items-center justify-between pt-4">
                <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
                    <div className="p-2 bg-brandGreen/15 rounded-lg dark:bg-navy-700 flex-shrink-0">
                        <IoMdCube className="w-6 h-6 text-brandGreen dark:text-white" />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-navy-700 dark:text-white whitespace-nowrap">Top Products</h1>
                        <p className="text-gray-500 text-sm dark:text-gray-300 whitespace-nowrap">Track best-selling products</p>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ml-4">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Period:
                        </label>
                        <select
                            value={filters.filter}
                            onChange={(e) => handleFilterChange('filter', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Product Type:
                        </label>
                        <select
                            value={filters.productType}
                            onChange={(e) => handleFilterChange('productType', e.target.value)}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="all">All Products</option>
                            <option value="point">Point Products</option>
                            <option value="product">Product Products</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Limit:
                        </label>
                        <select
                            value={filters.limit}
                            onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value={5}>Top 5</option>
                            <option value={10}>Top 10</option>
                            <option value={20}>Top 20</option>
                            <option value={50}>Top 50</option>
                        </select>
                    </div>

                    <button
                        onClick={() => refetch()}
                        className="px-4 py-1 bg-brandGreen text-white rounded-md text-sm hover:bg-brand-600 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
                </div>
            )}

            {/* Table Container with Fixed Height */}
            {!isLoading && (
                <div className="mt-8">
                    {/* Fixed height container that shows ~5 rows + header */}
                    <div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        {/* Single table with sticky header and scrollable body */}
                        <div className="h-full overflow-y-auto">
                            <table className="w-full table-fixed">
                                <colgroup>
                                    <col className="w-2/5" />
                                    <col className="w-1/6" />
                                    <col className="w-1/6" />
                                    <col className="w-1/4" />
                                </colgroup>
                                <thead className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <tr key={headerGroup.id} className="!border-px !border-gray-400">
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <th
                                                        key={header.id}
                                                        colSpan={header.colSpan}
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 px-4 text-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                    >
                                                        <div className="flex items-center text-xs text-gray-200">
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                            {header.column.getCanSort() && (
                                                                <div className="ml-2">
                                                                    {getSortIcon(header.column)}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </th>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.map((row, index) => {
                                        return (
                                            <tr
                                                key={row.id}
                                                className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    return (
                                                        <td
                                                            key={cell.id}
                                                            className="border-white/0 py-2 px-4"
                                                        >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            {/* Empty State within scrollable area */}
                            {products.length === 0 && (
                                <div className="flex items-center justify-center py-16">
                                    <div className="text-center">
                                        <MdShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            No products found for the selected filters
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Summary */}
                    {products.length > 0 && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
                            <span>Showing {products.length} top products</span>
                            {products.length > 5 && (
                                <span className="text-blue-600 dark:text-blue-400">
                                    Scroll to see more →
                                </span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}