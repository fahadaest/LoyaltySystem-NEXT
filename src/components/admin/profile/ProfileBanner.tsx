import Card from 'components/card';
import Image from 'next/image';
import { MdEdit } from 'react-icons/md';
import { getImageUrl } from 'utils/imageUtils';

const ProfileBanner = ({ data, onEdit }) => {
  const coverImg = getImageUrl(data?.coverImage);
  const profileImg = getImageUrl(data?.profileImage);

  return (
    <Card extra={'items-center w-full h-full p-[16px] bg-cover'}>
      <div className="absolute top-7 right-5 z-10">
        <button onClick={onEdit} className="p-2 bg-brandGreen text-white rounded-full shadow-md">
          <MdEdit size={24} />
        </button>
      </div>

      <div
        className="relative mt-1 flex h-40 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${coverImg})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-brandGreen dark:!border-navy-700">
          {profileImg ? (
            <Image
              width="87"
              height="87"
              className="h-full w-full rounded-full"
              src={profileImg}
              alt="Profile Avatar"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-2xl font-bold">
                {data?.firstName?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {data?.firstName} {data?.lastName || ''}
        </h4>
        <h5 className="text-base font-normal text-gray-600">{data?.role}</h5>
      </div>

      <div className="mb-3 w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center justify-center space-y-1">
          <h4 className="text-lg font-semibold text-navy-700 dark:text-white">
            {data?.email}
          </h4>
          <p className="text-sm font-normal text-gray-600">Email</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <h4 className="text-lg font-semibold text-navy-700 dark:text-white">
            {data?.phoneNumber}
          </h4>
          <p className="text-sm font-normal text-gray-600">Phone Number</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <h4 className="text-lg font-semibold text-navy-700 dark:text-white">
            {data?.role}
          </h4>
          <p className="text-sm font-normal text-gray-600">Role</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileBanner;