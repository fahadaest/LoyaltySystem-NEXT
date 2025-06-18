'use client';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import Image from 'next/image';


const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mt-3 h-full px-4 py-5 bg-white rounded-3xl">
      <div className=" mb-6 flex flex-col justify-between px-4 py-3 md:flex-row md:items-center rounded-lg">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          Manage Products
        </h4>
        <div className="flex gap-2">
          <button className="inline-flex bg-brandGreen hover:bg-brandGreenDark text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg group/edit relative overflow-hidden whitespace-nowrap" aria-label="Edit product"  >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/edit:translate-y-0 transition-transform duration-300 rounded-xl" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Filter</span>
            </div>
          </button>

          <button onClick={onOpen} className="inline-flex bg-brandGreen hover:bg-brandGreenDark text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg group/edit relative overflow-hidden whitespace-nowrap" aria-label="Edit product"  >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/edit:translate-y-0 transition-transform duration-300 rounded-xl" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Add Product</span>
            </div>
          </button>
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