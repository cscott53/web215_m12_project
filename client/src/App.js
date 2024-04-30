import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useEffect,useState } from 'react'
import Entry from './Entry'
import EntryList from './EntryList'
let username = 'testUser' //this is just for testing purposes
export default function App() {
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
        <EntryList {...{setPage,entries,setEntries,username}}/>
      ) : (()=>{
        let index = parseInt(currentPage.split('-')[1]),
            entry = entries[index]
        return (
          <>
            <Entry {...entry} onEdit={(title,desc,content,photos)=>{
              let updatedEntries = structuredClone(entries)
              let updatedEntry = {title,desc,content:{text:content,photos}}
              updatedEntries[index] = updatedEntry
              fetch(`/api/entries`,{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({username,updatedEntry,index})
              }).then(res=>{
                if (res.ok) return res.json()
                else res.text().then(text=>{
                  if (text == 'user not found') alert('not logged in')
                  else console.error(text)
                })
              }).then(console.log).catch(console.error)
              setEntries(updatedEntries)
            }} onDelete={()=>{
              let updatedEntries = structuredClone(entries)
              updatedEntries.splice(index,1)
              setEntries(updatedEntries)
              setPage('list')
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