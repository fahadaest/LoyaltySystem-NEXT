"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({
    label = "Password",
    name = "password",
    value,
    onChange,
    placeholder = "Password",
    required = false,
    className = "",
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem",
}) {
    const [show, setShow] = useState(false);
    const id = name;

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
                    id={id}
                    name={name}
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    autoComplete={name === "password" ? "new-password" : "off"}
                    className="w-full rounded-full border border-gray-300 bg-white px-4 pr-12 text-gray-700 placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                    style={{
                        fontSize: placeholderSize,
                        paddingTop: fieldHeight,
                        paddingBottom: fieldHeight
                    }}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-black focus:outline-none transition-colors"
                >
                    {show ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}