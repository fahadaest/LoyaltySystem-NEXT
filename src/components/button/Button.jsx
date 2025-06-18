import React from "react";

const sizeClasses = {
    xs: "py-0.5 px-2 text-xs",  // slightly smaller than sm
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
    const borderRadiusClass = size === "xs" || size === "sm" ? "rounded-md" : "rounded-lg";

    return (
        <button
            onClick={onClick}
            className={`inline-flex items-center gap-2 ${color} ${hoverColor} text-white font-medium ${borderRadiusClass} transition-all duration-300 transform hover:scale-105 shadow-md ${sizeClasses[size]} ${className}`}
            {...rest}
        >
            {Icon && (
                <Icon
                    size={18}
                    className="text-white transition-transform duration-300 group-hover:rotate-90"
                />
            )}
            <span>{text}</span>
        </button>
    );
};

export default Button;
