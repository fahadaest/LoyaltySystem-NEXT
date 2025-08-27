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
}) {
    const [show, setShow] = useState(false);
    const id = name;

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="mb-2 block text-base font-semibold text-black"
                >
                    {label}
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
                    className="w-full rounded-full border border-gray-300 px-5 py-3 pr-12 text-sm text-gray-700 focus:border-black focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {show ? (
                        <EyeOff className="h-5 w-5" />
                    ) : (
                        <Eye className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
