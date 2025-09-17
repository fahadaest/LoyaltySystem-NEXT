"use client";

import { Calendar } from "lucide-react";
import { useRef } from "react";

export default function DatePickerField({
    label,
    name,
    value,
    onChange,
    placeholder = "dd/mm/yyyy",
    required = false,
    className = "",
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem",
    min,
    max,
    showCalendarIcon = true,
}) {
    const inputRef = useRef(null);
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const handleIconClick = () => {
        if (inputRef.current) {
            inputRef.current.showPicker?.() || inputRef.current.focus();
        }
    };

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block font-semibold text-black"
                    style={{ fontSize: labelSize }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <input
                    ref={inputRef}
                    id={id}
                    name={name}
                    type="date"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    min={min}
                    max={max}
                    className="w-full rounded-full border border-gray-300 bg-white px-5 pr-12 text-gray-700 focus:border-black focus:outline-none transition-colors"
                    style={{
                        fontSize: placeholderSize,
                        paddingTop: fieldHeight,
                        paddingBottom: fieldHeight
                    }}
                />

                {showCalendarIcon && (
                    <button
                        type="button"
                        onClick={handleIconClick}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80 transition-opacity"
                        title="Open calendar"
                    >
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-white" />
                        </div>
                    </button>
                )}
            </div>
        </div>
    );
}
