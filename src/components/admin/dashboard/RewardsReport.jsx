import React, { useState } from 'react';
import Card from "components/card";
import { MdTrendingUp, MdAttachMoney, MdRedeem, MdShoppingCart, MdStars } from "react-icons/md";
import { IoMdTrophy } from "react-icons/io";
import { useGetRewardsAnalyticsQuery } from 'store/apiEndPoints/dashboardApi';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

export default function RewardsReport() {
    const [filters, setFilters] = useState({
        filter: 'month',
        limit: 30
    });

    // Build API parameters
    const apiParams = {
        filter: filters.filter,
        limit: filters.limit,
        startDate: '',
        endDate: ''
    };

    const { data, isLoading, error, refetch } = useGetRewardsAnalyticsQuery(apiParams);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-AE', {
            style: 'currency',
            currency: 'AED',
            minimumFractionDigits: 2,
        }).format(parseFloat(amount || 0));
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    // Process data for chart
    const processChartData = () => {
        if (!data?.data || !data?.labels) return [];

        return data.labels.map((label, index) => {
            const dayData = data.data[index];
            return {
                day: label,
                totalPurchases: (dayData.totalProductsPurchases || 0) + (dayData.totalPointPurchases || 0),
                // totalAmountSpent: (dayData.totalProductsAmountSpent || 0) + (dayData.totalPointAmountSpent || 0),
                totalRewardsRedeemed: (dayData.totalProductRewardsRedeemed || 0) + (dayData.totalPointRewardsRedeemed || 0)
            };
        });
    };

    const chartData = processChartData();

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{`Day ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.name.includes('Amount') ?
                                formatCurrency(entry.value) :
                                entry.value.toLocaleString()
                            }
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (error) {
        return (
            <Card extra={"w-full h-full px-6 pb-6"}>
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <p className="text-red-500 dark:text-red-400 mb-2">Failed to load rewards data</p>
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
            {/* Header with Filters */}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/20">
                        <IoMdTrophy className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-navy-700 dark:text-white">Rewards Analytics</h1>
                        <p className="text-gray-500 text-sm dark:text-gray-300">Track purchases, spending, and rewards redemption</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
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

                    <button
                        onClick={() => refetch()}
                        className="px-4 py-1 bg-purple-600 text-white rounded-md text-sm hover:bg-purple-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>


            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="xl:col-span-2">
                    <Card extra={"w-full h-full px-6 pb-6"}>
                        <div className="relative flex items-center justify-between pt-4 mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-navy-700 dark:text-white">Daily Analytics Overview</h2>
                                <p className="text-gray-500 text-sm dark:text-gray-300">Purchases, spending, and rewards trends</p>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex items-center justify-center h-80">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                            </div>
                        ) : (
                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={chartData}
                                        margin={{
                                            top: 20,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                        <XAxis
                                            dataKey="day"
                                            stroke="#666"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            fontSize={12}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend />
                                        <Bar
                                            dataKey="totalPurchases"
                                            fill="#8b5cf6"
                                            name="Total Purchases"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="totalAmountSpent"
                                            fill="#06b6d4"
                                            name="Total Amount Spent (AED)"
                                            radius={[2, 2, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="totalRewardsRedeemed"
                                            fill="#10b981"
                                            name="Total Rewards Redeemed"
                                            radius={[2, 2, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Summary Statistics */}
                <div className="space-y-4">
                    <Card extra={"w-full px-4 py-4"}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                                <MdShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Purchases</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Product Purchases</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {(data?.totalProductsPurchases || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Point Purchases</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {(data?.totalPointPurchases || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Total Purchases</span>
                                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                        {((data?.totalProductsPurchases || 0) + (data?.totalPointPurchases || 0)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card extra={"w-full px-4 py-4"}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-cyan-100 rounded-lg dark:bg-cyan-900/20">
                                <MdAttachMoney className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Spending</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Product Spending</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {formatCurrency(data?.totalProductsAmountSpent)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Point Spending</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {formatCurrency(data?.totalPointAmountSpent)}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Total Spending</span>
                                    <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                                        {formatCurrency((data?.totalProductsAmountSpent || 0) + (data?.totalPointAmountSpent || 0))}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card extra={"w-full px-4 py-4"}>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/20">
                                <MdStars className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-navy-700 dark:text-white">Rewards</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Product Rewards</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {(data?.totalProductRewardsRedeemed || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Point Rewards</span>
                                <span className="text-sm font-bold text-navy-700 dark:text-white">
                                    {(data?.totalPointRewardsRedeemed || 0).toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Total Rewards</span>
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {((data?.totalProductRewardsRedeemed || 0) + (data?.totalPointRewardsRedeemed || 0)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    );
}