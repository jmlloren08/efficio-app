import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {
    const series = [{
        name: 'Time Spent',
        data: [44, 55, 13, 43, 22, 56, 76, 88, 99, 11, 23, 34, 45, 67, 89]
    }];
    const options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        title: {
            text: 'Time Spent Per User',
            align: 'left'
        },
        xaxis: {
            categories: [
                'Jay',
                'Khen',
                'VM',
                'Lexter',
                'Guillermo',
                'Angel',
                'Gelo',
                'Dan',
                'Ram',
                'Kenna',
                'Nicole',
                'Bry',
                'Ronnel',
                'Gerald',
                'Perez',
            ],
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        }
    };

    return (
        <div className='bg-white p-4 sm:rounded-lg w-full'>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    );
}

export default BarChart;
