import React, { Suspense, useEffect, useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '@/Components/Loader';

const ModalAddNewItem = React.lazy(() => import('../Components/Modals/ModalAddNewItem'));
const AccomplishmentTable = React.lazy(() => import('../Components/Tables/AccomplishmentTable'));
const AuthenticatedLayout = React.lazy(() => import('../Layouts/AuthenticatedLayout'));

export default function Reports({ accomplishments }) {

    const user = usePage().props.auth.user;
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Reports
                </h2>
            }
        >
            <Head title="Reports" />
            <div className="py-6">
                <div className="mx-auto max-w-full sm:px-6 lg:px-8">
                    {/* Button to open the modal */}
                    <div>
                        {['Staff', 'Division Chief', 'Director', 'Undersecretary', 'Secretary'].includes(user.user_role) && (
                            <div className='flex items-center justify-end'>
                                < Link
                                    href={route('reports.create')}
                                    className='px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-700'
                                >
                                    Create
                                </Link>
                            </div>
                        )}
                        <div className='mt-4'>
                            <AccomplishmentTable
                                user_role={user.user_role}
                                //selectedOffice={selectedOffice}
                                refresh={refresh}
                                accomplishments={accomplishments}
                            />
                        </div>
                    </div>
                </div>
            </div >
            <ToastContainer />
            {
                showModal && (
                    <Suspense fallback={<div><Loader /></div>}>
                        <ModalAddNewItem
                            onClose={() => setShowModal(false)}
                            onRefresh={() => setRefresh((prev) => !prev)}
                        />
                    </Suspense>
                )
            }
        </AuthenticatedLayout >
    );
}
