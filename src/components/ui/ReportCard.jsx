import React from 'react';

const ReportCard = ({ iconUrl, title, text, className = "" }) => {
    return (
        <div className={`bg-gray-100 rounded-3xl p-2 px-4 flex flex-col items-start justify-center ${className}`}>
            {/* Icon */}
            <div className="mb-4">
                <img
                    src={iconUrl}
                    alt={title}
                    className="w-5 h-5 object-contain"
                />
            </div>

            {/* Title */}
            <h3 className="text-black text-[0.7rem] font-medium mb-2 leading-tight">
                {title}
            </h3>

            {/* Text/Number */}
            <p className="text-gray-600 ext-[0.9rem] font-bold">
                {text}
            </p>
        </div>
    );
};

export default ReportCard;