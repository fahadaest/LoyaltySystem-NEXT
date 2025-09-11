"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";

const SalesPersonPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10);

    const mockSalesPersons = [
        {
            id: 1,
            firstName: "Omar",
            lastName: "Khalid",
            email: "omar.khalid@example.com",
            permissions: "1 Permission",
            permissionDetails: "Scan Cards"
        },
        {
            id: 2,
            firstName: "Sara",
            lastName: "Al Mansouri",
            email: "sara.almansouri@example.com",
            permissions: "3 Permission",
            permissionDetails: "Customers, Scan Cards, Ma..."
        },
        {
            id: 3,
            firstName: "Faisal",
            lastName: "Rahman",
            email: "faisal.rahman@example.com",
            permissions: "5 Permission",
            permissionDetails: "Customers, Scan Cards, Ma..."
        },
        {
            id: 4,
            firstName: "Layla",
            lastName: "Haddad",
            email: "layla.haddad@example.com",
            permissions: "4 Permission",
            permissionDetails: "Scan Cards, Customers, Ma..."
        },
        {
            id: 5,
            firstName: "Ahmed",
            lastName: "Al Farsi",
            email: "ahmed.alfarsi@example.com",
            permissions: "2 Permission",
            permissionDetails: "Customers, Managers"
        },
        {
            id: 6,
            firstName: "Noor",
            lastName: "Al Zahra",
            email: "noor.alzahra@example.com",
            permissions: "1 Permission",
            permissionDetails: "Scan Cards"
        },
        {
            id: 7,
            firstName: "Zayed",
            lastName: "Hassan",
            email: "zayed.hassan@example.com",
            permissions: "3 Permission",
            permissionDetails: "Customers, Scan Cards, Ma..."
        },
        {
            id: 8,
            firstName: "Mariam",
            lastName: "Yusuf",
            email: "mariam.yusuf@example.com",
            permissions: "4 Permission",
            permissionDetails: "Scan Cards, Customers, Ma..."
        },
        {
            id: 9,
            firstName: "Khalifa",
            lastName: "Saeed",
            email: "khalifa.saeed@example.com",
            permissions: "6 Permission",
            permissionDetails: "Customers, Scan Cards, Ma..."
        },
        {
            id: 10,
            firstName: "Hana",
            lastName: "Al Qasimi",
            email: "hana.alqasimi@example.com",
            permissions: "1 Permission",
            permissionDetails: "Scan Cards"
        }
    ];

    const tableHeaders = [
        {
            label: "First Name",
            key: "firstName",
            className: "flex-[1.2]",
            align: "left"
        },
        {
            label: "Last Name",
            key: "lastName",
            className: "flex-[1.2]",
            align: "left"
        },
        {
            label: "Email",
            key: "email",
            className: "flex-[2.5]",
            align: "left"
        },
        {
            label: "Permissions",
            key: "permissions",
            className: "flex-[1.5]",
            align: "left",
            render: (item) => (
                <div>
                    <div className="font-medium text-black">{item.permissions}</div>
                    <div className="text-xs text-gray-500">{item.permissionDetails}</div>
                </div>
            )
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1.2]",
            align: "center",
            render: (item) => (
                <div className="flex items-center justify-center gap-2">
                    <Button
                        text={"Edit"}
                        onClick={() => handleEdit(item)}
                        backgroundColor={'#EDEDED'}
                        textColor={'#000000'}
                        icon={"/img/general/edit.svg"}
                        showIcon={true}
                        iconPosition={'right'}
                        disabled={false}
                        height={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px 4px 0px 10px'}
                        iconBackgroundColor={'#000000'}
                        iconWidth={'1.2rem'}
                        iconHeight={'1.2rem'}
                        iconImageWidth={'0.8rem'}
                        iconImageHeight={'0.8rem'}
                        gap={'8px'}
                        borderRadius={'20px'}
                    />
                    <Button
                        text={""}
                        onClick={() => handleDelete(item)}
                        backgroundColor={'#000000'}
                        textColor={'#FFFFFF'}
                        icon={"/img/general/trash.svg"}
                        showIcon={true}
                        iconPosition={'center'}
                        disabled={false}
                        height={'1.8rem'}
                        width={'1.8rem'}
                        fontSize={'0.65rem'}
                        padding={'0px'}
                        iconWidth={'1rem'}
                        iconHeight={'1rem'}
                        iconImageWidth={'0.7rem'}
                        iconImageHeight={'0.7rem'}
                        borderRadius={'50%'}
                    />
                </div>
            )
        }
    ];

    const handleEdit = (item) => {
        console.log("Edit clicked for:", item);
        // Handle the edit action here
    };

    const handleDelete = (item) => {
        console.log("Delete clicked for:", item);
        // Handle the delete action here
    };

    const handleAddNewSalesPerson = () => {
        console.log("Add new sales person clicked");
        // Handle add new sales person
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

    // Footer pagination info
    const paginationInfo = `page ${currentPage} of ${totalPages}`;

    // Footer buttons
    const footerButtons = [
        {
            text: "Previous",
            onClick: handlePrevious,
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            iconBackgroundColor: '#000000',
            icon: "/img/general/arrow_left_white.svg",
            showIcon: true,
            iconPosition: 'left',
            disabled: currentPage === 1,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 12px 0px 4px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.5rem',
            iconImageHeight: '0.5rem',
            gap: '8px'
        },
        {
            text: "Next",
            onClick: handleNext,
            backgroundColor: '#000000',
            textColor: '#FFFFFF',
            icon: "/img/general/arrow_right_black.svg",
            showIcon: true,
            iconPosition: 'right',
            disabled: currentPage === totalPages,
            height: '1.5rem',
            fontSize: '0.5rem',
            padding: '0px 4px 0px 12px',
            iconWidth: '1rem',
            iconHeight: '1rem',
            iconImageWidth: '0.6rem',
            iconImageHeight: '0.6rem',
            gap: '8px'
        }
    ];

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Sales Person"
                    subtitle="Manage sales persons and their profile"
                    infoMessage="This page allows you to add, edit, and manage all your sales persons and their permissions."
                />

                <Button
                    text={"Add New Sales Person"}
                    onClick={handleAddNewSalesPerson}
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

            <div className="flex-1 min-h-0">
                <Table
                    headers={tableHeaders}
                    data={mockSalesPersons}
                    headerFontSize="0.8rem"
                    bodyFontSize="0.675rem"
                    paginationInfo={paginationInfo}
                    footerButtons={footerButtons}
                />
            </div>
        </main>
    );
};

export default SalesPersonPage;