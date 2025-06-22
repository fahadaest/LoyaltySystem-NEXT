import React from "react";

const sizeClasses = {
    icon: "py-1 px-2 sm:text-xs",
    xs: "py-1 px-2 sm:text-xs",
    sm: "py-1 px-3 sm:text-sm",
    md: "py-2 px-4 sm:text-base",
    lg: " py-1 px-3  xs:py-3 xs:px-3  text-[10px] xs:text-xs sm:text-lg",
};

const HeaderButton = ({
    icon: Icon,
    text,
    color = "bg-brandGreen",
    hoverColor = "hover:bg-brandGreenDark",
    size = "md",
    onClick,
    className = "",
    variant,
    ...rest
}) => {
    const borderRadiusClass = size === "xs" || size === "sm" || size === "icon" ? "rounded-md" : "rounded-lg";
    const gapClass = text ? "gap-2" : "";

    return (
        <button
            onClick={onClick}
            className={`group flex py-2 items-center justify-center ${gapClass} ${color} ${hoverColor} text-white font-medium ${borderRadiusClass} transition-all duration-300 transform hover:scale-105 shadow-md ${sizeClasses[size]} ${className}`}
            {...rest}
        >
            {Icon && (
                <Icon
                    className=" text-white w-[15px] h-[15px] sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:rotate-[360deg]"
                />
            )}
            {text && <span className="leading-none">{text}</span>}
        </button>
    );
};

export default HeaderButton;
