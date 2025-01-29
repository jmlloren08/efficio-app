const DetailsContent = ({ rowData }) => {
    return (
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
}