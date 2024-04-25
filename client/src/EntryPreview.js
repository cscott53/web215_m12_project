export default function EntryPreview({title,desc,content,index,onClick}) {
    return (
        <div className='entryPreview' onClick={onClick}>
            <strong>{title}</strong>
            <hr/>
            {desc}
        </div>
    )
}