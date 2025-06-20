import React from "react";

const sizeClasses = {
    icon: "py-1 px-2 text-xs",
    xs: "py-1 px-2 text-xs",
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
};

const Button = ({
    icon: Icon,
    text,
    color = "bg-brandGreen",
    hoverColor = "hover:bg-brandGreenDark",
    size = "md",
    onClick,
    className = "",
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
                    size={size === "icon" ? 15 : 18}
                    className="text-white transition-transform duration-300 group-hover:rotate-[360deg]"
                />
            )}
            {text && <span className="leading-none whitespace-nowrap">{text}</span>}
        </button>
    );
};

export default Button;
