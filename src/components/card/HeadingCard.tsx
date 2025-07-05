import Card from "components/card";

interface HeadingCardProps {
    icon?: JSX.Element;
    title?: string;
    subtitle: string;
    children?: React.ReactNode;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    showBorder?: boolean;
    className?: string;
}

const HeadingCard = ({
    icon,
    title,
    subtitle,
    children,
    variant = 'default',
    size = 'md',
    showBorder = true,
    className = '',
}: HeadingCardProps) => {
    // Variant styles
    const variantStyles = {
        default: 'bg-white dark:bg-navy-800 border-gray-200 dark:border-navy-700',
        primary: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700',
        success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700',
        warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700',
        error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700',
    };

    // Size styles
    const sizeStyles = {
        sm: 'px-3 py-2 gap-3',
        md: 'px-4 py-3 gap-4 xs:px-5 xs:py-4',
        lg: 'px-5 py-4 gap-5 xs:px-6 xs:py-5',
    };

    // Icon container styles based on variant
    const iconContainerStyles = {
        default: 'text-gray-600 dark:text-gray-400',
        primary: 'text-blue-600 dark:text-blue-400',
        success: 'text-green-600 dark:text-green-400',
        warning: 'text-yellow-600 dark:text-yellow-500',
        error: 'text-red-600 dark:text-red-400',
    };

    // Text size based on size prop
    const textSizeStyles = {
        sm: 'text-sm xs:text-base',
        md: 'text-base xs:text-lg sm:text-xl',
        lg: 'text-lg xs:text-xl sm:text-2xl',
    };

    const iconSizeStyles = {
        sm: 'text-lg',
        md: 'text-xl xs:text-2xl',
        lg: 'text-2xl xs:text-3xl',
    };

    return (
        <Card
            extra={`
                !flex-row flex-grow items-center justify-between rounded-xl 
                transition-all duration-200 ease-in-out
                hover:shadow-lg 
                ${sizeStyles[size]}
                ${variantStyles[variant]}
                ${showBorder ? 'border' : 'border-0'}
                ${className}
            `}
        >
            <div className={`flex items-center gap-3 ${sizeStyles[size].split(' ').pop()}`}>
                {icon && (
                    <div className={`
                        ${iconSizeStyles[size]} 
                        ${iconContainerStyles[variant]}
                        flex items-center justify-center
                        transition-colors duration-200
                    `}>
                        {icon}
                    </div>
                )}

                <div className="flex flex-col">
                    {title && (
                        <h3 className={`
                            text-xs xs:text-sm font-medium 
                            text-gray-500 dark:text-gray-400 
                            mb-1 uppercase tracking-wide
                        `}>
                            {title}
                        </h3>
                    )}
                    <h4 className={`
                        ${textSizeStyles[size]} 
                        font-bold text-navy-700 dark:text-white
                        transition-colors duration-200
                    `}>
                        {subtitle}
                    </h4>
                </div>
            </div>

            {children && (
                <div className="flex items-center ml-4 flex-shrink-0">
                    {children}
                </div>
            )}
        </Card>
    );
};

export default HeadingCard;