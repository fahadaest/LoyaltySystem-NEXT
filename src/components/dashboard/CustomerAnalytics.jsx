import React, { useState } from 'react';
import DropdownButton from '../input-fields/DropDownButton';
import AreaChart from '../ui/AreaGraph';

const CustomerAnalytics = () => {
    // Sample data for the area chart
    const chartData = [
        { month: 'Jan', customers: 450, products: 320, loyalty: 180 },
        { month: 'Feb', customers: 320, products: 280, loyalty: 160 },
        { month: 'Mar', customers: 280, products: 250, loyalty: 140 },
        { month: 'Apr', customers: 350, products: 300, loyalty: 170 },
        { month: 'May', customers: 420, products: 350, loyalty: 200 },
        { month: 'Jun', customers: 380, products: 320, loyalty: 180 },
        { month: 'Jul', customers: 340, products: 290, loyalty: 160 },
        { month: 'Aug', customers: 390, products: 330, loyalty: 190 },
        { month: 'Sep', customers: 360, products: 310, loyalty: 170 },
        { month: 'Oct', customers: 320, products: 280, loyalty: 150 },
        { month: 'Nov', customers: 380, products: 320, loyalty: 180 },
        { month: 'Dec', customers: 480, products: 400, loyalty: 250 }
    ];

    const handleDropdownClick = (dropdownType) => {
        console.log(`${dropdownType} dropdown clicked`);
        // Add your dropdown logic here
    };

    return (
        <div className="w-full mx-auto mt-3">
            {/* Main Container */}
            <div
                className="relative bg-gray-50 border border-gray-200 rounded-3xl p-4 w-full"
                style={{
                    minHeight: '450px',
                    background: '#FCFCFC',
                    border: '1px solid #E2E2E2',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)',
                    borderRadius: '30px'
                }}
            >
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
                    <div>
                        <h2
                            className="text-lg font-bold text-black mb-1"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                fontWeight: '700',
                                lineHeight: '140%'
                            }}
                        >
                            Customer Analytics
                        </h2>
                        <p
                            className="text-gray-500 text-xs"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '10px',
                                fontWeight: '500',
                                lineHeight: '130%',
                                color: '#636363'
                            }}
                        >
                            Track Customer engagement across loyalty programs
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-1.5">
                        <DropdownButton
                            text="View"
                            backgroundColor="#EDEDED"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('View')}
                        />

                        <DropdownButton
                            text="Filter"
                            backgroundColor="#EDEDED"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Filter')}
                        />

                        <DropdownButton
                            text="Week"
                            backgroundColor="black"
                            textColor="white"
                            circleColor="white"
                            iconColor="black"
                            onClick={() => handleDropdownClick('Week')}
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
                    {/* Total Customers */}
                    <div
                        className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full"
                        style={{
                            height: '65px',
                            background: '#F5F5F5',
                            borderRadius: '20px'
                        }}
                    >
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full flex-shrink-0" style={{ background: '#41CC40' }}></div>
                        <span
                            className="text-black font-semibold flex-1 min-w-0"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                        >
                            Total Customers
                        </span>
                        <div
                            className="bg-brandColor text-white rounded-xl px-2.5 py-1.5 text-base font-medium flex-shrink-0"
                            style={{

                                borderRadius: '12px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            161
                        </div>
                    </div>

                    {/* Total Products */}
                    <div
                        className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full"
                        style={{
                            height: '65px',
                            background: '#F5F5F5',
                            borderRadius: '20px'
                        }}
                    >
                        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full flex-shrink-0" style={{ background: '#B6B6B6' }}></div>
                        <span
                            className="text-black font-semibold flex-1 min-w-0"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                        >
                            Total Products
                        </span>
                        <div
                            className="bg-gray-400 text-white rounded-xl px-2.5 py-1.5 text-base font-medium flex-shrink-0"
                            style={{
                                background: '#B6B6B6',
                                borderRadius: '12px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            6
                        </div>
                    </div>

                    {/* Loyalty Programs */}
                    <div
                        className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full"
                        style={{
                            height: '65px',
                            background: '#F5F5F5',
                            borderRadius: '20px'
                        }}
                    >
                        <div className="w-2.5 h-2.5 bg-black rounded-full flex-shrink-0"></div>
                        <span
                            className="text-black font-semibold flex-1 min-w-0"
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}
                        >
                            Loyalty Programs
                        </span>
                        <div
                            className="bg-black text-white rounded-xl px-2.5 py-1.5 text-base font-medium flex-shrink-0"
                            style={{
                                borderRadius: '12px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '16px',
                                fontWeight: '500'
                            }}
                        >
                            7
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <AreaChart
                    data={chartData}
                    width="100%"
                    height={280}
                    maxValue={500}
                    chartHeight={180}
                    showGrid={true}
                    showXAxisLabels={true}
                    showYAxisLabels={true}
                />
            </div>
        </div>
    );
};

export default CustomerAnalytics;