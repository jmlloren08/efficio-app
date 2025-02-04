import React, { Suspense, useRef, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const PreviousWeek = React.lazy(() => import('@/Components/Tables/PreviousWeek'));
const CreateAccomplishment = React.lazy(() => import('@/Components/Forms/CreateAccomplishment'));
const Success = React.lazy(() => import('@/Components/Flash/Success'));
const ErrorMessage = React.lazy(() => import('@/Components/Flash/ErrorMessage'));
const AuthenticatedLayout = React.lazy(() => import('@/Layouts/AuthenticatedLayout'));

export default function Create({ labels, accomplishments, flash }) {

    const user = usePage().props.auth.user;
    const fileInputRef = useRef(null);
    const { data, setData, post, errors, processing } = useForm({
        week_ending_date: '',
        accomplishments_this_week: '',
        action_items_next_week: '',
        planned_hours_worked: '',
        actual_hours_worked: '',
        need_help: '',
        issues_or_concerns: '',
        attachments: '',
        attachment_type: '',
        label: ''
    });
    const [selectedData, setSelectedData] = useState(null);
    const [flashMessage, setFlashMessage] = useState(null);
    const [redirecting, setRedirecting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reports.index'), {
            onSuccess: () => {
                setFlashMessage({
                    type: 'success',
                    message: flash.success
                });
                setRedirecting(true);
                setTimeout(() => {
                    window.location.href = route('reports.index');
                }, 5000);
            },
            onError: () => {
                setFlashMessage({
                    type: 'error',
                    message: flash.error
                });
                setRedirecting(true);
                setTimeout(() => {
                    window.location.href = route('reports.create');
                }, 5000);
            }
        });
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'attachment_type') {
            setData('attachments', null);
            setData(name, value);
            if (value === 'file') {
                setTimeout(() => {
                    fileInputRef.current?.click();
                }, 0);
            }
        } else {
            setData(name, type === 'file' ? files[0] : value);
        }
    }

    const handleItemClick = (accomplishment) => {
        setSelectedData(accomplishment);
    }

    const handleBackToCreate = () => {
        setSelectedData(null);
    }

    const handleLinkUrl = (url) => {
        url.preventDefault();
        window.location.href = url;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Weekly update
                    </h2>
                }
            >
                <Head title="Create" />
                <div className="py-6">
                    {/* Flash message */}
                    {flashMessage && (
                        <div className="my-4">
                            {flashMessage.type === 'success' && <Success flash={flash} />}
                            {flashMessage.type === 'error' && <ErrorMessage flash={flash} />}
                        </div>
                    )}
                    {!redirecting && (
                        <div className="flex gap-4">
                            <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-1/4'>
                                <h1 className='font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 mb-4'>Previous week</h1>
                                {/* Left side content (Previous week accomplishments) */}
                                <div className="space-y-2">
                                    {accomplishments.data.length > 0 ? (
                                        accomplishments.data.map((accomplishment, index) => (
                                            <div
                                                key={index}
                                                className="text-gray-600 transition duration-300 ease-in-out hover:scale-110 hover:text-blue-500 cursor-pointer hover:bg-gray-100 py-2 px-2"
                                                onClick={() => handleItemClick(accomplishment)}
                                            >
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex flex-col items-center justify-center bg-blue-100 text-blue-800 text-xs px-2 rounded'>
                                                        <span className='font-medium'>
                                                            {new Date(accomplishment.week_ending_date).toLocaleDateString('en-US', { day: '2-digit' })}
                                                        </span>
                                                        <span>
                                                            {new Date(accomplishment.week_ending_date).toLocaleDateString('en-US', { month: 'short' })}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs">{accomplishment.user_id === user.id ? '(You)' : accomplishment.user.name}</p>
                                                    <span className='bg-green-100 text-green-800 text-[10px] px-1 rounded border border-green-500'>Submitted</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No previous accomplishments found.</p>
                                    )}
                                </div>
                                <div className="rounded mt-4">
                                    <ol className="flex justify-end gap-1 text-xs font-medium">
                                        {accomplishments.links.map((link, index) => (
                                            <li key={index}>
                                                {link.url ? (
                                                    <Link
                                                        href={link.url}
                                                        className={`inline-flex size-8 items-center justify-center rounded border ${link.active ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900'
                                                            } text-center leading-8 rtl:rotate-180`}
                                                    >
                                                        {link.label.includes('Previous') || link.label.includes('Next') ? (
                                                            <span className="sr-only">{link.label}</span>
                                                        ) : (
                                                            link.label
                                                        )}
                                                        {link.label.includes('Previous') && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="size-3"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                        {link.label.includes('Next') && (
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="size-3"
                                                                viewBox="0 0 20 20"
                                                                fill="currentColor"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        )}
                                                    </Link>
                                                ) : (
                                                    <span
                                                        className={`inline-flex size-8 items-center justify-center rounded border ${link.active ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white text-gray-900'
                                                            } text-center leading-8`}
                                                    >
                                                        <span className="sr-only">{link.label}</span>
                                                    </span>
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                                {/* End of left side content */}
                            </div>
                            <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-3/4'>
                                {/* Right side form (Creation)*/}
                                {selectedData ? (
                                    // Display selected data (Read-only view)
                                    <PreviousWeek
                                        selectedData={selectedData}
                                        handleBackToCreate={handleBackToCreate}
                                    />
                                ) : (
                                    <CreateAccomplishment
                                        labels={labels}
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                        processing={processing}
                                        handleChange={handleChange}
                                        handleSubmit={handleSubmit}
                                        fileInputRef={fileInputRef}
                                        post={post}
                                    />
                                )}
                                {/* End of form */}
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout >
        </Suspense >
    );
}

