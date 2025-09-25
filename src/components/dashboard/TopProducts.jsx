import React, { useState } from 'react';
import DropdownButton from '../input-fields/DropDownButton';
import Table from '../ui/Table';

const TopProducts = () => {
    // Sample products data
    const productsData = [
        {
            name: 'Spanish Latte',
            size: 'Large',
            price: 'AED 50',
            purchases: '79 Purchases',
            totalSales: 'AED 711.00',
            calculation: '9 X 79'
        },
        {
            name: 'Chocolate Mocca',
            size: 'Medium',
            price: 'AED 35',
            purchases: '8 Purchases',
            totalSales: 'AED 112.50',
            calculation: '4.5 X 25'
        },
        {
            name: 'Espresso',
            size: 'Large',
            price: 'AED 40',
            purchases: '5 Purchases',
            totalSales: 'AED 124.40',
            calculation: '15.55 x 8'
        },
        {
            name: 'Macha Latte',
            size: 'Small',
            price: 'AED 25',
            purchases: '3 Purchases',
            totalSales: 'AED 87.50',
            calculation: '12.5 x 7'
        },
        {
            name: 'Latte',
            size: 'Large',
            price: 'AED 45',
            purchases: '9 Purchases',
            totalSales: 'AED 45.00',
            calculation: '11.25 x 4'
        }
    ];

    // Define table headers with custom rendering
    const tableHeaders = [
        {
            key: 'product',
            label: 'Product',
            className: 'flex-1',
            align: 'left',
            render: (item) => (
                <div>
                    <h4
                        className="font-medium text-black mb-0.5"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12px',
                            fontWeight: '500',
                            lineHeight: '140%',
                            color: '#000000'
                        }}
                    >
                        {item.name}
                    </h4>
                    <p
                        className="text-gray-500 text-xs"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '9px',
                            fontWeight: '400',
                            lineHeight: '130%',
                            color: '#636363'
                        }}
                    >
                        {item.size}
                    </p>
                </div>
            )
        },
        {
            key: 'price',
            label: 'Price',
            className: 'flex-1',
            align: 'center',
            cellStyle: {
                textAlign: 'center'
            }
        },
        {
            key: 'purchases',
            label: 'Purchases',
            className: 'flex-1',
            align: 'center',
            cellStyle: {
                textAlign: 'center'
            }
        },
        {
            key: 'totalSales',
            label: 'Total Sales',
            className: 'flex-1',
            align: 'right',
            render: (item) => (
                <div className="text-right">
                    <div
                        className="font-medium text-black mb-0.5"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12px',
                            fontWeight: '500',
                            lineHeight: '140%',
                            color: '#000000'
                        }}
                    >
                        {item.totalSales}
                    </div>
                    <p
                        className="text-gray-500 text-xs"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '9px',
                            fontWeight: '400',
                            lineHeight: '130%',
                            color: '#636363'
                        }}
                    >
                        {item.calculation}
                    </p>
                </div>
            )
        }
    ];

    const handleDropdownClick = (dropdownType) => {
        console.log(`${dropdownType} dropdown clicked`);
    };

    const handleRefreshClick = () => {
        console.log('Refresh clicked');
    };

    return (
        <div className="w-full mx-auto mt-2">
            {/* Main Container */}
            <div
                className="relative bg-gray-50 border border-gray-200 rounded-3xl p-4 w-full"
                style={{
                    minHeight: '480px',
                    background: '#FCFCFC',
                    border: '1px solid #E2E2E2',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)',
                    borderRadius: '32px'
                }}
            >
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-5 gap-3">
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
                            Top Products
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
                            Track best-selling products
                        </p>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-1.5">
                        <DropdownButton
                            text="This Month"
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Period')}
                        />

                        <DropdownButton
                            text="All Products"
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Product Type')}
                        />

                        <DropdownButton
                            text="Top 10"
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Limit')}
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

                {/* Products Table */}
                <Table
                    headers={tableHeaders}
                    data={productsData}
                    containerStyle={{
                        borderRadius: '24px'
                    }}
                    headerStyle={{
                        fontSize: '14px',
                        fontWeight: '600'
                    }}
                    cellStyle={{
                        fontSize: '12px',
                        fontWeight: '500'
                    }}
                    rowStyle={{
                        padding: '12px 24px'
                    }}
                />

                {/* Footer */}
                <div className="mt-3">
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
                        Showing 6 top products
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopProducts;