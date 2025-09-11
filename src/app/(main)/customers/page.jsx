"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";

const CustomersPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10);

    const mockCustomers = [
        {
            id: 1,
            name: "Omar Khalid",
            email: "omar.khalid@example.com",
            phone: "+971 50 123 4501",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 2,
            name: "Sara Al Mansouri",
            email: "sara.almansouri@example.com",
            phone: "+971 50 123 4502",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 3,
            name: "Faisal Rahman",
            email: "faisal.rahman@example.com",
            phone: "+971 50 123 4503",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 4,
            name: "Layla Haddad",
            email: "layla.haddad@example.com",
            phone: "+971 50 123 4504",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 5,
            name: "Ahmed Al Farsi",
            email: "ahmed.alfarsi@example.com",
            phone: "+971 50 123 4505",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 6,
            name: "Noor Al Zahra",
            email: "noor.alzahra@example.com",
            phone: "+971 50 123 4506",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 7,
            name: "Zayed Hassan",
            email: "zayed.hassan@example.com",
            phone: "+971 50 123 4507",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 8,
            name: "Mariam Yusuf",
            email: "mariam.yusuf@example.com",
            phone: "+971 50 123 4508",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 9,
            name: "Khalifa Saeed",
            email: "khalifa.saeed@example.com",
            phone: "+971 50 123 4509",
            createdAt: "2025-08-09 (11:50AM)"
        },
        {
            id: 10,
            name: "Hana Al Qasimi",
            email: "hana.alqasimi@example.com",
            phone: "+971 50 123 4510",
            createdAt: "2025-08-09 (11:50AM)"
        }
    ];

    const tableHeaders = [
        {
            label: "Name",
            key: "name",
            className: "flex-[1.5]",
            align: "left"
        },
        {
            label: "Email",
            key: "email",
            className: "flex-[2.5]",
            align: "left"
        },
        {
            label: "Phone Number",
            key: "phone",
            className: "flex-[1.8]",
            align: "left"
        },
        {
            label: "Created At",
            key: "createdAt",
            className: "flex-[1.5]",
            align: "left"
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1]",
            align: "center",
            render: (item) => (
                <div className="flex items-center justify-center">
                    <Button
                        text={"Details"}
                        onClick={null}
                        backgroundColor={'#EDEDED'}
                        textColor={'#000000'}
                        icon={"/img/general/detail_eye.svg"}
                        showIcon={true}
                        iconPosition={'right'}
                        disabled={false}
                        height={'2rem'}
                        fontSize={'0.7rem'}
                        padding={'0px 4px 0px 12px'}
                        iconBackgroundColor={'#000000'}
                        iconWidth={'1.4rem'}
                        iconHeight={'1.4rem'}
                        iconImageWidth={'1rem'}
                        iconImageHeight={'1rem'}
                        gap={'12px'}
                    />
                </div>
            )
        }
    ];

    const handleRowAction = (row) => {
        console.log("Details clicked for:", row);
        // Handle the details action here
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
            icon: "/img/general/arrow_left_white.svg", // Changed to a more appropriate icon
            showIcon: true,
            iconPosition: 'left',
            // disabled: currentPage === 1,
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
            icon: "/img/general/arrow_right_black.svg", // Changed to a more appropriate icon
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
            <div className="flex items-start justify-between flex-shrink-0 ">
                <ComponentHeader
                    title="Customers"
                    subtitle="View customer list"
                    infoMessage="This page allows you to add, edit, and manage all your customers. Use the Filter button to refine your search."
                />

                <Button
                    text={"Filter"}
                    onClick={null}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/filter.svg"}
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
                    data={mockCustomers}
                    headerFontSize="0.8rem"
                    bodyFontSize="0.675rem"
                    paginationInfo={paginationInfo}
                    footerButtons={footerButtons}
                />
            </div>
        </main>
    );
};

export default CustomersPage;