import React from "react";

const SocialCard = ({
    icon,
    platformName,
    url,
    isActive = false,
    backgroundColor = "#F5F5F5"
}) => {
    return (
        <div
            className="border border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow"
            style={{
                backgroundColor: backgroundColor
            }}
        >
            {/* Social Media Icon */}
            <div className="mb-3">
                <img
                    src={icon}
                    alt={platformName}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                        console.log(`Failed to load icon: ${icon}`);
                        e.target.style.display = 'none';
                    }}
                    onLoad={() => {
                        console.log(`Successfully loaded icon: ${icon}`);
                    }}
                />
            </div>

            {/* Platform Status Badge */}
            <div className="mb-2">
                <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-green-500' : 'bg-gray-400'
                            }`}
                    ></span>
                    {platformName}
                </span>
            </div>

            {/* URL Display */}
            <div className="text-center px-2">
                <p className="text-xs text-gray-500 break-all leading-relaxed">
                    {url}
                </p>
            </div>
        </div>
    );
};

export default SocialCard;