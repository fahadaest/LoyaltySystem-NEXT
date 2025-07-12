'use client';

const AnimatedCard = ({ children, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95 ${className}`}>
            {children}
        </div>
    );
};

const AnimatedCardHeader = ({
    title,
    subtitle,
    logo = '☕',
    isVisible = true,
    className = ''
}) => {
    return (
        <div className={`relative bg-brandGreen-600 p-6 text-white overflow-hidden ${className}`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full transform translate-x-12 -translate-y-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-8 translate-y-8"></div>

            <div className="relative z-10">
                {/* Logo */}
                <div className={`flex items-center justify-center mb-4 transform transition-all duration-500 delay-150 ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center overflow-hidden">
                        <div className="w-12 h-12 bg-brandGreen-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                            {logo}
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h1 className={`text-2xl font-bold text-center mb-3 transform transition-all duration-500 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {title}
                </h1>

                {/* Subtitle */}
                <p className={`text-base text-center leading-relaxed transform transition-all duration-500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

const AnimatedCardContent = ({ children, className = '' }) => {
    return (
        <div className={`p-5 ${className}`}>
            {children}
        </div>
    );
};

export { AnimatedCard, AnimatedCardHeader, AnimatedCardContent };
