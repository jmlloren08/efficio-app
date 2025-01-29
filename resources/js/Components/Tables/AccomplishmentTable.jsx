import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive-dt'
import 'datatables.net-dt';
import { usePage } from '@inertiajs/react';
import AttachmentLinks from '../AttachmentLinks';

const Loader = React.lazy(() => import('../Loader'));

export default function AccomplishmentTable({ user_role, accomplishments, selectedOffice, refresh }) {

    const user = usePage().props.auth.user;
    const [loading, setLoading] = useState(false);

    return loading ? (
        <Loader />
    ) : (
        <div className='overflow-x-auto bg-white p-4 rounded'>
            <table id='accomplishments-table' className='display' style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ width: '5%' }}></th>
                        <th style={{ width: '10%' }}>Week Ending Date</th>
                        <th>Accomplishments This Week</th>
                        {user_role !== 'Staff' &&
                            <th
                                style={{ width: '15%' }}>Author
                            </th>}
                    </tr>
                </thead>
            </table >
            {accomplishments.length === 0 && (
                <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800'>
                    <p className='text-gray-600 dark:text-gray-400'>No Accomplishments</p>
                </div>
            )}
        </div>
    );
}
