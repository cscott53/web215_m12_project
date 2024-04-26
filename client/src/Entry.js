export default function Entry({title,content,desc}) {
  return (
    <div className='entry'>
      <strong>{title}: {desc}</strong>
      <hr/>
      <p>{content.text}</p>
    </div>
  )
}
