'use client';
import React, { useState, useEffect } from 'react';
import { MdAdd } from "react-icons/md";
import HeadingCard from 'components/header/HeadingCard';
import HeaderButton from 'components/button/HeaderButton';
import { FaGift } from "react-icons/fa";
import CreateLoyaltyComponent from 'components/create-loyalty-components/create-loyalty';
import AddLoyaltyForm from 'components/create-loyalty-components/add-loyalty-form';
import BannerEditor from 'components/create-loyalty-components/loyalty-banner-component';
import { initialProductFormData, initialPointFormData } from 'utils/rewardFormData';

const CreateLoyalty = () => {
  const [loyaltyType, setLoyaltyType] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (loyaltyType === 'points') {
      setFormData(initialPointFormData);
    } else if (loyaltyType === 'products') {
      setFormData(initialProductFormData);
    } else {
      setFormData({});
    }
  }, [loyaltyType]);

  return (
    < div className="mt-3 grid h-full grid-cols-1 gap-5" >
      <div className="col-span-1 h-fit w-full">

        <div className="mt-3 mb-5">
          <HeadingCard
            icon={<FaGift className="text-brandGreen text-3xl" />}
            title="Create Loyalty"
            subtitle="Create New Loyalties Reward"
          >
          </HeadingCard>
        </div>

        {loyaltyType === '' && (
          <div className="">
            <CreateLoyaltyComponent
              loyaltyType={loyaltyType}
              setLoyaltyType={setLoyaltyType}
            />
          </div>
        )}

        {loyaltyType !== '' && (
          <div className="">
            <AddLoyaltyForm
              loyaltyType={loyaltyType}
              formData={formData}
              setFormData={setFormData}
            />
          </div>
        )}

      </div>
    </div >
  );
};

export default CreateLoyalty;