'use client';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import HeadingCard from 'components/card/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { MdAdd } from "react-icons/md";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="relative">
      <div className="mt-3 mb-5">
        <HeadingCard subtitle="Manage Products">
          <HeaderButton
            icon={MdAdd}
            text="Add Product"
            size="lg"
            color="bg-brandGreen"
            onClick={onOpen}
          />
        </HeadingCard>
      </div>

      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-20">
          {Array.from({ length: 10 }).map((_, index) => (
            <ProductCard
              key={index}
              title="Latte Coffee"
              price="Large"
              image="/img/coffee/latte.png"
              extra="any-additional-classes"
            />
          ))}
        </div>
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="xl">
        <AddProductForm />
      </CustomModal>
    </div>
  );
};

export default Dashboard;