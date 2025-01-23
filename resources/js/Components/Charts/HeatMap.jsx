import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const HeatMap = () => {

    const [chartData, setChartData] = useState({
        series: [],
        categories: []
    });

    useEffect(() => {
        fetchMockData();
    }, []);

    const fetchMockData = () => {
        const mockData = [
            { office: 'ODDGO', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Facilitation', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Manpower', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Assistance', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Budget', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Turnaround Time', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Approval', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Procurement', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'ODDGO', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-1', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-2', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-3', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-4', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-5', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-6', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-7', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'RFO-8', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-A', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-B', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-C', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'CMEO-D', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-A', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-B', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-C', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 },
            { office: 'BRO-D', issues_concerns: 'Signatory', counts: Math.floor(Math.random() * 15) + 1 }
        ];
        processChartData(mockData);
    };

    const processChartData = (yearData) => {
        if (!yearData) return;

        const categories = [];
        const seriesData = {};

        yearData.forEach(item => {
            if (!categories.includes(item.office)) {
                categories.push(item.office);
            }
            const subcategory = item.issues_concerns;
            seriesData[subcategory] = seriesData[subcategory] || [];
            seriesData[subcategory].push({ x: item.office, y: isNaN(item.counts) ? null : item.counts });
        });

        const series = Object.keys(seriesData).map(subcategory => ({
            name: subcategory,
            data: seriesData[subcategory]
        }));

        setChartData({
            series: series,
            categories: categories,
        });
    };

    const options = {
        chart: {
            type: 'heatmap',
            height: 950,
            toolbar: {
                show: true
            }
        },
        plotOptions: {
            heatmap: {
                colorScale: {
                    inverse: true
                }
            }
        },
        xaxis: {
            categories: chartData.categories,
            position: 'top',
            labels: {
                align: 'center',
                offsetX: 0,
                offsetY: 0,
                style: {
                    fontSize: '9px',
                    fontWeight: 'bold',
                }
            }
        },
        yaxis: {
            title: {
                text: 'Issues/Concerns',
                align: 'center',
                offsetX: 5,
                offsetY: 0
            },
        },
        tooltip: {
            y: {
                formatter: (val) => (`Data: ${isNaN(val) || val === null ? 'NDA' : val}`)
            }
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '12px',
                fontWeight: 'normal',
                colors: ['#000']
            }
        },
        colors: ['#e74c3c'],
        title: {
            text: 'HeatMap: Issues/Concerns by Office',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold'
            }
        }
    }

    return (
        <div className='bg-white p-4 sm:rounded-lg w-full'>
            <ReactApexChart
                options={options}
                series={chartData.series}
                type='heatmap'
                className='mt-6'
                height={450}
            />
        </div>
    );
}

export default HeatMap;

