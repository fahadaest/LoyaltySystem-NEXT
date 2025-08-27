"use client";

import React from "react";

const Sidebar = () => {
    const menuItems = {
        general: [
            {
                name: "Dashboard",
                icon: "🏠",
                svgSrc: "/img/sidebar/dashboard_light.svg",
                active: true
            }
        ],
        productLoyalties: [
            {
                name: "Products",
                icon: "📦",
                svgSrc: "/img/sidebar/product_light.svg",
            },
            {
                name: "Loyalty",
                icon: "🎯",
                svgSrc: "/img/sidebar/loyalty_light.svg",
            },
            {
                name: "Cards",
                icon: "💳",
                svgSrc: "/img/sidebar/card_light.svg",
            }
        ],
        management: [
            {
                name: "Customers",
                icon: "👥",
                svgSrc: "/img/sidebar/customers_light.svg",
            },
            {
                name: "Sales Person",
                icon: "👨‍💼",
                svgSrc: "/img/sidebar/salesPerson_light.svg",
            },
            {
                name: "Managers",
                icon: "👩‍💼",
                svgSrc: "/img/sidebar/managers_light.svg",
            }
        ],
        settings: [
            {
                name: "Settings",
                icon: "⚙️",
                svgSrc: "/img/sidebar/settings_light.svg",
                hasArrow: true
            }
        ]
    };

    return (
        <aside className="fixed top-4 left-4 w-[13.2rem] h-[calc(100vh-2rem)] z-100">
            <nav className="bg-black w-full h-full rounded-[2rem] p-5 text-white font-poppins overflow-y-auto">
                {/* Logo */}
                <div className="flex items-center justify-center gap-1 mb-4">
                    <img
                        src="/img/logo.svg"
                        alt="Logo"
                        className="w-4 h-4 object-contain"
                    />
                    <h2 className="text-lg font-light">
                        <span className="text-white">REWARD</span>
                        <span className="font-semibold">HIVE</span>
                    </h2>
                </div>

                <div className="mb-4 w-full h-0 top-[446px] border-t-[0.5px] border-[#636363]"></div>

                {/* General Section */}
                <section className="mb-6">
                    <h3 className="text-[0.65rem] font-bold text-[#41cc40] mb-3 tracking-wide">General</h3>
                    {menuItems.general.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.active ? 'bg-white text-black' : 'text-white'} rounded-full px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100 hover:text-black transition-colors`}
                        >
                            {item.svgSrc ? (
                                <img
                                    src={item.svgSrc}
                                    alt={item.name}
                                    className="w-4 h-4 object-contain"
                                />
                            ) : (
                                <span className="text-sm">{item.icon}</span>
                            )}
                            <span className="text-[0.7rem] font-medium">{item.name}</span>
                        </div>
                    ))}
                </section>

                {/* Product & Loyalties Section */}
                <section className="mb-6">
                    <h3 className="text-xs font-bold text-[#41cc40] mb-3 uppercase tracking-wide">
                        Product & Loyalties
                    </h3>
                    <ul className="space-y-3">
                        {menuItems.productLoyalties.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-[#41cc40] hover:bg-gray-800 rounded-lg transition-colors">
                                {item.svgSrc ? (
                                    <img
                                        src={item.svgSrc}
                                        alt={item.name}
                                        className="w-4 h-4 object-contain"
                                    />
                                ) : (
                                    <span className="text-sm">{item.icon}</span>
                                )}
                                <span className="text-sm font-medium">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Management Section */}
                <section className="mb-6">
                    <h3 className="text-xs font-bold text-[#41cc40] mb-3 uppercase tracking-wide">
                        Management
                    </h3>
                    <ul className="space-y-3">
                        {menuItems.management.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:text-[#41cc40] hover:bg-gray-800 rounded-lg transition-colors">
                                {item.svgSrc ? (
                                    <img
                                        src={item.svgSrc}
                                        alt={item.name}
                                        className="w-4 h-4 object-contain"
                                    />
                                ) : (
                                    <span className="text-sm">{item.icon}</span>
                                )}
                                <span className="text-sm font-medium">{item.name}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Settings Section */}
                <section>
                    <h3 className="text-xs font-bold text-[#41cc40] mb-3 uppercase tracking-wide">
                        Settings
                    </h3>
                    {menuItems.settings.map((item, index) => (
                        <div key={index} className="flex items-center justify-between px-4 py-2 cursor-pointer hover:text-[#41cc40] hover:bg-gray-800 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                {item.svgSrc ? (
                                    <img
                                        src={item.svgSrc}
                                        alt={item.name}
                                        className="w-4 h-4 object-contain"
                                    />
                                ) : (
                                    <span className="text-sm">{item.icon}</span>
                                )}
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            {item.hasArrow && (
                                <span className="text-xs">▶</span>
                            )}
                        </div>
                    ))}
                </section>
            </nav>
        </aside>
    );
};

export default Sidebar;