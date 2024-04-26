import { useRef,useState } from 'react'
import EntryPreview from './EntryPreview'
export default function EntryList({setPage,entries,setEntries}) {
  const [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({}),
        photoUpload = useRef({}),
        [photos,setPhotos] = useState([])
  return (
    <>
      {entries.map((entry,index)=>{
        return <EntryPreview onClick={()=>{
          setPage('entry-'+index)
        }} {...{index,...entry}}/>
      })}
      {addEntry ? (()=>{
        return (
          <form>
            <input type='text' ref={entryTitle} placeholder='Entry title:'/>
            <input type='text' ref={entryDesc} placeholder='Enter a brief description:'/>
            <textarea placeholder='Entry content:' ref={entryContent}></textarea>
            {photos.length < 4 && <button onClick={e=>{
              e.preventDefault()
              photoUpload.current.click()
            }}>Add up to 4 photos</button>}
            <input type='file' style={{display:'none'}} ref={photoUpload} onChange={({target:{files}})=>{
              Array.from(files).forEach(file=>{
                let reader = new FileReader
                reader.onload = ({target:{result}})=>setPhotos([...photos,result])
                reader.readAsDataURL(file)
              })
            }}/>
            <button onClick={()=>{
              let title = entryTitle.current.value,
                  desc = entryDesc.current.value,
                  content = {
                    text: entryContent.current.value,
                    photos
                  },
                  updatedEntries = structuredClone(entries)
              updatedEntries.push({title,desc,content,photos:[...photos]})
              setEntries(updatedEntries)
              showForm(false)
            }}>Save</button>
            <button onClick={()=>showForm(false)}>Cancel</button>
            {photos.length > 0 ? (
              <>
                Preview photos:
                <div id='photos'>
                  {photos.map(photo=>(
                    <div className='image'>
                      <img src={photo}/>
                    </div>
                  ))}
                </div>
              </>
            ) : ''}
          </form>
        )
      })() : (
        <a href='/' onClick={e=>{
          e.preventDefault()
          showForm(true)
        }}>Add new entry</a>
      )}
    </>
  )
}