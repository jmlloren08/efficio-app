import React, { useState, useEffect } from 'react';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive-dt'
import 'datatables.net-dt';
import { Link, usePage } from '@inertiajs/react';

const Loader = React.lazy(() => import('../Loader'));

export default function AccomplishmentTable({ user_role, accomplishments, selectedOffice, refresh }) {

    const user = usePage().props.auth.user;
    const [loading, setLoading] = useState(false);

    return loading ? (
        <Loader />
    ) : (
        <div className='bg-white rounded-lg border border-gray-200'>
            <div className='overflow-x-auto rouded-t-lg'>
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                    <thead className='ltr:text-left rtl:text-right'>
                        <tr>
                            <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Week Ending Date</th>
                            <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Submitters</th>
                            <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Submitted on</th>
                            <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Content Preview</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {accomplishments.data.length > 0 ? (
                            accomplishments.data.map((accomplishment, index) => (
                                <tr key={index} className='hover:bg-gray-100 cursor-pointer'>
                                    <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>{accomplishment.week_ending_date}</td>
                                    <td className='whitespace-nowrap px-4 py-2 text-gray-900'>{accomplishment.user.name}</td>
                                    <td className='whitespace-nowrap px-4 py-2 text-gray-900'>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(accomplishment.updated_at))}</td>
                                    <td className='whitespace-nowrap px-4 py-2 text-gray-900'><span>{accomplishment.accomplishments_this_week.replace(/<[^>]*>/g, '').split('.')[0]}...</span></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className='whitespace-nowrap px-4 py-2 text-gray-900' colSpan={4}>No accomplishments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
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
        </div>
    );
}
