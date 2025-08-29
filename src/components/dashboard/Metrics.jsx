import React from 'react';
import ReportCard from './subComponents/ReportCard';

const Metrics = () => {
    const metricsData = [
        {
            id: 1,
            iconUrl: "/img/metrics/total_customers.svg",
            title: "Total Customers",
            text: "2,847"
        },
        {
            id: 2,
            iconUrl: "/img/metrics/total_products.svg",
            title: "Total Products",
            text: "12"
        },
        {
            id: 3,
            iconUrl: "/img/metrics/loyalty_programs.svg",
            title: "Loyalty Programs",
            text: "7"
        },
        {
            id: 4,
            iconUrl: "/img/metrics/custom_wallet_card.svg",
            title: "Custom Wallet Cards",
            text: "3"
        },
        {
            id: 5,
            iconUrl: "/img/metrics/points_loyalty.svg",
            title: "Product Loyalty",
            text: "23"
        },
        {
            id: 6,
            iconUrl: "/img/metrics/points_loyalty.svg",
            title: "Point Loyalties",
            text: "15"
        }
    ];

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {metricsData.map((metric) => (
                    <ReportCard
                        key={metric.id}
                        iconUrl={metric.iconUrl}
                        title={metric.title}
                        text={metric.text}
                    />
                ))}
            </div>
        </div>
    );
};

export default Metrics;