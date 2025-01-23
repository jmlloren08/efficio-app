import React, { Suspense, useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Loader from '@/Components/Loader';

const ModalAddNewItem = React.lazy(() => import('../Components/Modals/ModalAddNewItem'));
const AccomplishmentTable = React.lazy(() => import('../Components/Tables/AccomplishmentTable'));
const AuthenticatedLayout = React.lazy(() => import('../Layouts/AuthenticatedLayout'));

export default function Reports() {

    const user = usePage().props.auth.user;
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [offices, setOffices] = useState([]);

    const fetchOffice = async () => {
        try {
            const response = await axios.get('/get-list-of-offices');
            setOffices(response.data);
        } catch (error) {
            console.error(error.response?.data?.message || 'Error fetching offices');
        }
    }

    useEffect(() => {
        fetchOffice();
    }, []);

    return (
        <Suspense fallback={<div><Loader /></div>}>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Reports
                    </h2>
                }
            >
                <Head title="Reports" />
                <div className="py-6">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        {/* Button to open the modal */}
                        <div>
                            {['Staff', 'Division Chief', 'Director', 'Undersecretary', 'Secretary'].includes(user.user_role) && (
                                <button
                                    onClick={() => setShowModal(true)}
                                    className='px-4 py-2 font-semibold bg-blue-500 text-white rounded hover:bg-blue-700'
                                >
                                    Add new accomplishment
                                </button>
                            )}
                            <div className='mt-6 overflow-x-auto'>
                                <AccomplishmentTable
                                    user_role={user.user_role}
                                    //selectedOffice={selectedOffice}
                                    refresh={refresh}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
                {showModal && (
                    <Suspense fallback={<div><Loader /></div>}>
                        <ModalAddNewItem
                            onClose={() => setShowModal(false)}
                            onRefresh={() => setRefresh((prev) => !prev)}
                        />
                    </Suspense>
                )}
            </AuthenticatedLayout>
        </Suspense>
    );
}