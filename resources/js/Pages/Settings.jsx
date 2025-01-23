import React from 'react';
import { Head, usePage } from '@inertiajs/react';

const AuthenticatedLayout = React.lazy(() => import('@/Layouts/AuthenticatedLayout'));

export default function Settings() {

    const user = usePage().props.auth.user;
    
    return (
        
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Settings
                </h2>
            }
        >
            <Head title="Settings" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <p className='text-red-400 text-sm font-light'>This is page is currently under ongoing development. Thank you!</p>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}