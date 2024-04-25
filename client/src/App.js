import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useEffect,useRef,useState } from 'react'
import Entry from './Entry'
function App() {
  const [entries,setEntries] = useState([]),
        [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({})
  useEffect(() => {
    let headerLinks = document.querySelectorAll('header .links')
    let footerLinks = document.querySelectorAll('footer .links')
    for(var links of [headerLinks,footerLinks]){
      links.forEach((e,i)=>{
        if (i < links.length - 1) e.outerHTML += ' '
      })
    }
  }, [])
  return (
    <div className="App">
      <Header/>
      {entries.map(entry=>(
        <Entry {...entry}/>
      ))}
      {addEntry ? (
        <form>
          <input type='text' ref={entryTitle} placeholder='Entry title:'/>
          <button onClick={()=>{
            let title = entryTitle.current.value,
                desc = entryDesc.current.value,
                content = entryContent.current.value,
                updatedEntries = [...entries.map(e=>({...e}))]
            showForm(false)
          }}>Add</button>
        </form>
      ) : (
        <a href='/' onClick={e=>{
          e.preventDefault()
          showForm(true)
        }}>Add new entry</a>
      )}
      <Footer/>
    </div>
  )
}
export default App