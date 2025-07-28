import { MdArrowDropUp, MdOutlineCalendarToday, MdBarChart, MdDateRange } from "react-icons/md";
import { MdTrendingUp, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import Card from "components/card";
import { useState, useMemo } from "react";
import {
  lineChartOptionsTotalSpent,
} from "variables/charts";
import LineChart from "components/charts/LineChart";
import { useGetGrowthAnalyticsQuery } from "store/apiEndPoints/dashboardApi";
import AnimatedButton from "components/ui/AnimatedButton";

const CustomerAnalytics = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'today' | 'week' | 'month' | 'year' | 'custom'>('week');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '2024-07-01',
    endDate: '2025-07-16'
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [visibleLines, setVisibleLines] = useState({
    allCustomers: true,
    pointLoyalty: true,
    productLoyalty: true
  });

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
    setSelectedTimeFrame('custom');
    setShowDatePicker(false);
  };

  const toggleLine = (lineKey: string) => {
    setVisibleLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey]
    }));
  };

  const getDisplayText = () => {
    if (selectedTimeFrame === 'custom') {
      return `${customDateRange.startDate} to ${customDateRange.endDate}`;
    }
    return selectedTimeFrame === 'month' ? 'Last month' : selectedTimeFrame.charAt(0).toUpperCase() + selectedTimeFrame.slice(1);
  };

  // Get current values for metrics (always sum all data for the period)
  const getCurrentValues = () => {
    const pointData = customersData?.pointCustomers?.data || [];
    const productData = customersData?.productCustomers?.data || [];

    // Always calculate totals for the entire period regardless of timeframe
    const totalPointValue = pointData.reduce((sum, val) => sum + (val || 0), 0);
    const totalProductValue = productData.reduce((sum, val) => sum + (val || 0), 0);
    const totalAllCustomers = totalPointValue + totalProductValue;

    return {
      allCustomers: totalAllCustomers,
      pointLoyalty: totalPointValue,
      productLoyalty: totalProductValue
    };
  };

  const currentValues = getCurrentValues();

  const chartData = useMemo(() => {
    const allCustomersData = customersData?.pointCustomers?.data?.map((pointValue, index) => {
      const productValue = customersData?.productCustomers?.data?.[index] || 0;
      return pointValue + productValue;
    }) || [];

    const filteredData = [];

    if (visibleLines.allCustomers) {
      filteredData.push({
        name: 'All Customers',
        data: allCustomersData,
        color: '#10B981',
      });
    }

    if (visibleLines.pointLoyalty) {
      filteredData.push({
        name: 'Point Loyalty Customers',
        data: customersData?.pointCustomers?.data,
        color: '#3B82F6',
      });
    }

    if (visibleLines.productLoyalty) {
      filteredData.push({
        name: 'Product Loyalty Customers',
        data: customersData?.productCustomers?.data,
        color: '#8B5CF6',
      });
    }

    return filteredData;
  }, [customersData, visibleLines]);

  const chartOptions = useMemo(() => {
    const categories = customersData?.pointCustomers?.labels || [];

    return {
      ...lineChartOptionsTotalSpent,
      xaxis: {
        type: 'category',
        categories: categories,
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
      yaxis: {
        show: true,
        tickAmount: 6,
        labels: {
          show: true,
          style: {
            colors: "#A3AED0",
            fontSize: "12px",
            fontWeight: "500",
          },
          formatter: function (val: number) {
            return Math.round(val).toString();
          }
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      tooltip: {
        theme: 'light',
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
        },
        x: {
          show: true,
        },
        y: {
          formatter: function (val: number) {
            return val.toString();
          }
        },
        marker: {
          show: true,
        },
      },
      grid: {
        strokeDashArray: 3,
        borderColor: '#E5E7EB',
        yaxis: {
          lines: {
            show: true,
          }
        },
        xaxis: {
          lines: {
            show: false,
          }
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3,
      },
      markers: {
        size: 4,
        strokeWidth: 2,
        hover: {
          size: 6,
        }
      }
    };
  }, [customersData]);

  const metrics = [
    {
      key: 'allCustomers',
      label: 'All Customers',
      value: currentValues.allCustomers,
      color: '#10B981',
      icon: IoMdPeople
    },
    {
      key: 'pointLoyalty',
      label: 'Point Loyalty Customers',
      value: currentValues.pointLoyalty,
      color: '#3B82F6',
      icon: MdTrendingUp
    },
    {
      key: 'productLoyalty',
      label: 'Product Loyalty Customers',
      value: currentValues.productLoyalty,
      color: '#8B5CF6',
      icon: MdTrendingUp
    }
  ];

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
    <Card extra="!p-6 rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="p-2 bg-brandGreen/15 rounded-lg dark:bg-navy-700">
            <IoMdPeople className="w-6 h-6 text-brandGreen dark:text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">Customer Analytics</h1>
            <p className="text-gray-500 text-sm dark:text-gray-300">Track customer engagement across loyalty programs</p>
          </div>
        </div>

        {/* Time Period Selector */}
        <div className="flex items-center gap-2 relative">
          <MdOutlineCalendarToday onClick={() => setShowDatePicker(true)} className="w-4 h-4 text-brandGreen cursor-pointer hover:text-brandGreen/80 transition-colors" />
          <button
            className="linear flex items-center justify-center gap-2 rounded-lg bg-brandGreen/15 p-2 text-gray-600 transition duration-200 hover:cursor-pointer active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80 "
            onClick={handleDropdownToggle}
          >
            <span className="text-sm font-medium text-brandGreen dark:text-gray-300">
              {getDisplayText()}
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-navy-800 shadow-lg rounded-md text-gray-600 dark:text-gray-300 w-40 z-10 border border-gray-200 dark:border-navy-600">
              <ul>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-navy-700 cursor-pointer"
                  onClick={() => handleTimeFrameChange('today')}
                >
                  Today
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-navy-700 cursor-pointer"
                  onClick={() => handleTimeFrameChange('week')}
                >
                  Last Week
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-navy-700 cursor-pointer"
                  onClick={() => handleTimeFrameChange('month')}
                >
                  Last Month
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-navy-700 cursor-pointer"
                  onClick={() => handleTimeFrameChange('year')}
                >
                  Last Year
                </li>
              </ul>
            </div>
          )}

          {/* Custom Date Range Picker */}
          {showDatePicker && (
            <div className="absolute top-full right-0 mt-2 bg-white dark:bg-navy-800 shadow-lg rounded-md p-4 text-gray-600 dark:text-gray-300 w-64 z-20 border border-gray-200 dark:border-navy-600">
              <h4 className="text-sm font-medium mb-3">Select Date Range</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={customDateRange.startDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-navy-600 rounded text-sm bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={customDateRange.endDate}
                    onChange={(e) => setCustomDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 dark:border-navy-600 rounded text-sm bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <AnimatedButton
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowDatePicker(false)}
                    icon={null}
                  >
                    Cancel
                  </AnimatedButton>
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleDateRangeChange(customDateRange.startDate, customDateRange.endDate)}
                    icon={null}
                  >
                    Apply
                  </AnimatedButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isVisible = visibleLines[metric.key];

          return (
            <div
              key={metric.key}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${isVisible
                ? 'border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-800 shadow-sm'
                : 'border-gray-100 dark:border-navy-700 bg-gray-50 dark:bg-navy-900 opacity-60'
                }`}
              onClick={() => toggleLine(metric.key)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: metric.color }}
                  ></div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{metric.label}</span>
                </div>
                {isVisible ? (
                  <MdVisibility className="w-4 h-4 text-gray-400" />
                ) : (
                  <MdVisibilityOff className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-2xl font-bold text-navy-700 dark:text-white">{metric.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="bg-gray-50 dark:bg-navy-900 rounded-lg">
        <div className="h-[300px] w-full">
          {isLoading ? (
            <div className="h-full w-full bg-gray-200 dark:bg-navy-700 animate-pulse rounded"></div>
          ) : (
            <LineChart
              chartOptions={chartOptions}
              chartData={chartData}
            />
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click on metric cards to show/hide lines • Hover over chart points for detailed values
        </p>
      </div>
    </Card>
  );
};

export default CustomerAnalytics;