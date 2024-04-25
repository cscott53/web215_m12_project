export default function Entry({title,content,desc}) {
  return (
    <div className='entry'>
      <strong>{title}: {desc}</strong>
      <hr/>
      {content}
    </div>
  )
}
