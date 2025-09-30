import React, { useState, useMemo } from 'react';
import DropdownButton from '../input-fields/DropDownButton';
import AreaChart from '../ui/AreaGraph';
import Button from '../buttons/Button';
import { useGetCustomerGrowthQuery } from '@/store/slices/dashboardApis';

const CustomerAnalytics = () => {
    const [filter, setFilter] = useState('week');
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
    const [customerType, setCustomerType] = useState({
        isAllCustomers: true,
        isPointCustomers: false,
        isProductCustomers: false
    });

    const queryParams = useMemo(() => {
        const params = {
            filter,
            isAllCustomers: customerType.isAllCustomers,
            isPointCustomers: customerType.isPointCustomers,
            isProductCustomers: customerType.isProductCustomers
        };

        if (dateRange.startDate) {
            params.startDate = dateRange.startDate;
        }
        if (dateRange.endDate) {
            params.endDate = dateRange.endDate;
        }

        return params;
    }, [filter, customerType, dateRange]);

    const { data: growthData, isLoading, error } = useGetCustomerGrowthQuery(queryParams);

    const chartData = useMemo(() => {
        if (!growthData?.pointCustomers || !growthData?.productCustomers) {
            return [];
        }

        const pointData = growthData.pointCustomers;
        const productData = growthData.productCustomers;

        return pointData.labels.map((label, index) => {
            const pointValue = pointData.data[index] || 0;
            const productValue = productData.data[index] || 0;
            const totalValue = pointValue + productValue;

            return {
                month: label.toString(),
                allCustomers: totalValue,
                pointCustomers: pointValue,
                productCustomers: productValue
            };
        });
    }, [growthData]);

    const totals = useMemo(() => {
        if (!growthData?.pointCustomers || !growthData?.productCustomers) {
            return {
                totalCustomers: 0,
                pointCustomers: 0,
                productCustomers: 0
            };
        }

        const pointTotal = growthData.pointCustomers.data.reduce((sum, val) => sum + val, 0);
        const productTotal = growthData.productCustomers.data.reduce((sum, val) => sum + val, 0);

        return {
            totalCustomers: pointTotal + productTotal,
            pointCustomers: pointTotal,
            productCustomers: productTotal
        };
    }, [growthData]);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter.toLowerCase());
        setDateRange({ startDate: null, endDate: null });
    };

    const handleViewChange = (viewType) => {
        if (viewType === 'all') {
            setCustomerType({
                isAllCustomers: true,
                isPointCustomers: false,
                isProductCustomers: false
            });
        } else if (viewType === 'points') {
            setCustomerType({
                isAllCustomers: false,
                isPointCustomers: true,
                isProductCustomers: false
            });
        } else if (viewType === 'products') {
            setCustomerType({
                isAllCustomers: false,
                isPointCustomers: false,
                isProductCustomers: true
            });
        }
    };

    const handleExport = () => {
        console.log('Exporting data...', chartData);
    };

    const maxChartValue = useMemo(() => {
        if (chartData.length === 0) return 500;
        const maxCustomers = Math.max(...chartData.map(d => d.allCustomers));
        return maxCustomers > 0 ? Math.ceil(maxCustomers * 1.2) : 10;
    }, [chartData]);

    return (
        <div className="w-full mx-auto mt-3 ">
            <div
                className="relative bg-[#FCFCFC] border border-gray-200 rounded-3xl p-4 w-full"
                style={{
                    minHeight: '450px',
                    border: '1px solid #E2E2E2',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.02)',
                    borderRadius: '30px'
                }}
            >
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
                                fontSize: '9px',
                                fontWeight: '500',
                                lineHeight: '130%',
                                color: '#636363'
                            }}
                        >
                            Track Customer engagement across loyalty programs
                        </p>
                    </div>

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
                            onClick={() => handleViewChange('all')}
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
                            onClick={() => console.log('Filter clicked')}
                        />

                        <DropdownButton
                            fontSize="10px"
                            iconWidth='12px'
                            iconHeight='12px'
                            circleWidth='16px'
                            circleHeight='16px'
                            paddingLeft='10px'
                            paddingRight='5px'
                            text={filter.charAt(0).toUpperCase() + filter.slice(1)}
                            backgroundColor="black"
                            textColor="white"
                            circleColor="white"
                            iconColor="black"
                            onClick={() => {
                                const filters = ['week', 'month', 'year'];
                                const currentIndex = filters.indexOf(filter);
                                const nextFilter = filters[(currentIndex + 1) % filters.length];
                                handleFilterChange(nextFilter);
                            }}
                        />

                        <Button
                            text="Export"
                            fontSize='10px'
                            textColor="black"
                            backgroundColor="#FFFFFF"
                            height="auto"
                            border="1px solid black"
                            onClick={handleExport}
                        />
                    </div>
                </div>

                {isLoading && (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-gray-500">Loading analytics...</p>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-red-500">Error loading data. Please try again.</p>
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
                            <div className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full pl-6"
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
                                        fontSize: '10px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Total Customers
                                </span>
                                <div
                                    className="bg-brandColor text-white rounded-xl text-base font-medium flex-shrink-0 flex items-center justify-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {totals.totalCustomers}
                                </div>
                            </div>

                            <div
                                className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full pl-6"
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
                                        fontSize: '10px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Point Loyalty Customers
                                </span>
                                <div
                                    className="bg-gray-400 text-white rounded-xl text-base font-medium flex-shrink-0 flex items-center justify-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {totals.pointCustomers}
                                </div>
                            </div>

                            <div
                                className="bg-gray-100 rounded-2xl p-3 flex items-center space-x-3 w-full pl-6"
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
                                        fontSize: '10px',
                                        fontWeight: '600'
                                    }}
                                >
                                    Product Loyalty Customers
                                </span>
                                <div
                                    className="bg-black text-white rounded-xl text-base font-medium flex-shrink-0 flex items-center justify-center"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        fontFamily: 'Poppins, sans-serif',
                                        fontSize: '16px',
                                        fontWeight: '500'
                                    }}
                                >
                                    {totals.productCustomers}
                                </div>
                            </div>
                        </div>

                        {chartData.length > 0 ? (
                            <AreaChart
                                data={chartData}
                                width="100%"
                                height={280}
                                maxValue={maxChartValue}
                                chartHeight={180}
                                showGrid={true}
                                showXAxisLabels={true}
                                showYAxisLabels={true}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-64 bg-white rounded-3xl">
                                <p className="text-gray-500">No data available for the selected period</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CustomerAnalytics;