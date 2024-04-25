export default function Entry({title,content,desc}) {
    return (
        <div className='entry'>
            <h2 className='entryTitle'>{title}</h2>
            <div className='entryContent'>{content}</div>
        </div>
    )
}
