import { MdArrowDropUp, MdOutlineCalendarToday, MdBarChart, MdDateRange } from "react-icons/md";
import Card from "components/card";
import { useState, useMemo } from "react";
import {
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import { useGetGrowthAnalyticsQuery } from "store/apiEndPoints/dashboardApi";

const TotalSpent = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('week');
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
        filter: selectedTimeFrame as 'today' | 'week' | 'month' | 'year'
      };
    }
  }, [selectedTimeFrame, customDateRange]);

  const { data: customersData, isLoading, error } = useGetGrowthAnalyticsQuery(apiParams);

  console.log("customersData", customersData)

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleTimeFrameChange = (timeFrame: 'today' | 'week' | 'month' | 'year' | 'custom') => {
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
    return selectedTimeFrame === 'month' ? 'Last month' : selectedTimeFrame.charAt(0).toUpperCase() + selectedTimeFrame.slice(1);
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
        color: '#2563eb',
      },
      {
        name: 'Product Loyalty Customers',
        data: customersData?.productCustomers?.data,
        color: '#7c3aed',
      },
    ];
  }, [customersData]);

  console.log("selectedTimeFrame", selectedTimeFrame)

  const chartOptions = useMemo(() => {
    const getCategories = () => {
      switch (selectedTimeFrame) {
        case 'custom':
          return customersData?.pointCustomers?.labels || ['Start', 'Mid', 'End'];
        default:
          return customersData?.pointCustomers?.labels || [];
      }
    };

    const categories = getCategories();
    console.log('Chart categories:', categories); // Debug log

    return {
      ...lineChartOptionsTotalSpent,
      xaxis: {
        type: 'category',
        categories: categories,
        // Remove any other xaxis properties that might interfere
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
        },
      },
    };
  }, [selectedTimeFrame, customersData]);

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
      <div className="flex justify-between items-center mb-4">
        {/* Left side - Heading */}
        <div className="flex gap-5">

          <div className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brandGreen !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 w-12 h-12">
            <MdBarChart className="h-6 w-6" />
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl text-left font-bold text-navy-700 dark:text-white mb-3">
              Customer Analytics
            </h3>

            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-brandGreen"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">All Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Point Loyalty</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#7c3aed]"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Product Loyalty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Dropdown and Chart button */}
        <div className="flex items-center gap-2 relative">
          <button
            className="linear flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80"
            onClick={handleDropdownToggle}
          >
            <MdOutlineCalendarToday />
            <span className="text-sm font-medium text-gray-600">
              {getDisplayText()}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md text-gray-600 w-40 z-10">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTimeFrameChange('today')}
                >
                  Today
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTimeFrameChange('week')}
                >
                  Last Week
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTimeFrameChange('month')}
                >
                  Last Month
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleTimeFrameChange('year')}
                >
                  Last Year
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
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md p-4 text-gray-600 w-64 z-20">
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


        </div>
      </div>

      <div className="flex h-[300px] w-full flex-row justify-between sm:flex-wrap lg:flex-nowrap 2xl:overflow-hidden">
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