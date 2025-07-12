'use client';

const AnimatedButton = ({
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    icon: Icon,
    className = '',
    onClick,
    ...props
}) => {
    const baseClasses = 'font-semibold rounded-lg shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-brandGreen hover:bg-brandGreen text-white focus:ring-brandGreen',
        secondary: 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white focus:ring-gray-500',
        outline: 'border-2 border-brandGreen text-brandGreen hover:bg-brandGreen dark:hover:bg-brandGreen focus:ring-brandGreen'
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-2.5 text-base'
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>

            {/* Button Content */}
            <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        {typeof children === 'string' ? `${children}...` : children}
                    </>
                ) : (
                    <>
                        {children}
                        {Icon && (
                            <Icon className="w-4 h-4 transform group-hover:scale-110 group-hover:rotate-[360deg] transition-transform duration-300" />
                        )}
                    </>
                )}
            </span>
        </button>
    );
};

export default AnimatedButton;