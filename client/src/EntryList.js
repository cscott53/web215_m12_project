import { useEffect,useRef,useState } from 'react'
import EntryPreview from './EntryPreview'
export default function EntryList({setPage,entries,setEntries}) {
  const [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({})
  return (
    <>
      {entries.map((entry,index)=>{
        return <EntryPreview onClick={()=>{
          setPage('entry-'+index)
        }} {...{index,...entry}}/>
      })}
      {addEntry ? (
        <form>
          <input type='text' ref={entryTitle} placeholder='Entry title:'/>
          <input type='text' ref={entryDesc} placeholder='Enter a brief description:'/>
          <textarea placeholder='Entry content:' ref={entryContent}></textarea>
          <button className='icons'><img src='/uploadImage.png' className='imageIcons'/></button>
          <button onClick={()=>{
            let title = entryTitle.current.value,
                desc = entryDesc.current.value,
                content = entryContent.current.value,
                updatedEntries = [...entries.map(e=>({...e}))]
            updatedEntries.push({title,desc,content})
            setEntries(updatedEntries)
            showForm(false)
          }}>Add</button>
          <button onClick={()=>showForm(false)}>Cancel</button>
        </form>
      ) : (
        <a href='/' onClick={e=>{
          e.preventDefault()
          showForm(true)
        }}>Add new entry</a>
      )}
    </>
  )
}