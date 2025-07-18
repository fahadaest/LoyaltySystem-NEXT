import Card from "components/card";

interface HeadingCardProps {
    icon?: JSX.Element;
    title?: string;
    subtitle: string;
    children?: React.ReactNode;
    showBorder?: boolean;
    className?: string;
}

const HeadingCard = ({
    icon,
    title,
    subtitle,
    children,
    showBorder = false,
    className = '',
}: HeadingCardProps) => {
    return (
        <div className="relative">
            <Card
                extra={`
                    !flex-row flex-grow items-center justify-between rounded-lg
                    transition-all duration-200 ease-in-out
                    hover:shadow-md 
                    px-6 py-4 gap-4
                    bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700
                    ${showBorder ? 'border' : 'border-0'}
                    ${className}
                `}
            >
                <div className={`
                    absolute left-0 top-0 w-1 h-full
                    bg-brandGreen
                    rounded-l-full z-10
                `} />

                <div className={`
                    absolute right-0 top-0 w-1 h-full
                    bg-brandGreen
                    rounded-r-full z-10
                `} />

                <div className="flex items-center gap-4 relative z-20">
                    {icon && (
                        <div className={`
                            text-xl 
                            text-gray-600 dark:text-gray-400
                            flex items-center justify-center
                            transition-colors duration-200
                            bg-white rounded-full p-2 shadow-sm
                            border border-gray-200 dark:border-gray-600
                            dark:bg-gray-700
                        `}>
                            {icon}
                        </div>
                    )}

                    <div className="flex flex-col">
                        <h3 className={`
                            text-xl font-bold 
                            text-gray-900 dark:text-white
                            transition-colors duration-200
                        `}>
                            {title}
                        </h3>

                        {subtitle && (
                            <div className={`
                                text-sm
                                font-medium text-gray-600 dark:text-gray-400 
                                uppercase tracking-wider mb-1
                            `}>
                                {subtitle}
                            </div>
                        )}
                    </div>
                </div>

                {children && (
                    <div className="flex items-center ml-4 flex-shrink-0 relative z-20">
                        {children}
                    </div>
                )}
            </Card>
        </div>
    );
};

export default HeadingCard;