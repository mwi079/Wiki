import {useEffect,useState} from 'react'
import {getAllTitles,getLatestRevisionByTitle} from '../api'
import Tile from '../components/Tile/Tile'


function Home() {
    
    const [documents,setDocuments]=useState([])
    const [error,setError]=useState(null)

    useEffect(()=>{ 
        getDocuments()
    },[])

    async function getDocuments(){
        try{
            const {titles}=await getAllTitles()
            const docs=await Promise.all(titles.map(async(title)=>await getLatestRevisionByTitle(title)))
            setDocuments(docs)
        }catch(error){
            setError('Woops')
        }
    }

    return (
         <>{error?<center>{error}</center>:documents.map((document)=><Tile document={document} key={document.title}/>)}</>
    );
  }
  
  export default Home;