import React from 'react';
import ReportCard from '../ui/ReportCard';

const Metrics = () => {
    const metricsData = [
        {
            id: 1,
            iconUrl: "/img/metrics/total_customers.svg",
            title: "Total Customers (last 30 days)",
            text: "2,847",
            percentage: 15.2,
            trend: "up"
        },
        {
            id: 2,
            iconUrl: "/img/metrics/roi.svg",
            title: "ROI (last 30 days)",
            text: "12%",
            percentage: 8.7,
            trend: "up"
        },
        {
            id: 3,
            iconUrl: "/img/metrics/loyalty_programs.svg",
            title: "Retention Rate (last 30 days)",
            text: "7%",
            percentage: 3.2,
            trend: "down"
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
                        percentage={metric.percentage}
                        trend={metric.trend}
                    />
                ))}
            </div>
        </div>
    );
};

export default Metrics;