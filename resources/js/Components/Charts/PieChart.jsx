import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = () => {
    const options = {
        series: [30, 25, 20, 25],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['ODDGO', 'RFO', 'CMEO', 'BRO'],
        title: {
            text: 'User Distribution by Office',
            align: 'left'
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    return (
        <div className='bg-white p-4 sm:rounded-lg w-full h-full'>
            <ReactApexChart options={options} series={options.series} type="pie" width={380} />
        </div>
    );
}

export default PieChart;
