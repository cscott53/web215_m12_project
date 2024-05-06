import { useEffect, useRef,useState } from 'react'
import EntryPreview from './EntryPreview'
export default function EntryList({setPage,entries,setEntries,username}) {
  const [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({}),
        photoUpload = useRef({}),
        [photos,setPhotos] = useState([])
  useEffect(() => {
    fetch(`/api/entries?username=${username}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res=>{
      if (!res.ok) {
        res.text().then(message=>{
          if (message == 'User not found') {
            window.confirm('You don\'t seem to be logged in, please login to continue') &&
            Array.from(document.querySelectorAll('header .links a')).find(a=>a.textContent.includes('Login'))?.click()
          }
          else console.error(message)
          return
        })
      }
      return res.json()
    }).then(({data})=>setEntries(data)).catch(console.error)
  }, [])
  return (
    <>
      {entries.map(({title,desc},index)=>(
        <EntryPreview key={index}
          onClick={()=>setPage('entry-'+index)}
          {...{title,desc}}
        />
      ))}
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
              Array.from(files).slice(0,4).forEach(file=>{
                let reader = new FileReader
                reader.onload = ({target:{result}})=>setPhotos(prev=>[...prev,result])
                reader.readAsDataURL(file)
              })
            }} multiple/>
            <button onClick={()=>{
              let title = entryTitle.current.value,
                  desc = entryDesc.current.value,
                  content = {
                    text: entryContent.current.value,
                    photos
                  },
                  updatedEntries = structuredClone(entries),
                  entry = {title,desc,content}
              updatedEntries.push(entry)
              fetch(`/api/entries`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,entry})
              }).then(res=>{
                if (!res.ok) {
                  res.text().then(message=>{
                    if (message == 'User not found') alert('Not logged in')
                    else console.error(message)
                    return
                  })
                }
                return res.json()
              }).then(console.log).catch(console.error)
              setEntries(updatedEntries)
              showForm(false)
            }}>Save</button>
            <button onClick={()=>{
              showForm(false)
              setPhotos([])
            }}>Cancel</button>
            {photos.length > 0 && (
              <>
                Preview photos:
                <div id='photos'>
                  {photos.map((photo,index)=>(
                    <div className='image' key={index}>
                      <img src={photo}/>
                      <button onClick={e=>{
                        e.preventDefault()
                        let updatedPhotos = [...photos]
                        updatedPhotos.splice(index,1)
                        setPhotos(updatedPhotos)
                      }} className='x'><img src='/x.png'/></button>
                    </div>
                  ))}
                </div>
              </>
            )}
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