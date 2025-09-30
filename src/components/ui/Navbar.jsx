"use client";

import React, { useState, useRef, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/navigation";

const Navbar = ({ title = "Welcome Starbucks!" }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        // Clear token from cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Redirect to sign-in page
        router.push("/sign-in");
    };

    const handleProfileClick = () => {
        // Add your profile navigation logic here
        router.push("/profile");
    };

    return (
        <nav className="flex justify-between items-center w-full pr-6 py-5 bg-transparent">
            {/* Left side - Title and Breadcrumbs */}
            <div className="flex flex-col">
                <h1 className="text-[1rem] font-bold text-black font-poppins">
                    {title}
                </h1>
                <Breadcrumbs className="[&>*:not(span)]:text-[0.7rem] ">
                    <span className="text-gray400 hover:text-black cursor-pointer text-[0.6rem]">Dashboard</span>
                    <span className="text-gray-900 text-[0.6rem]">Overview</span>
                </Breadcrumbs>
            </div>

            {/* Right side - Search, Notifications, Profile */}
            <div className="flex items-center gap-3">
                {/* Search Bar - Smaller */}
                <div className=" h-8 rounded-full border border-gray-300 flex items-center px-3 pl-3 pr-1 bg-white">
                    <input
                        type="text"
                        placeholder="Search Here..."
                        className="text-[0.7rem] text-gray-600 bg-transparent border-none outline-none flex-1"
                    />
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <img
                            src="/img/general/search.svg"
                            alt="arrow"
                            className="w-[0.59rem] h-[0.59rem] object-contain transition-transform duration-200 translate-x-[0.5px]"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="h-5 w-px bg-gray-300"></div>

                {/* Profile Section with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <div
                        className="relative h-8 bg-white rounded-full border border-gray-300 flex gap-6 items-center pl-1.5 pr-1 cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <div className="flex gap-1 text-xs items-center">
                            <img
                                src="/img/general/profile_green.svg"
                                alt="Profile image"
                                className="w-[24px] h-[24px] object-contain rounded-lg"
                            />
                            <div className="flex flex-col">
                                <span className="font-medium text-[0.6rem] text-black leading-tight">Starbucks</span>
                                <span className="text-gray-500 text-[0.5rem] leading-tight">Admin</span>
                            </div>
                        </div>
                        <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                            <img
                                src="/img/general/arrow_right_white.svg"
                                alt="arrow"
                                className={`w-[0.59rem] h-[0.59rem] object-contain transition-transform duration-200 ${isDropdownOpen ? "rotate-90" : ""
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden z-50">
                            <button
                                onClick={handleProfileClick}
                                className="w-full px-4 py-2.5 text-left text-[0.7rem] text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                            >
                                <span>My Profile</span>
                            </button>
                            <div className="h-px bg-gray-200"></div>
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2.5 text-left text-[0.7rem] text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;