'use client';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import ProductLoyaltyCard from 'components/card/ProductLoyaltyCard';
import AddLoyalty from 'components/form/AddLoyalty';
import Image from 'next/image';


const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">

        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Manage Product-Based Loyalties Reward
          </h4>
          <button onClick={onOpen} className="inline-flex bg-brandGreen hover:bg-brandGreenDark text-white font-medium py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-lg group/edit relative overflow-hidden whitespace-nowrap" aria-label="Edit product"  >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/edit:translate-y-0 transition-transform duration-300 rounded-xl" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Add New Reward</span>
            </div>
          </button>
        </div>

        <div className="z-20 grid grid-cols-1 gap-5">
          <ProductLoyaltyCard
            rewardTitle="Get 2 free"
            rewardDescription="Buy 4 get 2 free, Limited time offer, Avail Now!"
            product="Latte"
            purchaseQuantity="4"
            title="Latte"
            author="Small"
            price="0.91"
            image="/img/coffee/latte.png"
          />
          <ProductLoyaltyCard
            rewardTitle="Get 2 free"
            rewardDescription="Buy 4 get 2 free, Limited time offer, Avail Now!"
            product="Latte"
            purchaseQuantity="4"
            title="Latte"
            author="Small"
            price="0.91"
            image="/img/coffee/latte.png"
          />
          <ProductLoyaltyCard
            rewardTitle="Get 2 free"
            rewardDescription="Buy 4 get 2 free, Limited time offer, Avail Now!"
            product="Latte"
            purchaseQuantity="4"
            title="Latte"
            author="Small"
            price="0.91"
            image="/img/coffee/latte.png"
          />
          <ProductLoyaltyCard
            rewardTitle="Get 2 free"
            rewardDescription="Buy 4 get 2 free, Limited time offer, Avail Now!"
            product="Latte"
            purchaseQuantity="4"
            title="Latte"
            author="Small"
            price="0.91"
            image="/img/coffee/latte.png"
          />
          <ProductLoyaltyCard
            rewardTitle="Get 2 free"
            rewardDescription="Buy 4 get 2 free, Limited time offer, Avail Now!"
            product="Latte"
            purchaseQuantity="4"
            title="Latte"
            author="Small"
            price="0.91"
            image="/img/coffee/latte.png"
          />
        </div>
      </div>

      <CustomModal isOpen={isOpen} onClose={onClose} title="Reward Information" size="4xl">
        <AddLoyalty />
      </CustomModal>
    </div>
  );
};

export default Dashboard;