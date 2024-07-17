import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ComplianceChart from './ComplianceChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const CircularGraph = ({ data }: any) => {

    const metrics = Object.keys(data[0]).filter(key => key !== 'Department');

    const aggregatedData = metrics.map(metric =>
        data.reduce((sum: number, item: { [x: string]: string; }) => sum + (parseInt(item[metric], 10) || 0), 0)
    );


    const pieChartData = {
        labels: metrics,
        datasets: [
            {
                data: aggregatedData,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };



    return (
        <div className='flex flex-wrap justify-center items-center gap-6 py-24'>
            <div className="">
                <Pie
                    data={pieChartData}
                    options={{
                        plugins: {
                            legend: {
                                position: 'bottom',
                            }
                        }
                    }} />
            </div>
            <div className="">
                <ComplianceChart data={data} metrics={metrics} />
            </div>

        </div>
    );
};

export default CircularGraph;
