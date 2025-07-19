import React from 'react';
import { CheckCircle, Clock, XCircle, User, Mail, Phone, Calendar, CreditCard, Shield, Target } from 'lucide-react';
import { getImageUrl } from 'utils/imageUtils';

const DetailItem = ({ label, value, icon: Icon }) => (
    <div className="bg-gray-50 dark:bg-navy-700 rounded-lg p-4">
        <div className="flex items-center mb-2">
            {Icon && <Icon className="h-4 w-4 text-gray-500 mr-2" />}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        </div>
        <p className="text-base font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
);

const StatusBadge = ({ status }) => {
    const baseClasses = 'px-3 py-1 text-xs font-medium tracking-wider rounded-full';
    const statusClasses = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    const Icon = {
        active: <CheckCircle className="mr-1 h-3 w-3" />,
        inactive: <XCircle className="mr-1 h-3 w-3" />,
        pending: <Clock className="mr-1 h-3 w-3" />,
        cancelled: <XCircle className="mr-1 h-3 w-3" />,
    };

    const key = status?.toLowerCase() || 'inactive';
    return (
        <span className={`${baseClasses} ${statusClasses[key] || statusClasses.inactive} inline-flex items-center`}>
            {Icon[key] || Icon.inactive}
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
        </span>
    );
};

const LoyaltyBadge = ({ type, active }) => {
    if (!active) return null;

    const badgeClasses = type === 'point'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClasses}`}>
            <Target className="mr-1 h-3 w-3" />
            {type === 'point' ? 'Point Based' : 'Product Based'}
        </span>
    );
};

const AdminDetail = ({ admin }) => {
    if (!admin) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500 dark:text-gray-400">No admin data available</p>
            </div>
        );
    }

    const subscription = admin.subscriptions?.[0];
    const userSubscription = subscription?.UserSubscription;
    const fullName = `${admin.firstName || ''} ${admin.lastName || ''}`.trim() || 'No Name';
    const profileImage = getImageUrl(admin.profileImage);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const initials = getInitials(fullName);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-navy-800 dark:to-navy-700 rounded-xl p-6">
                <div className="flex items-center space-x-4">
                    {/* Profile Image/Avatar */}
                    <div className="flex-shrink-0">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt={fullName}
                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div
                            className={`w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${profileImage ? 'hidden' : ''}`}
                        >
                            <span className="text-xl font-bold text-white">
                                {initials}
                            </span>
                        </div>
                    </div>

                    {/* Admin Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {fullName}
                                </h1>
                                <div className="flex items-center mt-1 space-x-2">
                                    <Shield className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                                        {admin.role || 'Admin'}
                                    </span>
                                </div>
                            </div>
                            <StatusBadge status={admin.status} />
                        </div>

                        {/* Loyalty Access Badges */}
                        <div className="flex flex-wrap gap-2 mt-3">
                            <LoyaltyBadge type="point" active={admin.pointBasedLoyalty} />
                            <LoyaltyBadge type="product" active={admin.productBasedLoyalty} />
                            {!admin.pointBasedLoyalty && !admin.productBasedLoyalty && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                    No Loyalty Access
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-600 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem
                        label="Email Address"
                        value={admin.email || 'Not provided'}
                        icon={Mail}
                    />
                    <DetailItem
                        label="Phone Number"
                        value={admin.phoneNumber || 'Not provided'}
                        icon={Phone}
                    />
                </div>
            </div>

            {/* Subscription Details */}
            {subscription && (
                <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-600 p-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <DetailItem
                            label="Plan Name"
                            value={subscription.name || 'Unknown Plan'}
                            icon={CreditCard}
                        />
                        <DetailItem
                            label="Price"
                            value={`$${subscription.price || '0'} / ${subscription.billingCycle || 'month'}`}
                            icon={CreditCard}
                        />
                        <DetailItem
                            label="Plan Status"
                            value={subscription.status ? subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1) : 'Unknown'}
                            icon={CheckCircle}
                        />
                        {userSubscription && (
                            <>
                                <DetailItem
                                    label="Subscription Start"
                                    value={new Date(userSubscription.startDate).toLocaleDateString()}
                                    icon={Calendar}
                                />
                                <DetailItem
                                    label="Subscription End"
                                    value={new Date(userSubscription.endDate).toLocaleDateString()}
                                    icon={Calendar}
                                />
                                <DetailItem
                                    label="Subscription Active"
                                    value={userSubscription.isActive ? 'Yes' : 'No'}
                                    icon={CheckCircle}
                                />
                            </>
                        )}
                    </div>
                    {subscription.description && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-navy-700 rounded-lg">
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                <strong>Description:</strong> {subscription.description}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Account Information */}
            <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-600 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailItem
                        label="Account Created"
                        value={new Date(admin.createdAt).toLocaleDateString()}
                        icon={Calendar}
                    />
                    <DetailItem
                        label="Last Updated"
                        value={new Date(admin.updatedAt).toLocaleDateString()}
                        icon={Calendar}
                    />
                    <DetailItem
                        label="Admin ID"
                        value={admin.id?.toString() || 'Not available'}
                        icon={User}
                    />
                    <DetailItem
                        label="Manager ID"
                        value={admin.managerId?.toString() || 'None assigned'}
                        icon={User}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminDetail;