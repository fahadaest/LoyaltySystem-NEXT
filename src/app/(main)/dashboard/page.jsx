"use client";
import React from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "@/store/slices/authSlice";
import Metrics from "@/components/dashboard/Metrics";
import CustomerAnalytics from "@/components/dashboard/CustomerAnalytics";
import TopCustomers from "@/components/dashboard/TopCustomers";
import TopProducts from "@/components/dashboard/TopProducts";
import RewardAnalytics from "@/components/dashboard/RewardAnalytics";

const DashboardFinal = () => {
    const userRole = useSelector(selectUserRole);

    return (
        <main className="min-h-[78vh]">
            <div className="">
                {userRole === 'superadmin' ? (
                    <p>coming soon</p>
                ) : (
                    <>
                        <Metrics />
                        <CustomerAnalytics />
                        <TopCustomers />
                        <TopProducts />
                        <RewardAnalytics />
                    </>
                )}
            </div>
        </main>
    );
};

export default DashboardFinal;