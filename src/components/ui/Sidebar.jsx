"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserRole } from "@/store/slices/authSlice";

const Sidebar = () => {
    const [openSubmenus, setOpenSubmenus] = useState({});
    const timeoutRefs = useRef({});
    const navRef = useRef(null);
    const submenuRefs = useRef({});
    const router = useRouter();
    const pathname = usePathname();
    const userRole = useSelector(selectUserRole);

    const menuItems = {
        general: [{ name: "Dashboard", svgSrc: "/img/sidebar/dashboard_light.svg", svgSrcDark: "/img/sidebar/dashboard_dark.svg", href: "/dashboard" }],
        admin: [{ name: "Admin", svgSrc: "/img/sidebar/dashboard_light.svg", svgSrcDark: "/img/sidebar/dashboard_dark.svg", href: "/admins" }],
        superadmin: [{ name: "Manage Subscription", svgSrc: "/img/sidebar/settings_light.svg", svgSrcDark: "/img/sidebar/settings_dark.svg", href: "/subscriptions" }],
        productLoyalties: [
            { name: "Products", svgSrc: "/img/sidebar/product_light.svg", svgSrcDark: "/img/sidebar/product_dark.svg", href: "/products" },
            {
                name: "Loyalty", svgSrc: "/img/sidebar/loyalty_light.svg", svgSrcDark: "/img/sidebar/loyalty_dark.svg", hasSubmenu: true,
                submenu: [
                    { name: "Create Loyalty", href: "/manage-loyalty", icon: "/img/sidebar/create_loyalty.svg" },
                    { name: "Points Loyalty", href: "/points-loyalty", icon: "/img/sidebar/product_loyalty.svg" },
                    { name: "Products Loyalty", href: "/products-loyalty", icon: "/img/sidebar/point_loyalty.svg" }
                ]
            },
        ],
        management: [
            { name: "Customers", svgSrc: "/img/sidebar/customers_light.svg", svgSrcDark: "/img/sidebar/customers_dark.svg", href: "/customers" },
            { name: "Sales Person", svgSrc: "/img/sidebar/salesPerson_light.svg", svgSrcDark: "/img/sidebar/salesPerson_dark.svg", href: "/salesperson" },
            { name: "Managers", svgSrc: "/img/sidebar/managers_light.svg", svgSrcDark: "/img/sidebar/managers_dark.svg", href: "/managers" }
        ],
        settings: [{
            name: "Settings", svgSrc: "/img/sidebar/settings_light.svg", svgSrcDark: "/img/sidebar/settings_dark.svg", hasSubmenu: true,
            submenu: [
                { name: "Store Address", href: "/store-address", icon: "/img/sidebar/store_address.svg" },
                { name: "Wallet Social Links", href: "/socials-and-support", icon: "/img/sidebar/wallet_social_links.svg" },
                { name: "Wallet Beacons", href: "/wallet-beacons", icon: "/img/sidebar/wallet_beacons.svg" },
                { name: "Terms & Conditions", href: "/terms-and-conditions", icon: "/img/sidebar/terms_and_conditions.svg" }
            ]
        }]
    };

    const isItemActive = (item) => pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
    const isSubmenuActive = (subItem) => pathname === subItem.href;

    const getAllItems = () => [
        ...menuItems.general,
        ...(userRole === 'superadmin' ? menuItems.admin : []),
        ...menuItems.productLoyalties,
        ...menuItems.management,
        ...menuItems.settings
    ];

    useEffect(() => {
        const newOpenSubmenus = {};

        getAllItems().forEach(item => {
            if (item.submenu?.some(sub => pathname === sub.href)) {
                newOpenSubmenus[item.name] = true;
            } else {
                newOpenSubmenus[item.name] = false;
            }
        });

        setOpenSubmenus(newOpenSubmenus);
    }, [pathname, userRole]);

    const checkAndScrollToSubmenu = (itemName) => {
        const nav = navRef.current;
        const submenu = submenuRefs.current[itemName];
        if (!nav || !submenu) return;

        requestAnimationFrame(() => {
            const submenuBottom = submenu.getBoundingClientRect().bottom;
            const navBottom = nav.getBoundingClientRect().bottom;
            if (submenuBottom > navBottom) {
                nav.scrollTo({ top: nav.scrollTop + (submenuBottom - navBottom + 20), behavior: 'smooth' });
            }
        });
    };

    const handleMouseEnter = (itemName) => {
        clearTimeout(timeoutRefs.current[itemName]);
        delete timeoutRefs.current[itemName];
        setOpenSubmenus(prev => ({ ...prev, [itemName]: true }));
        [50, 150, 320].forEach(delay => setTimeout(() => checkAndScrollToSubmenu(itemName), delay));
    };

    const handleMouseLeave = (itemName) => {
        const item = getAllItems().find(i => i.name === itemName);
        if (item?.submenu?.some(sub => pathname === sub.href)) return;

        timeoutRefs.current[itemName] = setTimeout(() => {
            setOpenSubmenus(prev => ({ ...prev, [itemName]: false }));
            delete timeoutRefs.current[itemName];
        }, 150);
    };

    const renderSection = (title, items) => (
        <section className="mb-6 mt-6">
            <h3 className="text-[0.7rem] font-bold text-[#41cc40] mb-4 tracking-wide">{title}</h3>
            <div className="space-y-0">
                {items.map((item, index) => {
                    const isActive = isItemActive(item);
                    return (
                        <div key={index} className="relative mb-1"
                            onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.name)}
                            onMouseLeave={() => item.hasSubmenu && handleMouseLeave(item.name)}>

                            <div className={`flex items-center justify-between px-3 py-2 cursor-pointer hover:text-[#41cc40] hover:bg-gray-800 rounded-[2rem] transition-colors ${isActive ? 'bg-white text-black' : ''}`}
                                onClick={() => !item.hasSubmenu && router.push(item.href)}>
                                <div className="flex items-center gap-4">
                                    <img src={isActive ? item.svgSrcDark : item.svgSrc} alt={item.name} className="w-3 h-3 object-contain" />
                                    <span className="text-[10px] font-medium">{item.name}</span>
                                </div>
                                {item.hasSubmenu && (
                                    <img src={item.submenu?.some(sub => pathname === sub.href) ? "/img/general/arrow_top_black.svg" : "/img/general/arrow_right_white.svg"} alt="arrow"
                                        className={`w-[0.6rem] h-[0.6rem] object-contain transition-transform duration-200 ${item.submenu?.some(sub => pathname === sub.href) ? '' : openSubmenus[item.name] ? '-rotate-90' : 'rotate-90'}`} />
                                )}
                            </div>

                            {item.hasSubmenu && (
                                <div ref={el => el && (submenuRefs.current[item.name] = el)}
                                    className={`overflow-hidden transition-all duration-300 ease-in-out relative ${openSubmenus[item.name] ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={() => handleMouseLeave(item.name)}>
                                    <div className="ml-4 space-y-0 relative">
                                        {openSubmenus[item.name] && (
                                            <div className="absolute left-3 top-0 h-full z-10 ">
                                                {item.submenu.map((_, i) => i < item.submenu.length - 1 && (
                                                    <div key={i} className="w-[1px] bg-[#636363] absolute left-[3px]"
                                                        style={{ top: `${i * 32 + 20}px`, height: '24px' }} />
                                                ))}
                                                {item.submenu.map((sub, i) => (
                                                    <div key={i} className={`w-[7px] h-[7px] rounded-full absolute left-0 z-20 ${isSubmenuActive(sub) ? 'bg-white' : 'bg-[#636363]'}`}
                                                        style={{ top: `${i * 32 + 12}px` }} />
                                                ))}
                                            </div>
                                        )}
                                        {item.submenu.map((sub, i) => (
                                            <div key={i} className={`flex items-center justify-between text-[9px] py-2 px-2 pl-8 rounded-[2.5rem] transition-colors transform transition-transform duration-200 cursor-pointer h-8 ${isSubmenuActive(sub) ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-[#41cc40]'}`}
                                                style={{
                                                    transform: openSubmenus[item.name] ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
                                                    transitionDelay: openSubmenus[item.name] ? `${i * 50}ms` : '0ms'
                                                }}
                                                onClick={() => router.push(sub.href)}>
                                                <span>{sub.name}</span>
                                                {sub.icon && (
                                                    <img src={sub.icon} alt={sub.name} className="w-2.5 h-2.5 object-contain mr-2" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );

    return (
        <aside className="fixed top-4 left-4 w-[13.2rem] h-[calc(100vh-2rem)] z-100">
            <nav ref={navRef} className="bg-black w-full h-full rounded-[2.5rem] p-4 text-white font-poppins overflow-y-auto relative z-50">
                <div className="flex items-center justify-center gap-1 mb-5 mt-3">
                    <img src="/img/logo.svg" alt="Logo" className="w-4 h-4 object-contain" />
                    <h2 className="text-[1.2rem] font-light"><span className="text-white">REWARD</span><span className="font-semibold">HIVE</span></h2>
                </div>
                <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>

                {renderSection("General", menuItems.general)}

                {userRole === 'superadmin' ? (
                    <>
                        <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                        {renderSection("Admin", menuItems.admin)}
                        <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                        {renderSection("Subscription", menuItems.superadmin)}
                    </>
                ) : (
                    <>
                        <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                        {renderSection("Product & Loyalties", menuItems.productLoyalties)}
                        <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                        {renderSection("Management", menuItems.management)}
                        <div className="mb-3 w-full border-t-[0.5px] border-[#636363]"></div>
                        {renderSection("Settings", menuItems.settings)}
                    </>
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;