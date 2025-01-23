import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChartTimeAllocation = () => {
    const options = {
        series: [80, 30, 20, 10, 10],
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ['Development', 'Administration', 'Orientation', 'Training', 'Communication'],
        title: {
            text: 'Time Allocation by Label',
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

export default PieChartTimeAllocation;
