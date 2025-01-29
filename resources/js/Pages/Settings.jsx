import React, { useEffect, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import { marked } from 'marked';

const AuthenticatedLayout = React.lazy(() => import('@/Layouts/AuthenticatedLayout'));

const formattedResponse = (text) => {
    return marked(text);
}

export default function Settings() {
    const user = usePage().props.auth.user;
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [formatResponse, setFormatResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/get-ollama-response', { query: input });
            setResponse(response.data.message);
        } catch (error) {
            setResponse(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (response) {
            const formatted = formattedResponse(response); // Format the response
            setFormatResponse(formatted);
        }
    }, [response]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Ask with Ollama
                </h2>
            }
        >
            <Head title="Settings" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            {/* Response */}
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                    <div className="w-4 h-4 rounded-full animate-pulse bg-violet-400"></div>
                                </div>
                            ) : response && (
                                <div className='mt-4 p-4 bg-gray-100 rounded'>
                                    <div className='space-y-2'>
                                        <div className='flex items-center justify-end'>
                                            <p className='font-semibold text-gray-900'>{input}</p>
                                        </div>
                                        <div className='flex items-center justify-start'>
                                            <ReactQuill
                                                value={formatResponse}
                                                readOnly={true}
                                                theme='bubble'
                                                className='bg-gray-100'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* <p>This page is under ongoing development.</p> */}
                            {/* Chatbox */}
                            <form onSubmit={handleSubmit} className='mt-4'>
                                <textarea
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder='Ask a question...'
                                    className='w-full p-2 rounded-xl bg-gray-100 border-none focus:outline-none focus:border-none focus:ring-0 active:outline-none active:border-none active:ring-0'
                                    rows={4}
                                    required
                                />
                                <div className='flex justify-end'>
                                    <button
                                        type='submit'
                                        className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={loading}
                                    >
                                        {loading ? 'Please wait...' : (
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}