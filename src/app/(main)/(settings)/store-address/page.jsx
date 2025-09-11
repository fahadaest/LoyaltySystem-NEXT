"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";

const StoreAddressesPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages] = useState(10);

    const mockAddresses = [
        {
            id: 1,
            address: "123 Sheikh Zayed Road, Dubai, UAE"
        },
        {
            id: 2,
            address: "45 Corniche Street, Abu Dhabi, UAE"
        },
        {
            id: 3,
            address: "78 Al Majaz Area, Sharjah, UAE"
        },
        {
            id: 4,
            address: "22 Al Nuaimiya, Ajman, UAE"
        },
        {
            id: 5,
            address: "56 Al Hamra Village, Ras Al Khaimah, UAE"
        },
        {
            id: 6,
            address: "89 King Faisal Street, Fujairah, UAE"
        },
        {
            id: 7,
            address: "15 Al Qasba, Sharjah, UAE"
        },
        {
            id: 8,
            address: "67 Marina Walk, Dubai, UAE"
        },
        {
            id: 9,
            address: "34 Khalifa Street, Abu Dhabi, UAE"
        },
        {
            id: 10,
            address: "12 Al Wahda Street, Sharjah, UAE"
        }
    ];

    const tableHeaders = [
        {
            label: "Addresses",
            key: "address",
            className: "flex-[4]",
            align: "left"
        },
        {
            label: "Actions",
            key: "actions",
            className: "flex-[1]",
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

    const handleAddNewAddress = () => {
        console.log("Add new address clicked");
        // Handle add new address
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
                    title="Store Addresses"
                    subtitle="Add, edit, update or remove addresses"
                    infoMessage="This page allows you to add, edit, and manage all your store addresses."
                />

                <Button
                    text={"Add New Address"}
                    onClick={handleAddNewAddress}
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
                    data={mockAddresses}
                    headerFontSize="0.8rem"
                    bodyFontSize="0.675rem"
                    paginationInfo={paginationInfo}
                    footerButtons={footerButtons}
                />
            </div>
        </main>
    );
};

export default StoreAddressesPage;