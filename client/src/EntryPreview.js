export default function EntryPreview({title,desc}) {
    return (
        <div className='entryPreview'>
            {title}
            <hr/>
            {desc}
        </div>
    )
}