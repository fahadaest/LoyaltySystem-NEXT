"use client";

import { useEffect, useMemo, useState } from "react";

const COUNTRY_OPTIONS = [
    { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
    { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
    { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
    { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
    { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
    { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
];

export default function PhoneNumberField({
    label = "Phone Number",
    name = "phone",
    value,
    onChange,
    placeholder = "50 000 0000",
    required = false,
    className = "",
    defaultCountry = "AE",
    countries = COUNTRY_OPTIONS,
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem",
    fieldWidth = "100%",
}) {
    const findByDial = (dial) => countries.find(c => c.dial === dial);
    const findByCode = (code) => countries.find(c => c.code === code);

    const parsed = useMemo(() => {
        if (!value) return { dial: findByCode(defaultCountry)?.dial || "+971", local: "" };
        const m = value.match(/^\s*(\+\d+)\s*(.*)$/);
        if (m) return { dial: m[1], local: m[2] || "" };
        return { dial: findByCode(defaultCountry)?.dial || "+971", local: value };
    }, [value, defaultCountry, countries]);

    const [open, setOpen] = useState(false);
    const [dial, setDial] = useState(parsed.dial);
    const [local, setLocal] = useState(parsed.local);

    useEffect(() => {
        if (parsed.dial !== dial) setDial(parsed.dial);
        if (parsed.local !== local) setLocal(parsed.local);
    }, [parsed.dial, parsed.local]);

    const emitChange = (nextDial, nextLocal) => {
        const full = nextLocal ? `${nextDial} ${nextLocal}` : `${nextDial}`;
        onChange?.({ target: { name, value: full } });
    };

    const selected = findByDial(dial) || findByCode(defaultCountry) || countries[0];

    const onPickCountry = (c) => {
        setDial(c.dial);
        setOpen(false);
        emitChange(c.dial, local);
    };

    const onLocalChange = (e) => {
        let nextLocal = e.target.value;
        nextLocal = nextLocal.replace(/\D/g, "");
        if (dial === "+971") {
            nextLocal = nextLocal.slice(0, 9);
        }
        setLocal(nextLocal);
        emitChange(dial, nextLocal);
    };

    const onBlurMenu = () => setTimeout(() => setOpen(false), 100);

    // Calculate padding based on fieldHeight
    const paddingY = fieldHeight;

    return (
        <div className={className} style={{ width: fieldWidth }}>
            {label && (
                <label
                    htmlFor={name}
                    className="mb-2 block font-semibold text-black"
                    style={{ fontSize: labelSize }}
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                <div className="flex">
                    <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        onClick={() => setOpen(o => !o)}
                        title={`${selected.name} (${selected.dial})`}
                        className="flex shrink-0 items-center gap-1 rounded-l-full border border-gray-300 bg-white px-2 text-gray-700 focus:outline-none focus:border-black w-[82px] justify-center transition-colors"
                        style={{
                            paddingTop: paddingY,
                            paddingBottom: paddingY
                        }}
                    >
                        <span className="text-sm leading-none">{selected.flag}</span>
                        <span style={{ fontSize: placeholderSize }}>{selected.dial}</span>
                        <svg className="h-3 w-3 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.114l3.71-3.883a.75.75 0 111.08 1.04l-4.24 4.44a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                        </svg>
                    </button>

                    <input
                        id={name}
                        name={name}
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={local}
                        onChange={onLocalChange}
                        placeholder={placeholder}
                        required={required}
                        className="w-full -ml-px rounded-r-full border border-gray-300 bg-white px-4 text-gray-700 placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                        style={{
                            fontSize: placeholderSize,
                            paddingTop: paddingY,
                            paddingBottom: paddingY
                        }}
                    />
                </div>

                {open && (
                    <div
                        role="listbox"
                        tabIndex={-1}
                        onBlur={onBlurMenu}
                        className="absolute z-10 mt-2 max-h-60 w-56 overflow-auto rounded-xl border border-gray-300 bg-white p-1 shadow-lg focus:outline-none"
                    >
                        {countries.map((c) => {
                            const active = c.dial === dial;
                            return (
                                <button
                                    type="button"
                                    key={c.code}
                                    role="option"
                                    aria-selected={active}
                                    onClick={() => onPickCountry(c)}
                                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50 ${active ? "bg-gray-100" : ""}`}
                                >
                                    <span className="text-sm leading-none">{c.flag}</span>
                                    <span className="flex-1 truncate">{c.name}</span>
                                    <span className="text-gray-700">{c.dial}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
