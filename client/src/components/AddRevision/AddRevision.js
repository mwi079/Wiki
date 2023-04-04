import {useState} from 'react'
import {postNewRevisionOfDocument } from '../../api'

function AddRevision({document,toggleCreating,getRevisions}) { 
    const [data,setData]=useState('')
    const [error,setError]=useState(null)
    async function handleSubmit(e){
        try{
            e.preventDefault()
            await postNewRevisionOfDocument(document.title,{...document,data})
            setData('')
            await getRevisions()
            toggleCreating()
        }catch(error){
            setError('Woops')
        }
    }

     return(
        <>{error? <center>{error}</center>:
         <form className='form' onSubmit={handleSubmit}>
               <div className='title'>{document.title}</div>
               <input type="text" value={data} onChange={e=>setData(e.target.value)}/>
               <button type="submit">Submit</button>
         </form>}
         </>
     )
 }

 export default AddRevision;