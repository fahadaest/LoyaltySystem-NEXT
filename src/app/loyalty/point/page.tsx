'use client';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';
import PointLoyaltyTable from 'components/admin/default/PointLoyaltyTable';

type RowObj = {
  name: string;
  spendingAmount: number;
  rewardPoints: number;
};

const tableDataComplex: RowObj[] = [
  {
    name: "Buy 2 get 1 Free",
    spendingAmount: 500,
    rewardPoints: 600,
  },
  {
    name: "Holiday Special",
    spendingAmount: 1200,
    rewardPoints: 1500,
  },
  {
    name: "Summer Sale",
    spendingAmount: 300,
    rewardPoints: 350,
  },
  {
    name: "Clearance Discount",
    spendingAmount: 700,
    rewardPoints: 800,
  },
  {
    name: "New User Bonus",
    spendingAmount: 100,
    rewardPoints: 200,
  },
  {
    name: "Weekend Offer",
    spendingAmount: 450,
    rewardPoints: 500,
  },
  {
    name: "Black Friday Deal",
    spendingAmount: 2000,
    rewardPoints: 2500,
  },
  {
    name: "Loyalty Reward",
    spendingAmount: 900,
    rewardPoints: 1000,
  },
  {
    name: "Festive Cashback",
    spendingAmount: 600,
    rewardPoints: 700,
  },
  {
    name: "Referral Bonus",
    spendingAmount: 400,
    rewardPoints: 450,
  },
  {
    name: "Mid-Year Promo",
    spendingAmount: 800,
    rewardPoints: 850,
  },
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <PointLoyaltyTable tableData={tableDataComplex} onAddClick={onOpen} />
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="4xl">
        <AddProductSizeComponent />
      </CustomModal>
    </div>
  );
};

export default Dashboard;