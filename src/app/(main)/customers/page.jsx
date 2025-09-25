"use client";
import React, { useState } from "react";
import ComponentHeader from "@/components/ui/ComponentHeader";
import Button from "@/components/buttons/Button";
import Table from "@/components/ui/Table";
import NoDataComponent from "@/components/ui/NoDataComponent";
import { useGetAllCustomersQuery } from "@/store/slices/customerApis";

const CustomersPage = () => {
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState(10);

    // API call to get all customers
    const {
        data: customersResponse,
        error,
        isLoading,
        isFetching,
        refetch
    } = useGetAllCustomersQuery({
        search: searchTerm,
        limit: limit
    });

    // Extract customers data and handle loading/error states
    const customers = customersResponse?.data || [];
    const totalPages = Math.ceil((customersResponse?.total || 0) / limit);

    // Format customer data for table display
    const formattedCustomers = customers.map(customer => ({
        id: customer.id,
        name: customer.name || `${customer.firstName || ''} ${customer.lastName || ''}`.trim(),
        email: customer.email,
        phone: customer.phoneNumber,
        createdAt: customer.createdAt ? new Date(customer.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }) : 'N/A'
    }));

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
                        onClick={() => handleRowAction(item)}
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
        // Handle the details action here - you can navigate to customer detail page
        // Example: router.push(`/customers/${row.id}`);
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

    const handleFilter = () => {
        console.log("Filter clicked");
        // Implement filter functionality here
        // You could open a modal or sidebar with filter options
        refetch(); // Refetch data if needed
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
            disabled: currentPage === 1 || isLoading,
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
            disabled: currentPage === totalPages || isLoading,
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

    // Handle loading state
    if (isLoading) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Customers"
                        subtitle="View customer list"
                        infoMessage="This page allows you to add, edit, and manage all your customers. Use the Filter button to refine your search."
                    />
                    <Button
                        text={"Filter"}
                        onClick={handleFilter}
                        backgroundColor={'#000000'}
                        textColor={'#FFFFFF'}
                        icon={"/img/general/filter.svg"}
                        showIcon={true}
                        iconPosition={'right'}
                        disabled={true}
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
                <div className="flex-1 min-h-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading customers...</p>
                    </div>
                </div>
            </main>
        );
    }

    // Handle error state
    if (error) {
        return (
            <main className="h-[80vh] flex flex-col overflow-hidden">
                <div className="flex items-start justify-between flex-shrink-0">
                    <ComponentHeader
                        title="Customers"
                        subtitle="View customer list"
                        infoMessage="This page allows you to add, edit, and manage all your customers. Use the Filter button to refine your search."
                    />
                    <Button
                        text={"Filter"}
                        onClick={handleFilter}
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
                <div className="flex-1 min-h-0 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">Error loading customers</p>
                        <Button
                            text={"Retry"}
                            onClick={() => refetch()}
                            backgroundColor={'#000000'}
                            textColor={'#FFFFFF'}
                            height={'2rem'}
                            fontSize={'0.7rem'}
                            padding={'0px 12px'}
                        />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between flex-shrink-0">
                <ComponentHeader
                    title="Customers"
                    subtitle="View customer list"
                    infoMessage="This page allows you to add, edit, and manage all your customers. Use the Filter button to refine your search."
                />

                <Button
                    text={"Filter"}
                    onClick={handleFilter}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/filter.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={isFetching}
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
                {formattedCustomers.length > 0 ? (
                    <Table
                        headers={tableHeaders}
                        data={formattedCustomers}
                        headerFontSize="0.8rem"
                        bodyFontSize="0.675rem"
                        paginationInfo={paginationInfo}
                        footerButtons={footerButtons}
                    />
                ) : (
                    <NoDataComponent type="customers" showButton={false} />
                )}
            </div>
        </main>
    );
};

export default CustomersPage;