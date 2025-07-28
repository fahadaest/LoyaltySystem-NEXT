'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/dashboard/WeeklyRevenue';
import CustomerAnalytics from 'components/admin/dashboard/CustomerAnalytics';
import PieChartCard from 'components/admin/dashboard/PieChartCard';
import { MdBarChart, MdDashboard, MdInventory, MdLoyalty, MdStars } from 'react-icons/md';
import { IoMdHome, IoMdPeople } from 'react-icons/io';
import { IoDocuments, IoCard, IoGift } from 'react-icons/io5';
import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/dashboard/CheckTable';
import ComplexTable from 'components/admin/dashboard/ComplexTable';
import DailyTraffic from 'components/admin/dashboard/DailyTraffic';
import TaskCard from 'components/admin/dashboard/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';
import { useGetWidgetDataQuery } from 'store/apiEndPoints/dashboardApi';
import RewardsReport from 'components/admin/dashboard/RewardsReport';
import TopProductsTable from 'components/admin/dashboard/TopProductsTable';

const Dashboard = () => {
  const { data: widgetsData, isLoading, error } = useGetWidgetDataQuery({});

  console.log("tableDataComplex", tableDataComplex)

  if (isLoading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading dashboard data</div>;
  }

  const data = widgetsData?.data;

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 ">
        <Widget
          icon={<IoMdPeople className="h-5 w-5" />}
          title={'Total Customers'}
          subtitle={data?.totalCustomers || '0'}
        />
        <Widget
          icon={<MdInventory className="h-5 w-5" />}
          title={'Total Products'}
          subtitle={data?.totalProducts || '0'}
        />
        <Widget
          icon={<MdLoyalty className="h-5 w-5" />}
          title={'Loyalty Programs'}
          subtitle={data?.totalLoyaltyPrograms || '0'}
        />
        <Widget
          icon={<IoCard className="h-5 w-5" />}
          title={'Custom Wallet Cards'}
          subtitle={data?.totalCustomWalletCards || '0'}
        />
        <Widget
          icon={<IoGift className="h-5 w-5" />}
          title={'Product Loyalties'}
          subtitle={data?.breakdown?.productLoyalties || '0'}
        />
        <Widget
          icon={<MdStars className="h-5 w-5" />}
          title={'Point Loyalties'}
          subtitle={data?.breakdown?.pointLoyalties || '0'}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 ">
        <CustomerAnalytics />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 ">
        <ComplexTable />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 ">
        <TopProductsTable />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-5 ">
        <RewardsReport />
      </div>

    </div>
  );
};

export default Dashboard;
