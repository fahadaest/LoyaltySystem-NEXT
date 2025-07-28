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
        filter: 'week',
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
                totalRewardsRedeemed: (dayData.totalProductRewardsRedeemed || 0) + (dayData.totalPointRewardsRedeemed || 0)
            };
        });
    };

    const chartData = processChartData();

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">{`Day ${label}`}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {entry.name}: {entry.value.toLocaleString()}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (error) {
        return (
            <div className="p-6">
                <Card extra={"w-full h-full p-6"}>
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-red-500 dark:text-red-400 mb-4">Failed to load rewards data</p>
                            <button
                                onClick={() => refetch()}
                                className="px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <Card extra={"w-full p-6"}>
            {/* Header with Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-brandGreen/20 rounded-xl dark:bg-purple-900/20">
                        <IoMdTrophy className="w-7 h-7 text-brandGreen dark:text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-navy-700 dark:text-white mb-1">Rewards Analytics</h1>
                        <p className="text-gray-500 text-sm dark:text-gray-300">Track purchases and rewards redemption</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Period:
                        </label>
                        <select
                            value={filters.filter}
                            onChange={(e) => handleFilterChange('filter', e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>

                    <button
                        onClick={() => refetch()}
                        className="px-6 py-2 bg-brandGreen text-white rounded-lg text-sm transition-colors focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="xl:col-span-2">
                    <Card extra={"p-2"}>
                        {isLoading ? (
                            <div className="flex items-center justify-center h-[400px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                            </div>
                        ) : (
                            <div className="h-[400px] w-full">
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
                                            radius={[4, 4, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="totalRewardsRedeemed"
                                            fill="#10b981"
                                            name="Total Rewards Redeemed"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Summary Statistics */}
                <div className="flex flex-col gap-6">
                    {/* Purchases Card */}
                    <Card extra={"w-full p-4"}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brandGreen/20 rounded-lg dark:bg-blue-900/20">
                                <MdShoppingCart className="w-5 h-5 text-brandGreen dark:text-blue-400" />
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

                            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-200">Total Purchases</span>
                                    <span className="text-lg font-bold text-brandGreen dark:text-purple-400">
                                        {((data?.totalProductsPurchases || 0) + (data?.totalPointPurchases || 0)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Rewards Card */}
                    <Card extra={"w-full p-4"}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-brandGreen/20 rounded-lg dark:bg-green-900/20">
                                <MdStars className="w-5 h-5 text-brandGreen dark:text-green-400" />
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

                            <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex justify-between items-center">
                                    <span className="text-base font-semibold text-gray-700 dark:text-gray-200">Total Rewards</span>
                                    <span className="text-lg font-bold text-brandGreen dark:text-green-400">
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