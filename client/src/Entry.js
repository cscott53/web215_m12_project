import { useRef, useState } from "react"
export default function Entry({title,content,desc,onEdit,onDelete}) {
  const [mode,setMode] = useState('view'),
        titleRef = useRef({}),
        descRef = useRef({}),
        contentRef = useRef({}),
        addPhotos = useRef({}),
        [photos,setPhotos] = useState([...(content.photos)])
  if (mode == 'edit') return (
      <>
        <div className='entry'>
          <input type='text' ref={titleRef} defaultValue={title}/>
          <input type='text' ref={descRef} defaultValue={desc}/>
          <hr/>
          <textarea defaultValue={content.text} ref={contentRef}/>
          <div id='photos'>
            {photos.map((photo,index)=>(
              <div className='image' key={index}>
                <img src={photo}/>
                <button onClick={e=>{
                  e.preventDefault()
                  let updatedPhotos = [...photos]
                  updatedPhotos.splice(index,1)
                  setPhotos([...updatedPhotos])
                }} className='x'><img src='/x.png'/></button>
              </div>
            ))}
          </div>
          {photos.length < 4 && (
            <>
              <button id='addPhotos' onClick={()=>addPhotos.current.click()}>Add up to 4 photos</button>
              <input type='file' onChange={({target:{files}})=>{
                Array.from(files).slice(0,4).forEach(file=>{
                  let reader = new FileReader
                  reader.onload = ({target:{result}})=>setPhotos(prev=>[...prev,result])
                  reader.readAsDataURL(file)
                })
              }} style={{display:'none'}} ref={addPhotos} multiple/>
            </>
          )}
        </div>
        <button onClick={()=>{
          setPhotos(content.photos)
          setMode('view')
        }}>Cancel</button>
        <button id='edit' onClick={()=>{
          onEdit(...[titleRef,descRef,contentRef].map(e=>e.current.value),photos)
          setMode('view')
        }}>Done</button>
      </>
    )
  else return (
    <>
      <div className='entry'>
        <h3>{title}</h3>
        <h4>{desc}</h4>
        <hr/>
        <p>{content.text}</p>
        <div id='photos'>
          {photos.map((photo,index)=>(
            <div className='image' key={index}>
              <img src={photo}/>
            </div>
          ))}
        </div>
      </div>
      <button onClick={()=>{
        if(window.confirm('Are you sure?'))onDelete()
      }}>Delete</button>
      <button id='edit' onClick={()=>setMode('edit')}>Edit</button>
    </>
  )
}
