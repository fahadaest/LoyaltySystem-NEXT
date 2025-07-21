'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import CustomerAnalytics from 'components/admin/default/CustomerAnalytics';
import PieChartCard from 'components/admin/default/PieChartCard';
import { MdBarChart, MdDashboard, MdInventory, MdLoyalty, MdStars } from 'react-icons/md';
import { IoMdHome, IoMdPeople } from 'react-icons/io';
import { IoDocuments, IoCard, IoGift } from 'react-icons/io5';
import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';

const Dashboard = () => {


  return (
    <div>
      {/* <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 ">
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
      </div> */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 ">
        <CustomerAnalytics />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>

        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5">
        <WeeklyRevenue />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ComplexTable tableData={tableDataComplex} />
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div> */}

    </div>
  );
};

export default Dashboard;
