import React, { useState } from 'react';
import DropdownButton from '../input-fields/DropDownButton';
import BarChart from '../ui/BarChart';
import { ShoppingBag, Star } from 'lucide-react';

const RewardAnalytics = () => {
    // Sample data for the bar chart representing 2 weeks of daily data
    const chartData = [
        {
            label: 'Mon',
            bars: [
                { value: 9, color: '#41CC40' }, // Total Purchases
                { value: 6, color: '#000000' }  // Total Rewards Redeemed
            ]
        },
        {
            label: 'Tue',
            bars: [
                { value: 4, color: '#41CC40' },
                { value: 8, color: '#000000' }
            ]
        },
        {
            label: 'Wed',
            bars: [
                { value: 7, color: '#41CC40' },
                { value: 18, color: '#000000' }
            ]
        },
        {
            label: 'Thur',
            bars: [
                { value: 12, color: '#41CC40' },
                { value: 15, color: '#000000' }
            ]
        },
        {
            label: 'Fri',
            bars: [
                { value: 8, color: '#41CC40' },
                { value: 6, color: '#000000' }
            ]
        },
        {
            label: 'Sat',
            bars: [
                { value: 14, color: '#41CC40' },
                { value: 18, color: '#000000' }
            ]
        },
        {
            label: 'Sun',
            bars: [
                { value: 9, color: '#41CC40' },
                { value: 15, color: '#000000' }
            ]
        },
        // Second week
        {
            label: 'Mon',
            bars: [
                { value: 4, color: '#41CC40' },
                { value: 6, color: '#000000' }
            ]
        },
        {
            label: 'Tue',
            bars: [
                { value: 8, color: '#41CC40' },
                { value: 18, color: '#000000' }
            ]
        },
        {
            label: 'Wed',
            bars: [
                { value: 12, color: '#41CC40' },
                { value: 15, color: '#000000' }
            ]
        },
        {
            label: 'Thur',
            bars: [
                { value: 8, color: '#41CC40' },
                { value: 6, color: '#000000' }
            ]
        },
        {
            label: 'Fri',
            bars: [
                { value: 8, color: '#41CC40' },
                { value: 4, color: '#000000' }
            ]
        },
        {
            label: 'Sat',
            bars: [
                { value: 4, color: '#41CC40' },
                { value: 8, color: '#000000' }
            ]
        },
        {
            label: 'Sun',
            bars: [
                { value: 4, color: '#41CC40' },
                { value: 8, color: '#000000' }
            ]
        }
    ];

    const handleDropdownClick = (dropdownType) => {
        console.log(`${dropdownType} dropdown clicked`);
    };

    const handleRefreshClick = () => {
        console.log('Refresh clicked');
    };

    return (
        <div className="w-full mx-auto mt-3">
            {/* Main Container */}
            <div
                className="relative bg-gray-50 border border-gray-200 rounded-3xl p-4 w-full"
                style={{
                    minHeight: '556px',
                    background: '#FCFCFC',
                    border: '1px solid #E2E2E2',
                    boxShadow: '0px 3.5px 5.5px rgba(0, 0, 0, 0.02)',
                    borderRadius: '40px'
                }}
            >
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-3">
                    <div>
                        <h2
                            className="text-lg font-bold text-black mb-1"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '150%'
                            }}
                        >
                            Reward Analytics
                        </h2>
                        <p
                            className="text-gray-500 text-sm"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '12px',
                                fontWeight: '500',
                                lineHeight: '140%',
                                color: '#636363'
                            }}
                        >
                            Track purchases and reward redemption
                        </p>
                    </div>

                    {/* Filter Controls Container */}
                    <div
                        className="flex items-center gap-2 px-4 py-2 rounded-full"
                        style={{
                            background: '#EDEDED',
                            borderRadius: '68px',
                            height: '63px'
                        }}
                    >
                        <span
                            className="text-gray-600 mr-2"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '12px',
                                fontWeight: '600',
                                color: '#626262'
                            }}
                        >
                            Period
                        </span>

                        <DropdownButton
                            text="This Month"
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Period')}
                        />

                        <DropdownButton
                            text="Refresh"
                            backgroundColor="black"
                            textColor="white"
                            circleColor="white"
                            iconColor="black"
                            onClick={handleRefreshClick}
                        />
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Chart Section */}
                    <div className="lg:col-span-2">
                        <BarChart
                            data={chartData}
                            height={425}
                            maxValue={18}
                            containerStyle={{
                                borderRadius: '30px'
                            }}
                        />

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full"
                                    style={{ background: '#41CC40' }}
                                ></div>
                                <span
                                    className="text-black text-xs font-normal"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        lineHeight: '140%'
                                    }}
                                >
                                    Total Purchases
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div
                                    className="w-5 h-5 rounded-full"
                                    style={{ background: '#000000' }}
                                ></div>
                                <span
                                    className="text-black text-xs font-normal"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        lineHeight: '140%'
                                    }}
                                >
                                    Total Rewards Redeemed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4">
                        {/* Purchases Card */}
                        <div
                            className="rounded-3xl p-4"
                            style={{
                                background: '#EDEDED',
                                borderRadius: '30px',
                                height: '202px'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center"
                                    style={{ background: '#000000' }}
                                >
                                    <ShoppingBag className="w-2.5 h-2.5 text-white" />
                                </div>
                                <h3
                                    className="font-semibold text-black"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        lineHeight: '150%'
                                    }}
                                >
                                    Purchases
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '140%',
                                            color: '#636363'
                                        }}
                                    >
                                        Product Purchases
                                    </span>
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                            color: '#636363'
                                        }}
                                    >
                                        17
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '140%',
                                            color: '#636363'
                                        }}
                                    >
                                        Point Purchases
                                    </span>
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                            color: '#636363'
                                        }}
                                    >
                                        0
                                    </span>
                                </div>

                                <div
                                    className="border-t pt-3"
                                    style={{
                                        borderColor: '#E2E2E2'
                                    }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span
                                            className="text-gray-600 font-semibold"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                lineHeight: '140%',
                                                color: '#636363'
                                            }}
                                        >
                                            Total Purchases
                                        </span>
                                        <span
                                            className="text-gray-600 font-semibold"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                lineHeight: '140%',
                                                color: '#636363'
                                            }}
                                        >
                                            17
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rewards Card */}
                        <div
                            className="rounded-3xl p-4"
                            style={{
                                background: '#F5F5F5',
                                borderRadius: '30px',
                                height: '202px'
                            }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div
                                    className="w-5 h-5 rounded-full flex items-center justify-center"
                                    style={{ background: '#000000' }}
                                >
                                    <Star className="w-2.5 h-2.5 text-white" />
                                </div>
                                <h3
                                    className="font-semibold text-black"
                                    style={{
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '20px',
                                        fontWeight: '600',
                                        lineHeight: '150%'
                                    }}
                                >
                                    Rewards
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '140%',
                                            color: '#636363'
                                        }}
                                    >
                                        Product Rewards
                                    </span>
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                            color: '#636363'
                                        }}
                                    >
                                        0
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '140%',
                                            color: '#636363'
                                        }}
                                    >
                                        Point Rewards
                                    </span>
                                    <span
                                        className="text-gray-600"
                                        style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '15px',
                                            fontWeight: '400',
                                            lineHeight: '150%',
                                            color: '#636363'
                                        }}
                                    >
                                        0
                                    </span>
                                </div>

                                <div
                                    className="border-t pt-3"
                                    style={{
                                        borderColor: '#E2E2E2'
                                    }}
                                >
                                    <div className="flex justify-between items-center">
                                        <span
                                            className="text-gray-600 font-semibold"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                lineHeight: '140%',
                                                color: '#636363'
                                            }}
                                        >
                                            Total Rewards
                                        </span>
                                        <span
                                            className="text-gray-600 font-semibold"
                                            style={{
                                                fontFamily: 'Poppins, sans-serif',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                lineHeight: '140%',
                                                color: '#636363'
                                            }}
                                        >
                                            0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RewardAnalytics;