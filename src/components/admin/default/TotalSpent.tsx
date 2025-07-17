import { MdArrowDropUp, MdOutlineCalendarToday, MdBarChart, MdDateRange } from "react-icons/md";
import Card from "components/card";
import { useState, useMemo } from "react";
import {
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import { useGetGrowthAnalyticsQuery } from "store/apiEndPoints/dashboardApi";

const TotalSpent = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'week' | 'month' | 'year' | 'custom'>('week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '2024-07-01',
    endDate: '2025-07-16'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const apiParams = useMemo(() => {
    if (selectedTimeFrame === 'custom') {
      return {
        isAllCustomers: true,
        startDate: customDateRange.startDate,
        endDate: customDateRange.endDate
      };
    } else {
      return {
        isAllCustomers: true,
        filter: selectedTimeFrame as 'week' | 'month' | 'year'
      };
    }
  }, [selectedTimeFrame, customDateRange]);

  const { data: customersData, isLoading, error } = useGetGrowthAnalyticsQuery(apiParams);

  console.log("customersData", customersData)

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleTimeFrameChange = (timeFrame: 'week' | 'month' | 'year' | 'custom') => {
    setSelectedTimeFrame(timeFrame);
    setDropdownOpen(false);
    if (timeFrame === 'custom') {
      setShowDatePicker(true);
    }
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setCustomDateRange({ startDate, endDate });
    setShowDatePicker(false);
  };

  const getDisplayText = () => {
    if (selectedTimeFrame === 'custom') {
      return `${customDateRange.startDate} to ${customDateRange.endDate}`;
    }
    return selectedTimeFrame === 'month' ? 'This month' : selectedTimeFrame.charAt(0).toUpperCase() + selectedTimeFrame.slice(1);
  };

  const chartData = useMemo(() => {
    const allCustomersData = customersData?.pointCustomers?.data?.map((pointValue, index) => {
      const productValue = customersData?.productCustomers?.data?.[index] || 0;
      return pointValue + productValue;
    }) || [];

    return [
      {
        name: 'All Customers',
        data: allCustomersData,
        color: '#36a18f',
      },
      {
        name: 'Point Loyalty Customers',
        data: customersData?.pointCustomers?.data,
        color: '#c7eee8',
      },
      {
        name: 'Product Loyalty Customers',
        data: customersData?.productCustomers?.data,
        color: '#c7ee38',
      },
    ];
  }, [customersData]);

  const chartOptions = useMemo(() => {
    const getCategories = () => {
      switch (selectedTimeFrame) {
        case 'week':
          return ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
        case 'month':
          return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        case 'year':
          return ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
        case 'custom':
          return customersData?.categories || ['Start', 'Mid', 'End'];
        default:
          return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      }
    };

    return {
      ...lineChartOptionsTotalSpent,
      xaxis: {
        ...lineChartOptionsTotalSpent.xaxis,
        categories: getCategories(),
      },
    };
  }, [selectedTimeFrame, customersData]);

  // Calculate total amount and percentage change from API data
  const totalAmount = useMemo(() => {
    if (!customersData?.totalAmount) return '$0';

    // Format the amount (adjust based on your API response structure)
    const amount = customersData.totalAmount;
    return `$${(amount / 1000).toFixed(1)}K`;
  }, [customersData]);

  const percentageChange = useMemo(() => {
    if (!customersData?.percentageChange) return '+0%';

    const change = customersData.percentageChange;
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  }, [customersData]);

  const isPositiveChange = useMemo(() => {
    return customersData?.percentageChange >= 0;
  }, [customersData]);

  if (error) {
    return (
      <Card extra="!p-[20px] text-center">
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-red-500">Error loading analytics data</p>
        </div>
      </Card>
    );
  }

  return (
    <Card extra="!p-[20px] text-center">
      <div className="flex justify-between">
        <button
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80"
          onClick={handleDropdownToggle}
        >
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-600">
            {getDisplayText()}
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md text-gray-600 w-40 z-10">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTimeFrameChange('week')}
              >
                Week
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTimeFrameChange('month')}
              >
                Month
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleTimeFrameChange('year')}
              >
                Year
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-t"
                onClick={() => handleTimeFrameChange('custom')}
              >
                <div className="flex items-center gap-2">
                  <MdDateRange />
                  Custom Range
                </div>
              </li>
            </ul>
          </div>
        )}

        {/* Custom Date Range Picker */}
        {showDatePicker && (
          <div className="absolute mt-2 bg-white shadow-lg rounded-md p-4 text-gray-600 w-64 z-20">
            <h4 className="text-sm font-medium mb-3">Select Date Range</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={customDateRange.startDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={customDateRange.endDate}
                  onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleDateRangeChange(customDateRange.startDate, customDateRange.endDate)}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                >
                  Apply
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-xs hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brandGreen !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="flex h-[300px] w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
        <div className="flex flex-col">
          {isLoading ? (
            <div className="mt-[20px] h-12 w-24 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
              {totalAmount}
            </p>
          )}
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600">Total Spent</p>
            <div className="flex flex-row items-center justify-center">
              {isLoading ? (
                <div className="h-4 w-16 bg-gray-200 animate-pulse rounded mt-1"></div>
              ) : (
                <>
                  <MdArrowDropUp
                    className={`font-medium ${isPositiveChange ? 'text-green-500' : 'text-red-500 rotate-180'}`}
                  />
                  <p className={`text-sm font-bold ${isPositiveChange ? 'text-brandGreen' : 'text-red-500'}`}>
                    {percentageChange}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          {isLoading ? (
            <div className="h-full w-full bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <LineChart
              chartOptions={chartOptions}
              chartData={chartData}
            />
          )}
        </div>
      </div>
    </Card>
  );
};

export default TotalSpent;