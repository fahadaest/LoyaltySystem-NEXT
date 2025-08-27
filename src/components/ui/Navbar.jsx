"use client";

import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Navbar = ({ title = "Welcome Starbucks!" }) => {
    return (
        <nav className="flex justify-between items-center w-full px-6 py-4 bg-transparent">
            {/* Left side - Title and Breadcrumbs */}
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-black font-poppins mb-1">
                    {title}
                </h1>
                <Breadcrumbs className="text-sm">
                    <span className="text-gray-500 hover:text-black cursor-pointer">Dashboard</span>
                    <span className="text-gray-400">Overview</span>
                </Breadcrumbs>
            </div>

            {/* Right side - Search, Notifications, Profile */}
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative w-52 h-10 rounded-full border border-gray-300 flex items-center px-4 bg-white">
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="text-sm text-gray-600 bg-transparent border-none outline-none flex-1"
                    />
                    <div className="ml-auto w-6 h-6 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                        <span className="text-white text-xs">🔍</span>
                    </div>
                </div>

                {/* Notification Icon */}
                <div className="relative w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <span className="text-lg">🔔</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-gray-300"></div>

                {/* Profile Section */}
                <div className="relative w-44 h-10 bg-white rounded-full border border-gray-300 flex items-center pl-2 pr-4 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="w-7 h-7 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">S</span>
                    </div>
                    <div className="flex flex-col text-sm flex-1">
                        <span className="font-medium text-black">Starbucks</span>
                        <span className="text-gray-500 text-xs">Admin</span>
                    </div>
                    <div className="ml-auto w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">▼</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;