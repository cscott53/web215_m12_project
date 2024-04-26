export default function EntryPreview({title,desc,onClick}) {
    return (
        <div className='entryPreview' {...{onClick}}>
            <strong>{title}</strong>
            <hr/>
            {desc}
        </div>
    )
}