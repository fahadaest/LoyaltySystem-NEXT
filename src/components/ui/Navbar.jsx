"use client";

import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Navbar = ({ title = "Welcome Starbucks!" }) => {
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

                {/* Profile Section - Smaller */}
                <div className="relative  h-8 bg-white rounded-full border border-gray-300 flex gap-6 items-center pl-1.5 pr-1 cursor-pointer hover:bg-gray-50 transition-colors">
                    <div className="flex gap-1 text-xs items-center">
                        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="16" cy="16" r="16" fill="#41cc40" />
                            <g fill="white">
                                <circle cx="16" cy="12" r="4" />
                                <path d="M16 18c-4.5 0-8 2.5-8 5.5v1.5h16v-1.5c0-3-3.5-5.5-8-5.5z" />
                            </g>
                        </svg>
                        <div className="flex flex-col">
                            <span className="font-medium text-[0.6rem] text-black leading-tight">Starbucks</span>
                            <span className="text-gray-500 text-[0.5rem] leading-tight">Admin</span>
                        </div>
                    </div>
                    <div className=" w-6 h-6 bg-black rounded-full flex items-center justify-center">
                        <img
                            src="/img/general/arrow_right_white.svg"
                            alt="arrow"
                            className="w-[0.59rem] h-[0.59rem] object-contain transition-transform duration-200 translate-x-[0.5px]"
                        />
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;