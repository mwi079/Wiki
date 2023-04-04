import {useEffect,useState} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import { getRevisionsByTitle, getRevisionAtTimeStampByTitle} from '../../api'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import AddRevision from '../../components/AddRevision/AddRevision'
import './styles.css'

function Document() { 
    const navigate=useNavigate()
    const {title}=useParams()

    const [documentRevisions,setRevisions]=useState([])
    const [selectedRevision,setSelectedRevision]=useState()
    const [selectedDocument,setSelectedDocument]=useState({})
    const [creating, setCreating]=useState(false)
    const [error,setError]=useState(null)

    useEffect(()=>{
        getRevisions()
    },[])

    useEffect(()=>{
        const document=documentRevisions.filter((rev)=>rev.timestamp===selectedRevision)[0]
        setSelectedDocument(document)
    },[selectedRevision])

    async function getRevisions(){
        try{
            const {revisions}=await getRevisionsByTitle(title)
            const latest=revisions[revisions.length-1]
            const revDetails=await Promise.all(revisions.map(async(timestamp)=>{
                const details=await getRevisionAtTimeStampByTitle(title,timestamp)
                return {...details,timestamp}
                }
            ))
            selectRevision(latest)
            setRevisions(revDetails)
        }catch(error){
            setError('Woops')
        }
    }

    function selectRevision(timestamp){
        setSelectedRevision(timestamp)
    }
    
    function goBack(e){
        e.preventDefault()
        navigate('/')
    }

    function handleChange(e){
        e.preventDefault()
        selectRevision(+e.target.value)
    }

    function toggleCreating(e){
        setCreating(!creating)
    }


     return(
        <>{ error? <center>{error}</center>:
         <div className='tile'>
            <div className='detailsWrapper'>
                 <div className='title'>{selectedDocument?.title}</div>
                 <div className='data'>
                 <ReactMarkdown>{selectedDocument?.data}</ReactMarkdown>
                 </div>
            </div>
            <div>
                <div>Select Revision</div>
                <select value={selectedRevision} onChange={handleChange}>
                    {documentRevisions.map(x=><option key={x.timestamp} value={x.timestamp}>{moment.unix(x.timestamp).format("LLLL")}</option>)}
                </select>
            </div>
            <center>
            <div>New Revision</div>
            <button onClick={toggleCreating}>{creating?'-':'+'}</button>
            </center>
         </div>
         }
         {creating &&<center className='tile'>
                <AddRevision document={selectedDocument} toggleCreating={toggleCreating} getRevisions={getRevisions}/>
            </center>}
         <center>
            <button onClick={goBack}>Go Back</button>
         </center>
        
         </>
         
         
     )
 }

 export default Document;