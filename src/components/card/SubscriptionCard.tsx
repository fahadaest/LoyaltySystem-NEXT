import React from 'react';
import { Subscription } from 'utils/types';
import Button from 'components/button/Button';
import { MdEdit, MdDelete, MdInfoOutline } from 'react-icons/md';
import Card from 'components/card';

type SubscriptionCardProps = {
  subscription: Subscription;
  onEdit: () => void;
  onDelete: () => void;
  onView: () => void;
  extra?: string;
};

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  subscription,
  onEdit,
  onDelete,
  onView,
  extra,
}) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    }
  };

  return (
    <Card extra={`flex flex-col w-full !p-0 bg-white shadow-lg transition-transform duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden ${extra}`} >
      <div className="flex h-fit w-full items-center justify-center rounded-t-2xl bg-lightPrimary p-3 dark:!bg-navy-700">
        <p className="text-xl font-bold text-navy-700 dark:text-white">
          {subscription.name}
        </p>
      </div>
      <div className="flex w-full flex-col items-center px-4 pb-4">
        <h5 className="mb-2 mt-4 text-xl font-bold text-navy-700 dark:text-white">
          ${Number(subscription.price).toFixed(2)} / {subscription.billingCycle}
        </h5>
        <div className="mb-3 flex items-center justify-center">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusBadgeColor(
              subscription.status,
            )}`}
          >
            {subscription.status}
          </span>
        </div>
        <p className="mb-3 line-clamp-2 text-center text-sm font-normal text-gray-600 dark:text-white">
          {subscription.description || 'No description provided.'}
        </p>
        <div className="flex w-full items-center justify-center gap-2">
          <Button
            icon={MdInfoOutline}
            text="View"
            size="sm"
            color="bg-brandBlue"
            hoverColor="hover:bg-brandBlueDark"
            onClick={onView}
            extra="flex-1"
          />
          <Button
            icon={MdEdit}
            text="Edit"
            size="sm"
            color="bg-brandGreen"
            hoverColor="hover:bg-brandGreenDark"
            onClick={onEdit}
            extra="flex-1"
          />
          <Button
            icon={MdDelete}
            text="Delete"
            size="sm"
            color="bg-brandRed"
            hoverColor="hover:bg-red-700"
            onClick={onDelete}
            extra="flex-1"
          />
        </div>
      </div>
    </Card>
  );
};

export default SubscriptionCard;
