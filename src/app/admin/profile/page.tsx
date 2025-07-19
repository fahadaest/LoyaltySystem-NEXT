'use client';
import General from 'components/admin/profile/General';
import ProfileBanner from 'components/admin/profile/ProfileBanner';
import { useGetMyProfileQuery } from 'store/apiEndPoints/userApi';
import CustomModal from 'components/modal/CustomModal';
import { useState } from 'react';
import EditProfile from 'components/admin/profile/EditProfile';

const ProfileOverview = () => {
  const { data, error, isLoading } = useGetMyProfileQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-5 lg:gap-5">
      <div className="w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12">
        <div className="col-span-12">
          <ProfileBanner data={data} onEdit={openModal} />
        </div>
        <div className="col-span-12">
          <General data={data} />
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        headerTitle="Edit Profile"
        size="lg"
        handlePrint={undefined}
        showModalBackButton={undefined} handleClickBack={undefined} icon={undefined} headerDescription={undefined} showFooter={undefined} showFooterCancelButton={undefined} footerConfirmation={undefined} footerConfirmButtonIcon={undefined}     >
        <EditProfile data={data} onClose={closeModal} />
      </CustomModal>
    </div>
  );
};

export default ProfileOverview;