import EntryPreview from './EntryPreview'
export default function EntryList() {
  const [entries,setEntries] = useState([]),
        [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({}),
        [page,setPage] = useState()
  return (
    <>
      {entries.map(entry=>{
        let {title,desc} = entry
        return <EntryPreview title={title} desc={desc}/>
      })}
      {addEntry ? (
        <form>
          <input type='text' ref={entryTitle} placeholder='Entry title:'/>
          <input type='text' ref={entryDesc} placeholder='Enter a brief description:'/>
          <textarea placeholder='Entry content:' ref={entryContent}></textarea>
          <button onClick={()=>{
            let title = entryTitle.current.value,
                desc = entryDesc.current.value,
                content = entryContent.current.value,
                updatedEntries = [...entries.map(e=>({...e}))]
            updatedEntries.push({title,desc,content})
            setEntries(updatedEntries)
            showForm(false)
          }}>Add</button>
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