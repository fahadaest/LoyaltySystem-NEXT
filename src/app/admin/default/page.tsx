'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import CustomerAnalytics from 'components/admin/default/CustomerAnalytics';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard } from 'react-icons/md';
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

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Loyalty Points Today'}
          subtitle={'1200 Points'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'Total Earnings'}
          subtitle={'$1,250.75'}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={'Points Redeemed This Month'}
          subtitle={'$380.00'}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={'New Referrals'}
          subtitle={'25'}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={'Your Reward Balance'}
          subtitle={'$500'}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={'Total Users'}
          subtitle={'2,340'}
        />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 ">
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
      </div>

    </div>
  );
};

export default Dashboard;
