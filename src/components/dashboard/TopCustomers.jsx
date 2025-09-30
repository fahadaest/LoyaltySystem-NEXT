import React, { useState } from 'react';
import DropdownButton from '../input-fields/DropDownButton';
import Table from '../ui/Table';
import Button from '../buttons/Button';

const TopCustomers = () => {
    // Sample customer data
    const customersData = [
        {
            name: 'Fahad',
            email: 'info@example.com',
            phone: '+971 50 123 4567',
            amountSpent: 'AED 1,300',
            programs: [{ type: 'point', label: '1 Point' }]
        },
        {
            name: 'Fahad',
            email: 'info@example.com',
            phone: '+971 50 123 4567',
            amountSpent: 'AED 1,300',
            programs: [{ type: 'product', label: '1 Product' }]
        },
        {
            name: 'Fahad',
            email: 'info@example.com',
            phone: '+971 50 123 4567',
            amountSpent: 'AED 1,300',
            programs: [
                { type: 'point', label: '1 Point' },
                { type: 'product', label: '1 Product' }
            ]
        },
        {
            name: 'Fahad',
            email: 'info@example.com',
            phone: '+971 50 123 4567',
            amountSpent: 'AED 1,300',
            programs: [
                { type: 'point', label: '3 Point' },
                { type: 'product', label: '3 Product' }
            ]
        },
        {
            name: 'Fahad',
            email: 'info@example.com',
            phone: '+971 50 123 4567',
            amountSpent: 'AED 1,300',
            programs: [{ type: 'product', label: '1 Product' }]
        }
    ];

    // Define table headers with custom rendering
    const tableHeaders = [
        {
            key: 'customer',
            label: 'Customer',
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
                        className="text-gray-500 text-xs mb-0.5"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '9px',
                            fontWeight: '400',
                            lineHeight: '130%',
                            color: '#636363'
                        }}
                    >
                        {item.email}
                    </p>
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
                        {item.phone}
                    </p>
                </div>
            )
        },
        {
            key: 'amountSpent',
            label: 'Amount Spent',
            className: 'flex-1',
            align: 'center',
            cellStyle: {
                textAlign: 'center'
            }
        },
        {
            key: 'programs',
            label: 'Programs',
            className: 'flex-1',
            align: 'right',
            render: (item) => (
                <div className="flex justify-end gap-1.5">
                    {item.programs.map((program, programIndex) => (
                        <span
                            key={programIndex}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-medium ${program.type === 'point' ? 'bg-black' : 'bg-green-500'
                                }`}
                            style={{
                                background: program.type === 'point' ? '#000000' : '#41CC40',
                                borderRadius: '30px',
                                fontFamily: 'Poppins, sans-serif',
                                fontSize: '10px',
                                fontWeight: '500',
                                lineHeight: '130%',
                                color: '#FFFFFF'
                            }}
                        >
                            {program.label}
                        </span>
                    ))}
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
                            Top Customers
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
                            Track top customers
                        </p>
                    </div>

                    {/* Filter Controls */}
                    <div className="flex gap-1.5 bg-[#EDEDED] rounded-[2rem] px-3 py-2">
                        <DropdownButton
                            fontSize="10px"
                            iconWidth='12px'
                            iconHeight='12px'
                            circleWidth='16px'
                            circleHeight='16px'
                            paddingLeft='10px'
                            paddingRight='5px'
                            text="View"
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('View')}
                        />

                        <DropdownButton
                            text="Filter"
                            fontSize="10px"
                            iconWidth='12px'
                            iconHeight='12px'
                            circleWidth='16px'
                            circleHeight='16px'
                            paddingLeft='10px'
                            paddingRight='5px'
                            backgroundColor="#FFFFFF"
                            textColor="black"
                            circleColor="black"
                            iconColor="white"
                            onClick={() => handleDropdownClick('Filter')}
                        />

                        <DropdownButton
                            fontSize="10px"
                            iconWidth='12px'
                            iconHeight='12px'
                            circleWidth='16px'
                            circleHeight='16px'
                            paddingLeft='10px'
                            paddingRight='5px'
                            text="Week"
                            backgroundColor="black"
                            textColor="white"
                            circleColor="white"
                            iconColor="black"
                            onClick={() => handleDropdownClick('Week')}
                        />

                        <Button
                            text="Export"
                            fontSize='10px'
                            textColor="black"
                            backgroundColor="#FFFFFF"
                            height="auto"
                            border="1px solid black"
                            onClick={() => handleDropdownClick('Week')}
                        />
                    </div>
                </div>

                {/* Customer Table */}
                <Table
                    headers={tableHeaders}
                    data={customersData}
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
                        Showing 10 top customers
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopCustomers;