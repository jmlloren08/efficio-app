import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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

    // const fetchSubOffice = async () => {
    //     try {
    //         const response = await axios.get('/get-list-of-sub-offices', {
    //             params: { selectedOffice }
    //         });
    //         setSubOffices(response.data);
    //     } catch (error) {
    //         console.error(error.response?.data?.message || 'Error fetching sub offices');
    //     }
    // }

    // const fetchAuthors = async () => {
    //     try {
    //         const response = await axios.get('/get-list-of-authors');
    //         setAuthors(response.data);
    //     } catch (error) {
    //         console.error(error.response?.data?.message || 'Error fetching authors');
    //     }
    // }

    // useEffect(() => {
    //     if (selectedOffice) {
    //         fetchSubOffice();
    //     }
    // }, [selectedOffice]);

    useEffect(() => {
        fetchOffice();
        // fetchLabel();
        // fetchAuthors();
    }, []);

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
                        {/* {user.user_role !== 'Staff' && (
                            <div className='flex sm:flex-cols-2 flex-rows-1 gap-4 mt-4'>
                                <div className='w-1/2'>
                                    <label htmlFor="office" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        Filter by Office
                                    </label>
                                    <select
                                        name="office"
                                        id="office"
                                        value={selectedOffice.name}
                                        onChange={(e) => setSelectedOffice(e.target.value)}
                                        className='block w-full mt-1 text-base rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                    >
                                        <option value="">All</option>
                                        {offices.map((office, index) => (
                                            <option
                                                key={index}
                                                value={office.id}
                                            >
                                                {office.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="suboffice" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        Filter by Sub Office
                                    </label>
                                    <select
                                        name="suboffice"
                                        id="suboffice"
                                        value={selectedSubOffice}
                                        onChange={(e) => setSelectedOffice(e.target.value)}
                                        className='block w-full mt-1 text-base rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                    >
                                        <option value="">All</option>
                                        {offices.map((suboffice, index) => (
                                            <option
                                                key={index}
                                                value={suboffice.id}
                                            >
                                                {suboffice.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="office" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        Filter by Author
                                    </label>
                                    <select
                                        name="author"
                                        id="author"
                                        value={selectedAuthor}
                                        onChange={(e) => setSelectedAuthor(e.target.value)}
                                        className='block w-full mt-1 text-base rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                    >
                                        <option value="" disabled>All</option>
                                        {authors.map((author, index) => (
                                            <option
                                                key={index}
                                                value={author.id}
                                            >
                                                {author.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="label" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                        Filter by Label
                                    </label>
                                    <select
                                        name="label"
                                        id="label"
                                        value={selectedLabel}
                                        onChange={(e) => setSelectedLabel(e.target.value)}
                                        className='block w-full mt-1 text-base rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                    >
                                        <option value="">All</option>
                                        {labels.map((label, index) => (
                                            <option
                                                key={index}
                                                value={label.id}
                                            >
                                                {label.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )} */}
                        {/* {user.user_role === 'Staff' && (
                            <div className='w-1/2 mt-4'>
                                <label htmlFor="label" className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
                                    Filter by Label
                                </label>
                                <select
                                    name="label"
                                    id="label"
                                    value={selectedLabel}
                                    onChange={(e) => setSelectedLabel(e.target.value)}
                                    className='block w-full mt-1 text-base rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                >
                                    <option value="">All</option>
                                    {labels.map((label, index) => (
                                        <option
                                            key={index}
                                            value={label.id}
                                        >
                                            {label.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )} */}
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
                <ModalAddNewItem
                    onClose={() => setShowModal(false)}
                    onRefresh={() => setRefresh((prev) => !prev)}
                />
            )}
        </AuthenticatedLayout>
    );
}