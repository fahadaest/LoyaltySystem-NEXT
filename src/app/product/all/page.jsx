'use client';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import Button from 'components/button/Button';
import { MdAdd, MdFilterList } from "react-icons/md";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mt-3 h-full px-4 py-5 bg-white rounded-3xl shadow-lg shadow-green-400/30">
      <div className=" mb-6 flex flex-col justify-between px-4 py-3 md:flex-row md:items-center rounded-lg">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Manage Products
        </h4>
        <div className="flex gap-2">
          {/* <Button
            icon={MdFilterList}
            text="Filter"
            size="sm"
            color="bg-brandGreen"
            onClick={""}
          /> */}
          <Button
            icon={MdAdd}
            text="Add Product"
            size="sm"
            color="bg-brandGreen"
            onClick={onOpen}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 z-20">

        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />
        <ProductCard
          title="Latte Coffee"
          price="Large"
          image="/img/coffee/latte.png"
          extra="any-additional-classes"
        />

      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Add Product" size="xl">
        <AddProductForm />
      </CustomModal>
    </div>
  );
};

export default Dashboard;