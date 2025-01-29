import React from 'react';
const ViewIcon = React.lazy(() => import("./Icons/ViewIcon"));

const AttachmentLinks = ({ attachments }) => {
    const safeAttachments = Array.isArray(attachments) ? attachments : attachments ? [attachments] : [];
    return (
        <div className='flex flex-row items-center'>
            {safeAttachments.length > 0 ? (
                safeAttachments.map((attachment, index) => (
                    <a
                        key={index}
                        href={attachment.attachment_type === 'file' ? `/storage/${attachment}` : attachment}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block m-1 text-gray-600 hover:text-blue-500'
                        title='Open file'
                    >
                        {attachment.attachment_type === 'file' ? <ViewIcon /> : attachment}
                    </a>
                ))
            ) : (
                <p className='px-2'>No attachments</p>
            )}
        </div>
    );
}

export default AttachmentLinks;