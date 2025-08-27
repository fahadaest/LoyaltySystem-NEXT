"use client";

import { useState } from "react";

export default function SwitchButton({ checked, onChange, label }) {
    const [isOn, setIsOn] = useState(checked || false);

    const toggle = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onChange?.(newValue);
    };

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            {/* Switch */}
            <button
                type="button"
                role="switch"
                aria-checked={isOn}
                onClick={toggle}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle();
                    }
                }}
                className={`relative inline-flex h-[25px] w-[45px] items-center rounded-full px-1 transition-all ${isOn ? "bg-black justify-end" : "bg-gray-200 justify-start"
                    }`}
                aria-label={label}
            >
                <span className="inline-block h-[18px] w-[18px] rounded-full bg-white shadow transition-all" />
            </button>

            {label && <span className="text-sm text-gray-700 select-none">{label}</span>}

            {/* Hidden checkbox for semantics */}
            <input
                type="checkbox"
                checked={isOn}
                onChange={(e) => onChange?.(e.target.checked)}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
            />
        </label>
    );
}
