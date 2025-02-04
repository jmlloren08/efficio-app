import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive-dt'
import 'datatables.net-dt';
import { Link, usePage } from '@inertiajs/react';
import AttachmentLinks from '../AttachmentLinks';

const Loader = React.lazy(() => import('../Loader'));

export default function AccomplishmentTable({ user_role, accomplishments, selectedOffice, refresh }) {

    const user = usePage().props.auth.user;
    const [loading, setLoading] = useState(false);

    return loading ? (
        <Loader />
    ) : (
        <div className='overflow-x-auto bg-white p-4 rounded'>
            <div>
                <table id='accomplishments-table' className='table-fixed text-xs' style={{ width: '100%' }}>
                    <thead className='text-left bg-gray-200'>
                        <tr>
                            <th>Week Ending Date</th>
                            <th>Submitters</th>
                            <th>Submitted on</th>
                            <th>Content Preview</th>
                        </tr>
                    </thead>
                    <tbody className='text-left'>
                        {accomplishments.data.length > 0 ? (
                            accomplishments.data.map((accomplishment, index) => (
                                <tr key={index}>
                                    <td>{accomplishment.week_ending_date}</td>
                                    <td>{accomplishment.user.name}</td>
                                    <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(accomplishment.updated_at))}</td>
                                    <td>
                                        <span>{accomplishment.accomplishments_this_week.replace(/<[^>]*>/g, '').split('.')[0]}...</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No Accomplishments</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className='flex justify-end mt-4'>
                {accomplishments.links && accomplishments.links.map((link, index) => (
                    link.url ?
                        <Link key={link.label} href={link.url}
                            className={`p-1 m-1 rounded ${link.active ? 'text-blue-600 font-bold' : 'text-gray-600 font-normal'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                        :
                        <span
                            key={link.label}
                            className='p-1 m-1 text-slate-400'
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        >
                        </span>
                ))}
            </div>
        </div >
    );
}
