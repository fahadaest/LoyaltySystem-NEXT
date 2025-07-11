'use client';
import { MdCheckCircle } from 'react-icons/md';

const SuccessScreen = ({
    title = "Success!",
    message = "Operation completed successfully",
    details,
    onReset,
    resetButtonText = "Start Over",
    className = ''
}) => {
    return (
        <div className={`text-center space-y-6 animate-fadeIn ${className}`}>
            {/* Success Icon */}
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-brandGreen rounded-full flex items-center justify-center animate-bounce">
                    <MdCheckCircle className="w-12 h-12 text-white" />
                </div>
            </div>

            {/* Success Message */}
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {message}
                </p>
            </div>

            {/* Details */}
            {details && (
                <div className="bg-green dark:bg-brandGreen/20 border border-brandGreen dark:border-brandGreen-700 rounded-xl p-4">
                    {typeof details === 'string' ? (
                        <p className="text-brandGreen dark:text-brandGreen font-medium">
                            {details}
                        </p>
                    ) : (
                        details
                    )}
                </div>
            )}

            {/* Reset Button */}
            {onReset && (
                <button
                    onClick={onReset}
                    className="text-brandGreen hover:text-brandGreen font-medium text-sm underline transition-colors duration-200"
                >
                    {resetButtonText}
                </button>
            )}
        </div>
    );
};

export default SuccessScreen;