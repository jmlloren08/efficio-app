import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AuthenticatedLayout = React.lazy(() => import('@/Layouts/AuthenticatedLayout'), {
    fallback: <div>Loading...</div>,
});

export default function Create({ labels }) {

    const fileInputRef = useRef(null);
    const { data, setData, post, errors, processing } = useForm({
        week_ending_date: '',
        accomplishments_this_week: '',
        action_items_next_week: '',
        issues_or_concerns: '',
        needs_help: '',
        attachments: '',
        attachment_type: '',
        label: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        post(route('reports.index'));
    }

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (name === 'attachment_type') {
            setData('attachments', null);
            setData(name, value);
            if (value === 'upload') {
                setTimeout(() => {
                    fileInputRef.current?.click();
                }, 0);
            }
        } else {
            setData(name, type === 'file' ? files[0] : value);
        }
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
                    <div className="flex gap-4">
                        <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-1/4'>
                            <h1 className='font-medium border-b border-gray-200 dark:border-gray-700 mb-4'>Previous week</h1>
                            {/* Left side content */}
                            <ul className="list-inside list-disc space-y-2">
                                <li>List item 1</li>
                                <li>List item 2</li>
                                <li>List item 3</li>
                            </ul>
                        </div>
                        <div className='bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 w-3/4'>
                            <h1 className='font-medium border-b border-gray-200 dark:border-gray-700'>This week</h1>
                            {/* Right side form */}
                            <form onSubmit={handleSubmit} className='mb-4'>
                                <div className='flex items-center justify-end'>
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 text-sm font-semibold mt-4 bg-blue-500 text-white rounded hover:bg-blue-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                                </svg>
                                                Please wait...
                                            </span>
                                        ) : 'Submit'}
                                    </button>
                                </div>
                                <div className='overflow-y-auto max-h-full space-y-4'>
                                    <div className='w-1/2'>
                                        <label>Week Ending Date <span className='text-red-500' title='Required'>*</span></label>
                                        <input
                                            type='date'
                                            name='week_ending_date'
                                            value={data.week_ending_date || ''}
                                            onChange={handleChange}
                                            className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                            required
                                        />
                                        <InputError message={data.errors?.week_ending_date} className='mt-2' />
                                    </div>
                                    <div>
                                        <label>What have you done this week? <span className='text-red-500' title='Required'>*</span></label>
                                        <ReactQuill
                                            theme='snow'
                                            value={data.accomplishments_this_week || ''}
                                            onChange={(content) => setData('accomplishments_this_week', content)}
                                            className='bg-gray-100 active:border-b-2 active:border-blue-500'
                                            autoFocus={true}
                                            required
                                        />
                                        <InputError message={data.errors?.accomplishments_this_week} className='mt-2' />
                                    </div>
                                    <div className='mb-4'>
                                        <label>What is the plan for next week? <span className='text-red-500' title='Required'>*</span></label>
                                        <ReactQuill
                                            theme='snow'
                                            value={data.action_items_next_week || ''}
                                            onChange={(content) => setData('action_items_next_week', content)}
                                            className='bg-gray-100 active:border-b-2 active:border-blue-500'
                                            required
                                        />
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <label className='mr-2 font-semibold'>Do you need any help?</label>
                                        <div className='flex items-center hover:cursor-pointer' onClick={() => setData('needs_help', '1')}>
                                            <input
                                                type='radio'
                                                className='mr-1 hover:cursor-pointer'
                                                name='needs_help'
                                                value='1'
                                                checked={data.needs_help === '1'}
                                                onChange={handleChange}
                                            />
                                            <span>Yes</span>
                                        </div>
                                        <div className='flex items-center hover:cursor-pointer' onClick={() => setData('needs_help', '0')}>
                                            <input
                                                type='radio'
                                                className='mr-1 hover:cursor-pointer'
                                                name='needs_help'
                                                value='0'
                                                checked={data.needs_help === '0'}
                                                onChange={handleChange}
                                            />
                                            <span>No</span>
                                        </div>
                                    </div>
                                    <InputError message={data.errors?.needs_help} className='mt-2' />
                                </div>
                                <div className='mt-4'>
                                    <label>Please provide the details about what kind of help you need</label>
                                    <ReactQuill
                                        theme='snow'
                                        value={data.issues_or_concerns || ''}
                                        onChange={(content) => setData('issues_or_concerns', content)}
                                        className='bg-gray-100 active:border-b-2 active:border-blue-500'
                                    />
                                    <InputError message={data.errors?.issues_or_concerns} className='mt-2' />
                                </div>
                                <div className='flex items-center justify-between gap-4 mt-4'>
                                    <div className='w-full'>
                                        <label>Attachments (MOVs) <span className='text-red-500' title='Required'>*</span></label>
                                        <div className='space-x-2'>
                                            {/* Dropdown to select attachment type */}
                                            <select
                                                name='attachment_type'
                                                value={data.attachment_type || ''}
                                                onChange={handleChange}
                                                className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                            >
                                                <option value="" disabled>Select attachment type</option>
                                                <option value="upload">Upload from computer</option>
                                                <option value="link">Attach link</option>
                                            </select>
                                            {/* Conditional rendering based on attachment type */}
                                            {data.attachment_type === 'upload' && (
                                                <>
                                                    <input
                                                        ref={fileInputRef}
                                                        name='attachments'
                                                        type='file'
                                                        onChange={(e) => setData({ ...data, attachments: e.target.files[0] })}
                                                        className='hidden'
                                                        required
                                                    />
                                                    {/* Display file name if file is selected */}
                                                    {data.attachments && (<p className='mt-1 text-sm text-gray-500'>{data.attachments.name}</p>)}
                                                </>
                                            )}
                                            {data.attachment_type === 'link' && (
                                                <input
                                                    name='attachments'
                                                    type='text'
                                                    value={data.attachments || ''}
                                                    onChange={handleChange}
                                                    placeholder='Enter link'
                                                    className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                                    autoFocus={true}
                                                    required
                                                />
                                            )}
                                        </div>
                                        <InputError message={data.errors?.attachments} className='mt-2' />
                                    </div>
                                    <div className='w-full'>
                                        <label>Apply Label <span className='text-red-500' title='Required'>*</span></label>
                                        <select
                                            name='label'
                                            value={data.label || ''}
                                            onChange={handleChange}
                                            className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                            required
                                        >
                                            <option value="">None</option>
                                            {labels.map((label, index) => (
                                                <option
                                                    key={index}
                                                    value={label.name}
                                                >
                                                    {label.name}
                                                </option>
                                            ))}
                                        </select>
                                        <InputError message={data.errors?.label} className='mt-2' />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout >
        </Suspense >
    );
}

