import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputError from '../InputError';

const Modal = React.lazy(() => import('../../Components/Modals/Modal'));

export default function ModalAddNewItem({ onClose, onRefresh }) {

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [labels, setLabels] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataObject = new FormData();
        formDataObject.append('week_ending_date', formData.week_ending_date);
        formDataObject.append('accomplishments_this_week', formData.accomplishments_this_week);
        formDataObject.append('action_items_next_week', formData.action_items_next_week);
        formDataObject.append('issues_or_concerns', formData.issues_or_concerns);
        if (formData.attachments) {
            formDataObject.append('attachments', formData.attachments);
        }
        formDataObject.append('label', formData.label);
        try {
            const response = await axios.post('/add-new-accomplishment', formDataObject, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success(response.data.message);
            onRefresh();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
            setFormData({});
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const fetchLabels = async () => {
        try {
            const response = await axios.get('/get-list-of-labels');
            setLabels(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchLabels();
    }, []);

    return (
        <Modal show={true} onClose={onClose}>
            <div className='p-8 relative'>
                <div className='mb-4'>
                    <h1 className='text-lg font-semibold'>Details</h1>
                </div>
                <button
                    type='button'
                    className='absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700'
                    onClick={onClose}
                >
                    &times;
                </button>
                <form onSubmit={handleSubmit}>
                    <div className='space-y-4'>
                        <div>
                            <label>Week Ending Date</label>
                            <input
                                type='date'
                                name='week_ending_date'
                                value={formData.week_ending_date || ''}
                                onChange={handleChange}
                                className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                required
                            />
                            <InputError message={formData.errors?.week_ending_date} className='mt-2' />
                        </div>
                        <div>
                            <label>Lists the accomplishments this week</label>
                            <textarea
                                name='accomplishments_this_week'
                                value={formData.accomplishments_this_week || ''}
                                onChange={handleChange}
                                placeholder={`e.g. Follow this format\n1. Completed a project\n2. Met with a client\n3. Fixed a bug\n...`}
                                className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                autoFocus={true}
                                rows={5}
                                required
                            />
                            <InputError message={formData.errors?.accomplishments_this_week} className='mt-2' />
                        </div>
                        <div>
                            <label>Action Items Next Week</label>
                            <textarea
                                name='action_items_next_week'
                                value={formData.action_items_next_week || ''}
                                onChange={handleChange}
                                className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                placeholder={`e.g. Follow this format\n1. Add time hours spent\n2. Schedule a meeting\n3. Update setting page\n...`}
                                rows={5}
                                required
                            />
                        </div>
                        <div>
                            <label>Issues or Concerns</label>
                            <textarea
                                name='issues_or_concerns'
                                value={formData.issues_or_concerns || ''}
                                onChange={handleChange}
                                placeholder='Enter common issues or concerns here for identification purposes. This will be updated to a select option for uniformity in future updates.'
                                className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                rows={5}
                                required
                            />
                            <InputError message={formData.errors?.issues_or_concerns} className='mt-2' />
                        </div>
                        <div className='flex items-center justify-between gap-4'>
                            <div className='w-1/2'>
                                <label>Attachments (MOVs)</label>
                                <p className='text-xs text-gray-500'>.pdf, .doc, .docx, .jpg, .jpeg, .png, .ppt, .pptx, .xls, .xlsx</p>
                                <input
                                    name='attachments'
                                    type='file'
                                    onChange={(e) => setFormData({ ...formData, attachments: e.target.files[0] })}
                                    className='block w-full mt-1 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-300'
                                    required
                                />
                                <InputError message={formData.errors?.attachments} className='mt-2' />
                            </div>
                            <div className='w-1/2'>
                                <label>Apply Label</label>
                                <select
                                    name='label'
                                    value={formData.label || ''}
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
                                <InputError message={formData.errors?.label} className='mt-2' />
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end gap-2'>
                        <button
                            type='submit'
                            className={`px-4 py-2 font-semibold mt-4 bg-blue-500 text-white rounded hover:bg-blue-700 ${loading && 'opacity-50 cursor-not-allowed'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <span className='flex items-center justify-center'>
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"></path>
                                    </svg>
                                    Please wait...
                                </span>
                            ) : 'Submit Report'}
                        </button>
                        <button
                            type='button'
                            className='px-4 py-2 mt-4 text-gray-500 rounded hover:font-semibold'
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}