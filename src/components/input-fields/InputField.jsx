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
    labelSize = "1rem",
    placeholderSize = "0.875rem",
    fieldHeight = "0.75rem",
}) {
    const id = name || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

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
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className="w-full rounded-full border border-gray-300 bg-white px-5 text-gray-700 placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                style={{
                    fontSize: placeholderSize,
                    paddingTop: fieldHeight,
                    paddingBottom: fieldHeight
                }}
            />
        </div>
    );
}