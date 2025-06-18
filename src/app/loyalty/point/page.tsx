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
    name: "Silver Tier",
    spendingAmount: 100,
    rewardPoints: 100,
  },
  {
    name: "Buy 2 get 1 Free",
    spendingAmount: 500,
    rewardPoints: 600,
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