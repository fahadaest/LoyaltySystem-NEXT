import React from 'react';
import ReportCard from '../ui/ReportCard';

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
    ];

    return (
        <div className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
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