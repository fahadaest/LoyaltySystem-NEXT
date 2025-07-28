import React, { useState } from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdPerson, MdEmail, MdPhone, MdAttachMoney, MdStars, MdCardGiftcard, MdExpandMore, MdExpandLess, MdUnfoldMore } from "react-icons/md";
import { useGetTopCustomersQuery } from "store/apiEndPoints/dashboardApi";
import { IoMdPeople } from "react-icons/io";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface Customer {
  customerId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  spendingAmount: number;
  totalCollectedStamps: number;
  currentAvailableReward: number;
  totalRewardsEarned: number;
  loyaltyPrograms: Array<{
    type: "POINT" | "PRODUCT";
    loyaltyId: number;
  }>;
}

interface FilterState {
  filter: 'today' | 'week' | 'month' | 'year';
  customerType: 'all' | 'point' | 'product';
  limit: number;
}

const columnHelper = createColumnHelper<Customer>();

export default function TopCustomersTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<FilterState>({
    filter: 'month',
    customerType: 'all',
    limit: 10
  });

  // Build API parameters based on filter state
  const apiParams = {
    filter: filters.filter,
    limit: filters.limit,
    ...(filters.customerType === 'all' && { isAllCustomers: true }),
    ...(filters.customerType === 'point' && { isPointCustomers: true }),
    ...(filters.customerType === 'product' && { isProductCustomers: true }),
  };

  const { data, isLoading, error, refetch } = useGetTopCustomersQuery(apiParams);

  const customers: Customer[] = data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getLoyaltyBadges = (loyaltyPrograms: Customer['loyaltyPrograms']) => {
    const pointPrograms = loyaltyPrograms.filter(p => p.type === 'POINT').length;
    const productPrograms = loyaltyPrograms.filter(p => p.type === 'PRODUCT').length;

    return (
      <div className="flex gap-1">
        {pointPrograms > 0 && (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200">
            {pointPrograms} Point{pointPrograms > 1 ? 's' : ''}
          </span>
        )}
        {productPrograms > 0 && (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full dark:bg-green-900 dark:text-green-200">
            {productPrograms} Product{productPrograms > 1 ? 's' : ''}
          </span>
        )}
      </div>
    );
  };

  const getSortIcon = (column: any) => {
    const sortDirection = column.getIsSorted();
    if (sortDirection === 'asc') {
      return <MdExpandLess className="w-4 h-4 text-gray-500" />;
    } else if (sortDirection === 'desc') {
      return <MdExpandMore className="w-4 h-4 text-gray-500" />;
    } else {
      return <MdUnfoldMore className="w-4 h-4 text-gray-400 opacity-50" />;
    }
  };

  const columns = [
    columnHelper.accessor("customerName", {
      id: "customerName",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
          <MdPerson /> CUSTOMER
        </p>
      ),
      cell: (info) => (
        <div>
          <p className="text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MdEmail size={12} /> {info.row.original.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <MdPhone size={12} /> {info.row.original.phoneNumber}
          </p>
        </div>
      ),
    }),
    columnHelper.accessor("spendingAmount", {
      id: "spendingAmount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white flex items-center gap-2">
          <MdAttachMoney /> AMOUNT SPENT
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {formatCurrency(info.getValue())}
        </p>
      ),
    }),
    columnHelper.accessor("loyaltyPrograms", {
      id: "loyaltyPrograms",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PROGRAMS
        </p>
      ),
      cell: (info) => getLoyaltyBadges(info.getValue()),
    }),
  ];

  const table = useReactTable({
    data: customers,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (error) {
    return (
      <Card extra={"w-full h-full px-6 pb-6"}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400 mb-2">Failed to load customers</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>

      <div className="relative flex items-center justify-between pt-4">
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <div className="p-2 bg-brandGreen/15 rounded-lg dark:bg-navy-700 flex-shrink-0">
            <IoMdPeople className="w-6 h-6 text-brandGreen dark:text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white whitespace-nowrap">Top Customers</h1>
            <p className="text-gray-500 text-sm dark:text-gray-300 whitespace-nowrap">Track top customers</p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg ml-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Period:
            </label>
            <select
              value={filters.filter}
              onChange={(e) => handleFilterChange('filter', e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Customer Type:
            </label>
            <select
              value={filters.customerType}
              onChange={(e) => handleFilterChange('customerType', e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="all">All Customers</option>
              <option value="point">Point Customers</option>
              <option value="product">Product Customers</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Limit:
            </label>
            <select
              value={filters.limit}
              onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value={5}>Top 5</option>
              <option value={10}>Top 10</option>
              <option value={20}>Top 20</option>
              <option value={50}>Top 50</option>
            </select>
          </div>

          <button
            onClick={() => refetch()}
            className="px-4 py-1 bg-brandGreen text-white rounded-md text-sm hover:bg-brand-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
        </div>
      )}

      {/* Table Container with Fixed Height */}
      {!isLoading && (
        <div className="mt-8">
          {/* Fixed height container that shows ~5 rows + header */}
          <div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Sticky header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="!border-px !border-gray-400">
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            key={header.id}
                            colSpan={header.colSpan}
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 px-4 text-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center text-xs text-gray-200">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() && (
                                <div className="ml-2">
                                  {getSortIcon(header.column)}
                                </div>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  ))}
                </thead>
              </table>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto h-full">
              <table className="w-full">
                <tbody>
                  {table.getRowModel().rows.map((row, index) => {
                    return (
                      <tr
                        key={row.id}
                        className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <td
                              key={cell.id}
                              className="min-w-[150px] border-white/0 py-2 px-4"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty State within scrollable area */}
              {customers.length === 0 && (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <MdPerson className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      No customers found for the selected filters
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Summary */}
          {customers.length > 0 && (
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
              <span>Showing {customers.length} top customers</span>
              {customers.length > 5 && (
                <span className="text-blue-600 dark:text-blue-400">
                  Scroll to see more →
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}