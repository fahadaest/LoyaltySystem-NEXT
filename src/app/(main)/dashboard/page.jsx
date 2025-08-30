"use client";
import React from "react";
import Metrics from "@/components/dashboard/Metrics";
import CustomerAnalytics from "@/components/dashboard/CustomerAnalytics";
import TopCustomers from "@/components/dashboard/TopCustomers";
import TopProducts from "@/components/dashboard/TopProducts";
import RewardAnalytics from "@/components/dashboard/RewardAnalytics";

const DashboardFinal = () => {
    return (
        <main className="min-h-[78vh]">

            <div className="">
                <Metrics />
                <CustomerAnalytics />
                <TopCustomers />
                <RewardAnalytics />
                <TopProducts />
            </div>

        </main>
    );
};

export default DashboardFinal;