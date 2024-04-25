import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useEffect,useRef,useState } from 'react'
import Entry from './Entry'
import EntryPreview from './EntryPreview'
function App() {
  const [entries,setEntries] = useState([]),
        [addEntry,showForm] = useState(false),
        entryTitle = useRef({}),
        entryDesc = useRef({}),
        entryContent = useRef({}),
        [page,setPage] = useState()
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
      {/*  */}
      <Footer/>
    </div>
  )
}
export default App