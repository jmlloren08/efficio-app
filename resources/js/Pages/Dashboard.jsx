import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useState } from 'react';

const LineChart = React.lazy(() => import('../Components/Charts/LineChart'));
const PieChart = React.lazy(() => import('../Components/Charts/PieChart'));
const BarChart = React.lazy(() => import('../Components/Charts/BarChart'));
const PieChartTimeAllocation = React.lazy(() => import('../Components/Charts/PieChartTimeAllocation'));
const HeatMap = React.lazy(() => import('../Components/Charts/HeatMap'));

export default function Dashboard({ auth }) {

    const user = usePage().props.auth.user;

    return (

        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                    <p className='text-sm text-red-400 font-light'>(Note: The data displayed here is just a mock data. The real-time data is currently under ongoing development. Thank you!)</p>
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <article className="sm:w-1/3 flex flex-col items-start rounded-lg border border-gray-100 bg-white p-6 justify-center">
                    <div className='flex flex-row items-center gap-4'>
                        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-4xl font-medium text-gray-900">240</p>
                            <p className="text-sm text-gray-500">Total Users</p>
                        </div>
                    </div>
                </article>
                <article className="sm:w-1/3 flex flex-col items-start rounded-lg border border-gray-100 bg-white p-6 justify-center">
                    <div className='flex flex-row items-center gap-4'>
                        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-4xl font-medium text-gray-900">203</p>
                            <p className="text-sm text-gray-500">Active Users</p>
                        </div>
                    </div>
                </article>
                <article className="sm:w-1/3 flex flex-col items-start rounded-lg border border-gray-100 bg-white p-6 justify-center">
                    <div className='flex flex-row items-center gap-4'>
                        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-4xl font-medium text-gray-900">100</p>
                            <p className="text-sm text-gray-500">Total Accomplishments</p>
                        </div>
                    </div>
                </article>
                <article className="sm:w-1/3 flex flex-col items-start rounded-lg border border-gray-100 bg-white p-6 justify-center">
                    <div className='flex flex-row items-center gap-4'>
                        <span className="rounded-full bg-blue-100 p-3 text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                            </svg>
                        </span>
                        <div>
                            <p className="text-4xl font-medium text-gray-900">65</p>
                            <p className="text-sm text-gray-500">Issues Reported</p>
                        </div>
                    </div>
                </article>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <div className='w-full sm:w-8/12'>
                    <LineChart />
                </div>
                <div className='w-full sm:w-4/12'>
                    <PieChart />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                <div className='w-full sm:w-4/12'>
                    <PieChartTimeAllocation />
                </div>
                <div className='w-full sm:w-8/12'>
                    <BarChart />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 mt-6'>
                <HeatMap />
            </div>

        </AuthenticatedLayout>
    );
}
