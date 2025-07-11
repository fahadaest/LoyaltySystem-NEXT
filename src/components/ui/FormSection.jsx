'use client';

const FormSection = ({
    title,
    icon: Icon,
    children,
    delay = 0,
    isVisible = true,
    className = ''
}) => {
    return (
        <div
            className={`space-y-4 transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {title && (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    {Icon && <Icon className="text-brandGreen" />}
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

export default FormSection;