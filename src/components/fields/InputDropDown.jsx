import React, { useState } from "react";

function InputDropdown(props) {
    const {
        label,
        id,
        extra,
        placeholder,
        variant,
        state,
        disabled,
        options = [],
        value,
        onChange
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || "");

    const handleSelect = (option) => {
        setSelectedValue(option.value);
        setIsOpen(false);
        if (onChange) {
            onChange(option);
        }
    };

    const selectedOption = options.find(opt => opt.value === selectedValue);
    const displayText = selectedOption ? selectedOption.label : placeholder;

    return (
        <div className={`relative ${extra}`}>
            <label
                htmlFor={id}
                className={`text-sm text-navy-700 dark:text-white ${variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
                    }`}
            >
                {label}
            </label>

            <div className="relative">
                <button
                    type="button"
                    disabled={disabled}
                    id={id}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`mt-2 flex h-12 w-full items-center justify-between rounded-xl border bg-white/0 p-3 text-sm outline-none ${disabled === true
                        ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)] cursor-not-allowed"
                        : state === "error"
                            ? "border-red-500 text-red-500 dark:!border-red-400 dark:!text-red-400 cursor-pointer"
                            : state === "success"
                                ? "border-green-500 text-green-500 dark:!border-green-400 dark:!text-green-400 cursor-pointer"
                                : "border-gray-200 dark:!border-white/10 dark:text-white cursor-pointer hover:border-gray-300 dark:hover:!border-white/20"
                        }`}
                >
                    <span className={`${!selectedOption && placeholder
                        ? state === "error"
                            ? "text-red-500 dark:!text-red-400"
                            : state === "success"
                                ? "text-green-500 dark:!text-green-400"
                                : "text-gray-500 dark:text-white/50"
                        : ""
                        }`}>
                        {displayText}
                    </span>

                    <svg
                        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            } ${disabled
                                ? "text-gray-400 dark:text-white/20"
                                : state === "error"
                                    ? "text-red-500 dark:text-red-400"
                                    : state === "success"
                                        ? "text-green-500 dark:text-green-400"
                                        : "text-gray-400 dark:text-white/50"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6,9 12,15 18,9" />
                    </svg>
                </button>

                {isOpen && !disabled && (
                    <div className="absolute z-10 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-gray-800">
                        <div className="max-h-60 overflow-auto rounded-xl">
                            {options.map((option, index) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option)}
                                    className={`w-full px-3 py-3 text-left text-sm hover:bg-gray-50 dark:hover:bg-white/5 ${index === 0 ? "rounded-t-xl" : ""
                                        } ${index === options.length - 1 ? "rounded-b-xl" : ""
                                        } ${selectedValue === option.value
                                            ? "bg-gray-50 text-navy-700 dark:bg-white/5 dark:text-white font-medium"
                                            : "text-gray-700 dark:text-white/80"
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                            {options.length === 0 && (
                                <div className="px-3 py-3 text-sm text-gray-500 dark:text-white/50">
                                    No options available
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputDropdown;