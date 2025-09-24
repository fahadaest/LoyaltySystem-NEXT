import React from 'react';
import { Plus, FileX, Users, Package, Settings, CreditCard, Award } from 'lucide-react';
import Button from '@/components/buttons/Button';

const NoDataComponent = ({
    type = 'general',
    title,
    subtitle,
    buttonText,
    onButtonClick,
    icon: CustomIcon,
    showButton = true
}) => {
    const configs = {
        admins: {
            icon: Users,
            title: 'No Admins Found',
            subtitle: 'Get started by creating your first admin account to manage your system.',
            buttonText: 'Create New Admin',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        products: {
            icon: Package,
            title: 'No Products Found',
            subtitle: 'Start building your catalog by adding your first product.',
            buttonText: 'Add New Product',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        subscriptions: {
            icon: CreditCard,
            title: 'No Subscriptions Found',
            subtitle: 'Create subscription plans to start managing your services.',
            buttonText: 'Create Subscription',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        users: {
            icon: Users,
            title: 'No Users Found',
            subtitle: 'Your user list is empty. Users will appear here once they join.',
            buttonText: 'Invite Users',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        settings: {
            icon: Settings,
            title: 'No Configuration Found',
            subtitle: 'Set up your system configuration to get started.',
            buttonText: 'Configure Settings',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        general: {
            icon: FileX,
            title: 'No Data Found',
            subtitle: 'There is no data available at the moment.',
            buttonText: 'Add New Item',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
        pointloyalty: {
            icon: Award,
            title: 'No Point Loyalty Programs Found',
            subtitle: 'Start rewarding your customers! Create your first point-based loyalty program to encourage repeat purchases.',
            buttonText: 'Add New Loyalty',
            iconColor: 'text-black',
            bgColor: 'bg-gray-200'
        },
    };

    const config = configs[type] || configs.general;
    const IconComponent = CustomIcon || config.icon;
    const displayTitle = title || config.title;
    const displaySubtitle = subtitle || config.subtitle;
    const displayButtonText = buttonText || config.buttonText;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-8">
            {/* Icon Background */}
            <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mb-6`}>
                <IconComponent className={`w-12 h-12 ${config.iconColor}`} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {displayTitle}
            </h3>

            {/* Subtitle */}
            <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
                {displaySubtitle}
            </p>

            {/* Action Button */}
            {showButton && onButtonClick && (
                <Button
                    text={displayButtonText}
                    onClick={onButtonClick}
                    backgroundColor={'#000000'}
                    textColor={'#FFFFFF'}
                    icon={"/img/general/plus_black.svg"}
                    showIcon={true}
                    iconPosition={'right'}
                    disabled={false}
                    height={'2.5rem'}
                    fontSize={'0.7rem'}
                    padding={'0px 6px 0px 16px'}
                    iconWidth={'1.5rem'}
                    iconHeight={'1.5rem'}
                    iconImageWidth={'1rem'}
                    iconImageHeight={'1rem'}
                    gap={'12px'}
                    borderRadius={'2rem'}
                />
            )}
        </div>
    );
};

export default NoDataComponent;