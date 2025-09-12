"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
    const [openSubmenus, setOpenSubmenus] = useState({});
    const timeoutRefs = useRef({});
    const navRef = useRef(null);
    const submenuRefs = useRef({});
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = {
        general: [{
            name: "Dashboard",
            svgSrc: "/img/sidebar/dashboard_light.svg",
            svgSrcDark: "/img/sidebar/dashboard_dark.svg",
            href: "/dashboard"
        }],
        productLoyalties: [
            {
                name: "Products",
                svgSrc: "/img/sidebar/product_light.svg",
                svgSrcDark: "/img/sidebar/product_dark.svg",
                href: "/products"
            },
            {
                name: "Loyalty",
                svgSrc: "/img/sidebar/loyalty_light.svg",
                svgSrcDark: "/img/sidebar/loyalty_dark.svg",
                hasSubmenu: true,
                submenu: [
                    { name: "Create Loyalty", href: "/manage-loyalty" },
                    { name: "Points Loyalty", href: "/points-loyalty" },
                    { name: "Products Loyalty", href: "/products-loyalty" }
                ]
            },
        ],
        management: [
            {
                name: "Customers",
                svgSrc: "/img/sidebar/customers_light.svg",
                svgSrcDark: "/img/sidebar/customers_dark.svg",
                href: "/customers"
            },
            {
                name: "Sales Person",
                svgSrc: "/img/sidebar/salesPerson_light.svg",
                svgSrcDark: "/img/sidebar/salesPerson_dark.svg",
                href: "/salesperson"
            },
            {
                name: "Managers",
                svgSrc: "/img/sidebar/managers_light.svg",
                svgSrcDark: "/img/sidebar/managers_dark.svg",
                href: "/managers"
            }
        ],
        settings: [{
            name: "Settings",
            svgSrc: "/img/sidebar/settings_light.svg",
            svgSrcDark: "/img/sidebar/settings_dark.svg",
            hasArrow: true,
            hasSubmenu: true,
            submenu: [
                { name: "Store Address", href: "/store-address" },
                { name: "Wallet Social Links", href: "/socials-and-support" },
                { name: "Wallet Beacons", href: "/wallet-beacons" },
                { name: "Terms & Conditions", href: "/terms-and-conditions" }
            ]
        }]
    };

    // Function to check if an item is active
    const isItemActive = (item) => {
        if (item.href && pathname === item.href) {
            return true;
        }

        // Check if any submenu item is active
        if (item.hasSubmenu && item.submenu) {
            return item.submenu.some(subItem => pathname === subItem.href);
        }

        return false;
    };

    // Function to check if a submenu item is active
    const isSubmenuItemActive = (subItem) => {
        return pathname === subItem.href;
    };

    // Auto-open submenu if current page is in submenu
    useEffect(() => {
        const allItems = [
            ...menuItems.general,
            ...menuItems.productLoyalties,
            ...menuItems.management,
            ...menuItems.settings
        ];

        allItems.forEach(item => {
            if (item.hasSubmenu && item.submenu) {
                const hasActiveSubmenu = item.submenu.some(subItem => pathname === subItem.href);
                if (hasActiveSubmenu) {
                    setOpenSubmenus(prev => ({ ...prev, [item.name]: true }));
                }
            }
        });
    }, [pathname]);

    const checkAndScrollToSubmenu = (itemName) => {
        if (!navRef.current || !submenuRefs.current[itemName]) return;

        const navElement = navRef.current;
        const submenuElement = submenuRefs.current[itemName];

        requestAnimationFrame(() => {
            const submenuRect = submenuElement.getBoundingClientRect();
            const navRect = navElement.getBoundingClientRect();
            const submenuBottom = submenuRect.bottom;
            const navBottom = navRect.bottom;

            if (submenuBottom > navBottom) {
                const scrollAmount = submenuBottom - navBottom + 20;
                navElement.scrollTo({
                    top: navElement.scrollTop + scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
    };

    const handleMouseEnter = (itemName) => {
        if (timeoutRefs.current[itemName]) {
            clearTimeout(timeoutRefs.current[itemName]);
            delete timeoutRefs.current[itemName];
        }
        setOpenSubmenus(prev => ({ ...prev, [itemName]: true }));
        setTimeout(() => checkAndScrollToSubmenu(itemName), 50);
        setTimeout(() => checkAndScrollToSubmenu(itemName), 150);
        setTimeout(() => checkAndScrollToSubmenu(itemName), 320);
    };

    const handleMouseLeave = (itemName) => {
        // Don't auto-close if the submenu contains the active page
        const allItems = [
            ...menuItems.general,
            ...menuItems.productLoyalties,
            ...menuItems.management,
            ...menuItems.settings
        ];

        const currentItem = allItems.find(item => item.name === itemName);
        const hasActiveSubmenu = currentItem?.submenu?.some(subItem => pathname === subItem.href);

        if (hasActiveSubmenu) return; // Keep submenu open if it contains active page

        timeoutRefs.current[itemName] = setTimeout(() => {
            setOpenSubmenus(prev => ({ ...prev, [itemName]: false }));
            delete timeoutRefs.current[itemName];
        }, 150);
    };

    const handleNavigation = (href) => {
        if (href) {
            router.push(href);
        }
    };

    const getIconSrc = (item) => isItemActive(item) ? item.svgSrcDark : item.svgSrc;
    const getArrowRotation = (itemName) => openSubmenus[itemName] ? '-rotate-90' : 'rotate-0';

    const renderMenuItem = (item, index, isSubmenu = false) => {
        const isActive = isSubmenu ? isSubmenuItemActive(item) : isItemActive(item);

        return (
            <div
                key={index}
                className={`flex items-center ${isSubmenu ? 'justify-start' : 'justify-between'} px-3 py-2.5 cursor-pointer hover:text-[#41cc40] hover:bg-gray-800 rounded-[2rem] transition-colors ${isActive ? 'bg-white text-black rounded-[2rem]' : ''
                    }`}
                onClick={() => !item.hasSubmenu && handleNavigation(item.href)}
            >
                <div className="flex items-center gap-2">
                    {!isSubmenu && (
                        <img src={getIconSrc(item)} alt={item.name} className="w-3 h-3 object-contain" />
                    )}
                    <span className="text-[10px] font-medium">{item.name}</span>
                </div>
                {(item.hasSubmenu || item.hasArrow) && (
                    <img
                        src="/img/general/arrow_right_white.svg"
                        alt="arrow"
                        className={`w-[0.6rem] h-[0.6rem] object-contain transition-transform duration-200 ${getArrowRotation(item.name)}`}
                    />
                )}
            </div>
        );
    };

    const renderSection = (title, items) => (
        <section className="mb-6 mt-6">
            <h3 className="text-[0.6rem] font-bold text-[#41cc40] mb-4 tracking-wide">{title}</h3>
            <div className="space-y-0">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="relative"
                        onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.name)}
                        onMouseLeave={() => item.hasSubmenu && handleMouseLeave(item.name)}
                    >
                        {renderMenuItem(item, index)}
                        {item.hasSubmenu && (
                            <div
                                ref={(el) => {
                                    if (el) {
                                        submenuRefs.current[item.name] = el;
                                    }
                                }}
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubmenus[item.name] ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
                                    }`}
                                onMouseEnter={() => handleMouseEnter(item.name)}
                                onMouseLeave={() => handleMouseLeave(item.name)}
                            >
                                <div className="ml-6 space-y-1">
                                    {item.submenu.map((subItem, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className={`block text-[9px] py-1 px-2 rounded transition-colors transform transition-transform duration-200 cursor-pointer ${isSubmenuItemActive(subItem)
                                                ? 'text-[#41cc40] bg-gray-800'
                                                : 'text-gray-400 hover:text-[#41cc40]'
                                                }`}
                                            style={{
                                                transform: openSubmenus[item.name]
                                                    ? `translateY(0) scale(1)`
                                                    : `translateY(-10px) scale(0.95)`,
                                                transitionDelay: openSubmenus[item.name] ? `${subIndex * 50}ms` : '0ms'
                                            }}
                                            onClick={() => handleNavigation(subItem.href)}
                                        >
                                            {subItem.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );

    return (
        <aside className="fixed top-4 left-4 w-[13.2rem] h-[calc(100vh-2rem)] z-100">
            <nav
                ref={navRef}
                className="bg-black w-full h-full rounded-[2.5rem] p-4 text-white font-poppins overflow-y-auto relative z-50"
            >
                <div className="flex items-center justify-center gap-1 mb-5 mt-3">
                    <img src="/img/logo.svg" alt="Logo" className="w-4 h-4 object-contain" />
                    <h2 className="text-[1.2rem] font-light"><span className="text-white">REWARD</span><span className="font-semibold">HIVE</span></h2>
                </div>
                <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                {renderSection("General", menuItems.general, false)}
                <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                {renderSection("Product & Loyalties", menuItems.productLoyalties, false)}
                <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                {renderSection("Management", menuItems.management, false)}
                <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                {renderSection("Settings", menuItems.settings, false)}
            </nav>
        </aside>
    );
};

export default Sidebar;