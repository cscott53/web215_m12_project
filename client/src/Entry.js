import { useState } from "react"
export default function Entry({title,content,desc}) {
  const [mode,setMode] = useState('view')
  if (mode == 'edit') return (
    <>
      <div className='entry'>
        <strong>{title}: {desc}</strong>
        <hr/>
        <p>{content.text}</p>
      </div>
    </>
  )
  else return (
    <>
      
    </>
  )
}
