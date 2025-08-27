"use client";

export default function InputField({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    autoComplete,
    className = "",
}) {
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
        <div className={className}>
            {label && (
                <label htmlFor={id} className="mb-2 block text-base font-semibold text-black">
                    {label}
                </label>
            )}
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm text-gray-700 focus:border-black focus:outline-none"
            />
        </div>
    );
}
