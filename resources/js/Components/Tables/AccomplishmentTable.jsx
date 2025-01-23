import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-responsive-dt'
import 'datatables.net-dt';
import { usePage } from '@inertiajs/react';
import { root } from 'postcss';

const Loader = React.lazy(() => import('../Loader'));

const ViewIcon = () => (
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
        </svg>
    </span>
);

const AttachmentLinks = ({ attachments }) => {
    const safeAttachments = Array.isArray(attachments) ? attachments : attachments ? [attachments] : [];
    return (
        <div className='flex flex-rows items-center'>
            {safeAttachments.length > 0 ? (
                safeAttachments.map((attachment, index) => (
                    <a
                        key={index}
                        href={`/storage/${attachment}`}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block m-1 text-gray-600 hover:text-blue-500'
                        title='View attachment'
                    >
                        <ViewIcon />
                    </a>
                ))
            ) : (
                'No attachments'
            )}
        </div>
    );
};

const DetailsContent = ({ rowData }) => (
    <div className='details-content text-xs'>
        <strong>Action Items Next Week: </strong> {rowData.action_items_next_week ? formatActionItems(rowData.action_items_next_week) : 'No data'}
        <p><strong>Issues or Concerns: </strong> {rowData.issues_or_concerns || 'No data'}</p>
        <div className='flex flex-rows items-center gap-1'>
            <strong>Attachments (MOVs):</strong>
            <AttachmentLinks attachments={rowData.attachments || []} />
        </div>
        <p><strong>Label: </strong> {rowData.label || 'No label'}</p>
    </div>
);

const formatAccomplishments = (accomplishments) => {
    const items = accomplishments.split(/\d+\.\s+/).filter((item) => item.trim() !== '');
    return `<ul class="list-disc pl-5">${items.map((item) => `<li>${item.trim()}</li>`).join('')}</ul>`;
}

const formatActionItems = (actionItems) => {
    const aItems = actionItems.split(/\d+\.\s+/).filter((item) => item.trim() !== '');
    return (
        <ul className='list-disc pl-5'>
            {aItems.map((item, index) => (
                <li key={index}>{item.trim()}</li>
            ))}
        </ul>
    );
}

export default function AccomplishmentTable({ user_role, selectedOffice, refresh }) {

    const user = usePage().props.auth.user;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/get-list-of-accomplishments', {
                params: { user_role, selectedOffice }
            });
            setData(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
        return () => {
            if ($.fn.DataTable.isDataTable('#accomplishments-table')) {
                $('#accomplishments-table').DataTable().destroy();
            }
        }
    }, [refresh, user_role, selectedOffice]);

    useEffect(() => {
        if (data.length > 0) {
            const table = $('#accomplishments-table').DataTable({
                destroy: true,
                responsive: true,
                data: data,
                columns: [
                    {
                        className: 'details-control',
                        orderable: false,
                        data: null,
                        defaultContent: '',
                        render: function () {
                            return `<button class="details-button rounded-full bg-gray-800 text-white w-4 h-4 flex items-center justify-center"><span class="icon">+</span></button>`;
                        }
                    },
                    {
                        data: 'week_ending_date',
                        render: function (data) {
                            return `<span class="text-xs">${data}</span>`;
                        }
                    },
                    {
                        data: 'accomplishments_this_week',
                        render: function (data) {
                            return `<span class="text-xs">${formatAccomplishments(data)}</span>`;
                        }
                    },
                    {
                        data: 'user.name',
                        render: function (data, type, row) {
                            return `<span class="text-xs">${(row.user_id === user.id) ? '(You)' : data}</span>`;
                        },
                        visible: user_role !== 'Staff'
                    }
                ],
                order: [[1, 'desc']],
            });
            // Handle row details toggle
            $('#accomplishments-table tbody').on('click', 'td.details-control', function () {
                const tr = $(this).closest('tr');
                const row = table.row(tr);
                const iconSpan = $(this).find('.details-button span.icon');
                if (row.child.isShown()) {
                    // This row is already open - close it
                    row.child.hide();
                    tr.removeClass('shown');
                    iconSpan.html('+');
                } else {
                    // Open this row
                    const rowData = row.data();
                    const placeholder = document.createElement('div');
                    row.child(placeholder).show();
                    tr.addClass('shown');
                    iconSpan.text('-');

                    const root = ReactDOM.createRoot(placeholder);
                    root.render(<DetailsContent rowData={rowData} />);
                }
            });
        }
    }, [data, user_role]);

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
            {data.length === 0 && (
                <div className='flex justify-center items-center bg-gray-100 dark:bg-gray-800'>
                    <p className='text-gray-600 dark:text-gray-400'>No Accomplishments</p>
                </div>
            )}
        </div>
    );
}