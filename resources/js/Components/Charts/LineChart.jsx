import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
    const [state, setState] = useState({
        series: [{
            name: "Data",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 165, 170, 180]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Monthly Accomplishment Trends',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            }
        },
    });

    return (
        <div className='bg-white p-4 sm:rounded-lg w-full'>
            <ReactApexChart options={state.options} series={state.series} type="line" height={350} />
        </div>
    );
}

export default LineChart;
