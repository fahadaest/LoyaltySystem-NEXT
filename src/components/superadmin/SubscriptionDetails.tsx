'use client';

import React from 'react';
import { Subscription } from 'utils/types';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

// Reusable components
const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-base font-semibold text-gray-800 dark:text-gray-200">{value}</p>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const baseClasses = 'px-3 py-1 text-xs font-medium tracking-wider rounded-full';
    const statusClasses: Record<string, string> = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800',
    };
    const Icon: Record<string, JSX.Element> = {
        active: <CheckCircle className="mr-1 h-3 w-3" />,
        inactive: <XCircle className="mr-1 h-3 w-3" />,
        pending: <Clock className="mr-1 h-3 w-3" />,
        cancelled: <XCircle className="mr-1 h-3 w-3" />,
    };

    const key = status.toLowerCase();
    return (
        <span className={`${baseClasses} ${statusClasses[key] || ''} inline-flex items-center`}>
            {Icon[key] || null}
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
};

type Props = {
    subscription: Subscription;
};

const SubscriptionDetails: React.FC<Props> = ({ subscription }) => {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-navy-800">
            <div className="p-6">
                <div className="flex flex-col justify-between md:flex-row">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{subscription.name}</h1>
                    <StatusBadge status={subscription.status} />
                </div>
                <p className="mt-1 text-sm text-gray-500">Subscription ID: {subscription.id}</p>
            </div>

            <div className="border-t border-gray-200 p-6 dark:border-navy-700">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2">
                    <DetailItem label="Plan Name" value={subscription.name} />
                    <DetailItem
                        label="Price"
                        value={`$${subscription.price} / ${subscription.billingCycle}`}
                    />
                    <DetailItem label="Description" value={subscription.description || '-'} />
                    <DetailItem
                        label="Start Date"
                        value={new Date(subscription.createdAt).toLocaleDateString()}
                    />
                    <DetailItem
                        label="Last Updated"
                        value={new Date(subscription.updatedAt).toLocaleDateString()}
                    />
                </dl>
            </div>
        </div>
    );
};

export default SubscriptionDetails;