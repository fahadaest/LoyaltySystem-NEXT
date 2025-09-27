import React from 'react';

const ReportCard = ({ iconUrl, title, text, percentage, trend, className = "" }) => {
    const getArrowIcon = (trend) => {
        if (trend === "up") {
            return (
                <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 17a.5.5 0 0 1-.5-.5V5.707L5.854 9.354a.5.5 0 1 1-.708-.708l4-4a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1-.708.708L10.5 5.707V16.5a.5.5 0 0 1-.5.5z" />
                </svg>
            );
        } else {
            return (
                <svg className="w-7 h-7 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 3a.5.5 0 0 1 .5.5v10.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 1 1 .708-.708L9.5 14.293V3.5A.5.5 0 0 1 10 3z" />
                </svg>
            );
        }
    };

    const getPercentageColor = (trend) => {
        return trend === "up" ? "text-green-500" : "text-red-500";
    };

    const getBorderColor = (trend) => {
        return trend === "down" ? "border-red-500" : "border-brandColor";
    };

    return (
        <div className={`bg-[#F5F5F5] border ${getBorderColor(trend)} rounded-3xl p-2 px-4 flex flex-col items-start justify-center relative ${className}`}>
            {/* Icon and Title in same row */}
            <div className="mb-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                    <img
                        src={iconUrl}
                        alt={title}
                        className="w-4 h-4 object-contain"
                    />
                </div>
                <h3 className="text-black text-[0.7rem] font-medium leading-tight">
                    {title}
                </h3>
            </div>

            {/* Text/Number and Percentage in same row */}
            <div className="w-full flex items-center justify-between">
                <p className="text-gray-600 pl-2 text-[1.5rem] font-bold">
                    {text}
                </p>
                {percentage && (
                    <div className="flex items-center gap-1">
                        <span className={`text-[1.5rem] font-semibold ${getPercentageColor(trend)}`}>
                            {percentage}%
                        </span>
                        {getArrowIcon(trend)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReportCard;