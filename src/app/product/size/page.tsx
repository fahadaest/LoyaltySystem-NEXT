'use client';
import ProductSizeTable from 'components/admin/default/ProductSizeTable';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductSizeComponent from 'components/form/AddProductSize';

type RowObj = {
  status: string;
};

const tableDataComplex: RowObj[] = [
  {
    status: 'Small',
  },
  {
    status: 'Medium',
  },
  {
    status: 'Large',
  },
  {
    status: 'Extra Large',
  },
  {
    status: 'Small',
  },
  {
    status: 'Medium',
  },
  {
    status: 'Large',
  },
  {
    status: 'Extra Large',
  },
  {
    status: 'Small',
  },
  {
    status: 'Medium',
  },
  {
    status: 'Large',
  },
  {
    status: 'Extra Large',
  },
];

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      <div className="mt-5 grid grid-cols-1 gap-5">
        <ProductSizeTable tableData={tableDataComplex} onAddClick={onOpen} />
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="4xl">
        <AddProductSizeComponent />
      </CustomModal>
    </div>
  );
};

export default Dashboard;