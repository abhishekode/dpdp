import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale, Legend, registerables } from 'chart.js';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, ...registerables);


const ComplianceChart = ({ data, metrics }: any) => {
    const actualData = metrics.map((metric: string | number) => 
        data.reduce((sum: number, item: { [x: string]: string; }) => sum + (parseInt(item[metric], 10) || 0), 0)
    );

    const targetData = metrics.map(() => 50); // (replace with actual logic)

    const barChartData = {
        labels: metrics,
        datasets: [
            {
                label: 'Actual',
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
                borderWidth: 1,
                data: actualData,
            },
            {
                label: 'Target',
                backgroundColor: '#FF6384',
                borderColor: '#FF6384',
                borderWidth: 1,
                data: targetData,
            },
        ],
    };


    return <Bar data={barChartData}  />;
}

export default ComplianceChart
