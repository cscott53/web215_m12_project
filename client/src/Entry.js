export default function Entry({title,content,desc}) {
    return (
        <div className='entry'>
            <h2 className='entryTitle'>{title}</h2>
            <h3 className='entryContent'>{desc}</h3>
            <div className='entryContent'>{content}</div>
        </div>
    )
}
