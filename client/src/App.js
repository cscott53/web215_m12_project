import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useEffect,useState } from 'react'
import Entry from './Entry'
import EntryList from './EntryList'
function App() {
  const [currentPage,setPage] = useState('list'),
        [entries,setEntries] = useState([])
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
      {currentPage == 'list' ? (
        <EntryList {...{setPage,entries,setEntries}}/>
      ) : (()=>{
        let index = parseInt(currentPage.split('-')[1]),
            entry = entries[index]
        return (
          <>
            <Entry {...entry} onEdit={(title,desc,content,photos)=>{
              let updatedEntries = structuredClone(entries)
              updatedEntries[index] = {title,desc,content:{text:content,photos}}
              setEntries(updatedEntries)
            }}/>
            <a href='/' onClick={e=>{
              e.preventDefault()
              setPage('list')
            }}>Back to entries list</a>
          </>
        )
      })()}
      <Footer/>
    </div>
  )
}
export default App