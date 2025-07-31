'use client';
import { useState, useEffect, forwardRef, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MdExpandMore, MdExpandLess, MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

const AnimatedMultiSelect = forwardRef(({
    label,
    icon: Icon,
    value = [],
    onChange,
    permissionsGrouped = {},
    error,
    required = false,
    disabled = false
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
    const [dropdownReady, setDropdownReady] = useState(false);
    const containerRef = useRef(null);
    const dropdownRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    // Function to format permission names
    const formatPermissionName = (name) => {
        return name
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        setMounted(true);
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isOpen && containerRef.current && mounted) {
            const rect = containerRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.bottom + 4, // Use viewport-relative position only
                left: rect.left,
                width: rect.width
            });
            // Add a small delay to ensure position is set before showing
            setTimeout(() => setDropdownReady(true), 0);
        } else {
            setDropdownReady(false);
        }
    }, [isOpen, mounted]);

    useEffect(() => {
        const handleScroll = (e) => {
            // Check if the scroll is happening inside the dropdown
            const dropdownElement = document.querySelector('[data-dropdown-content="true"]');
            if (dropdownElement && dropdownElement.contains(e.target)) {
                // Allow scrolling inside dropdown
                return;
            }

            // Prevent scrolling on the background
            e.preventDefault();
            e.stopPropagation();
            return false;
        };

        const handleResize = () => {
            if (isOpen) {
                closeDropdown();
            }
        };

        if (isOpen) {
            // Prevent background scrolling but allow dropdown scrolling
            document.body.style.overflow = 'hidden';

            // Add scroll prevention with selective allowing
            window.addEventListener('wheel', handleScroll, { passive: false, capture: true });
            window.addEventListener('touchmove', handleScroll, { passive: false, capture: true });
            window.addEventListener('resize', handleResize);

            return () => {
                // Restore scrolling
                document.body.style.overflow = '';

                window.removeEventListener('wheel', handleScroll, true);
                window.removeEventListener('touchmove', handleScroll, true);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isOpen]);

    const closeDropdown = () => {
        setIsOpen(false);
        setDropdownReady(false);
    };

    const handleItemToggle = (itemId, e) => {
        e.preventDefault();
        e.stopPropagation();

        // Preserve scroll position
        const scrollTop = dropdownRef.current?.scrollTop || 0;

        const newValue = value.includes(itemId)
            ? value.filter(id => id !== itemId)
            : [...value, itemId];
        onChange(newValue);

        // Restore scroll position after state update
        requestAnimationFrame(() => {
            if (dropdownRef.current) {
                dropdownRef.current.scrollTop = scrollTop;
            }
        });
    };

    const getSelectedCount = () => value.length;

    const getAllItems = () => {
        return Object.values(permissionsGrouped).flat();
    };

    const allItems = getAllItems();

    const handleToggleOpen = () => {
        if (!disabled) {
            if (isOpen) {
                setIsOpen(false);
                setDropdownReady(false);
            } else {
                setIsOpen(true);
            }
        }
    };

    const DropdownContent = () => (
        <div
            ref={dropdownRef}
            className="fixed z-[9999] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-2xl max-h-80 overflow-y-auto"
            data-dropdown-content="true"
            style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
                minWidth: '200px'
            }}
        >
            {allItems.length > 0 ? (
                <>
                    {allItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={(e) => handleItemToggle(item.id, e)}
                            className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                            {value.includes(item.id) ? (
                                <MdCheckBox className="text-brandGreen flex-shrink-0" size={20} />
                            ) : (
                                <MdCheckBoxOutlineBlank className="text-gray-400 flex-shrink-0" size={20} />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {formatPermissionName(item.name)}
                                </p>
                                {item.description && (
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </button>
                    ))}

                    <div className="p-3 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-750">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const scrollTop = dropdownRef.current?.scrollTop || 0;
                                    onChange([]);

                                    requestAnimationFrame(() => {
                                        if (dropdownRef.current) {
                                            dropdownRef.current.scrollTop = scrollTop;
                                        }
                                    });
                                }}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-red-500 px-2 py-1 rounded transition-colors"
                                disabled={getSelectedCount() === 0}
                            >
                                Clear All
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();

                                    // Preserve scroll position for Select All
                                    const scrollTop = dropdownRef.current?.scrollTop || 0;
                                    const allItemIds = allItems.map(item => item.id);
                                    onChange(allItemIds);

                                    requestAnimationFrame(() => {
                                        if (dropdownRef.current) {
                                            dropdownRef.current.scrollTop = scrollTop;
                                        }
                                    });
                                }}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-brandGreen px-2 py-1 rounded transition-colors"
                            >
                                Select All
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    <p className="text-sm">No products available</p>
                </div>
            )}
        </div>
    );

    return (
        <div className={`w-full transform transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative" ref={containerRef}>
                <div className="flex items-center gap-2 mb-2">
                    {Icon && <Icon size={16} className="text-brandGreen" />}
                    <label className={`text-sm font-semibold ${error ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                        {label}
                        {required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                </div>

                <button
                    type="button"
                    onClick={handleToggleOpen}
                    disabled={disabled}
                    className={`
                        w-full flex items-center justify-between p-3 rounded-xl border-2 
                        transition-all duration-200 bg-white dark:bg-gray-800
                        ${disabled
                            ? 'bg-gray-100 cursor-not-allowed opacity-60'
                            : ''
                        }
                        ${error
                            ? 'border-red-300 focus:border-red-500'
                            : 'border-gray-200 dark:border-gray-600 focus:border-brandGreen hover:border-gray-300'
                        }
                        ${isOpen ? 'border-brandGreen shadow-md' : ''}
                    `}
                >
                    <span className={`text-sm ${getSelectedCount() === 0 ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                        {getSelectedCount() === 0
                            ? 'Select permissions'
                            : `${getSelectedCount()} permission${getSelectedCount() !== 1 ? 's' : ''} selected`
                        }
                    </span>
                    {isOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </button>

                {isOpen && dropdownReady && mounted && typeof window !== 'undefined' && createPortal(
                    <>
                        <div
                            className="fixed inset-0 z-[9998]"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setIsOpen(false);
                                setDropdownReady(false);
                            }}
                        />
                        <DropdownContent />
                    </>,
                    document.body
                )}

                {error && (
                    <p className="mt-1 text-xs text-red-600 animate-slideDown">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
});

AnimatedMultiSelect.displayName = 'AnimatedMultiSelect';

export default AnimatedMultiSelect;