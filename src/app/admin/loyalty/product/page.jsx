'use client';
import ProductCard from 'components/card/ProductCard';
import CustomModal from 'components/modal/CustomModal';
import { useDisclosure } from '@chakra-ui/react';
import AddProductForm from 'components/form/AddProductForm';
import ProductLoyaltyCard from 'components/card/ProductLoyaltyCard';
import AddLoyalty from 'components/form/AddLoyalty';
import Image from 'next/image';
import Button from 'components/button/Button';
import { MdCircle, MdEdit, MdDelete, MdAdd } from "react-icons/md";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      <div className="col-span-1 h-fit w-full">

        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
            Manage Product-Based Loyalties Reward
          </h4>
          <Button
            icon={MdAdd}
            text="Add New Loyalty"
            size="md"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            onClick={onOpen}
          />
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

      <CustomModal isOpen={isOpen} onClose={onClose} title="Reward Information" size="3xl">
        <AddLoyalty onClose={onClose} />
      </CustomModal>
    </div>
  );
};

export default Dashboard;