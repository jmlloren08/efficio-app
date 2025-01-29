import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import AttachmentLinks from '../AttachmentLinks';
import Loader from '../Loader';
import React, { useState, useEffect } from 'react';

const PreviousWeek = ({ selectedData, handleBackToCreate }) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 100)
    }, [])

    return loading ? (
        <Loader />
    ) : (
        <div>
            <h1 className='font-medium text-gray-500 border-b border-gray-200 dark:border-gray-700 mb-4'>
                View Accomplishment
            </h1>
            <div className='space-y-4'>
                <div>
                    <label className='font-semibold'>Week Ending Date</label>
                    <p className='bg-gray-100 p-2'>{selectedData.week_ending_date}</p>
                </div>
                <div>
                    <label className='font-semibold'>Done this week</label>
                    <ReactQuill
                        value={selectedData.accomplishments_this_week}
                        readOnly={true}
                        theme='bubble'
                        className='bg-gray-100'
                    />
                </div>
                <div>
                    <label className='font-semibold'>Plan for next week</label>
                    <ReactQuill
                        value={selectedData.action_items_next_week}
                        readOnly={true}
                        theme='bubble'
                        className='bg-gray-100'
                    />
                </div>
                <div className='flex gap-4'>
                    <div>
                        <label className='font-semibold'>Planned Hours Worked</label>
                        <p
                            className='bg-gray-100 dark:bg-gray-700 p-2'
                            dangerouslySetInnerHTML={{ __html: selectedData.planned_hours_worked }}
                        />
                    </div>
                    <div>
                        <label className='font-semibold'>Actual Hours Worked</label>
                        <p
                            className='bg-gray-100 dark:bg-gray-700 p-2'
                            dangerouslySetInnerHTML={{ __html: selectedData.actual_hours_worked }}
                        />
                    </div>
                </div>
                <div>
                    <label className='font-semibold'>Need help</label>
                    <div className='flex items-center gap-4 mt-2'>
                        <label className='flex items-center gap-2'>
                            <input type="radio" value="yes" name="need_help" className="hidden peer" disabled readOnly checked={selectedData.need_help === true} />
                            <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                                Yes
                            </span>
                        </label>
                        <label className='flex items-center gap-2'>
                            <input type="radio" value="no" name="need_help" className="hidden peer" disabled readOnly checked={selectedData.need_help === false} />
                            <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white">
                                No
                            </span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className='font-semibold'>Details about what kind of help needed</label>
                    <ReactQuill
                        value={selectedData.issues_or_concerns}
                        readOnly={true}
                        theme='bubble'
                        className='bg-gray-100'
                    />
                </div>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        <label className='font-semibold'>Attachments (MOVs): </label>
                        <AttachmentLinks attachments={selectedData.attachments} />
                    </div>
                    <div className='flex items-center'>
                        <label className='font-semibold px-2'>Labeled as: </label>
                        <p
                            className='bg-gray-100 dark:bg-gray-700 px-2 rounded-full'
                            dangerouslySetInnerHTML={{ __html: selectedData.label ? selectedData.label : 'No label' }}
                        />
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleBackToCreate}
                        className='mt-4 px-4 py-2 text-sm font-semibold bg-gray-500 text-white rounded hover:bg-gray-700'
                    >
                        <span className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            Back to Create
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PreviousWeek;