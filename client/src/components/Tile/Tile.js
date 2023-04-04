import './styles.css'
import {useNavigate} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

function Tile({document}) { 
    const navigate=useNavigate()
    function handleClick(e){
        e.preventDefault()
        navigate(`/document/${document.title}`)
    }

     return(
         <div className='tile' onClick={handleClick} data-testid="click">
            <div>
                 <div className='title'>{document.title}</div>
                 <div className='data'>
                    <ReactMarkdown>{document.data}</ReactMarkdown>
                </div>
            </div>
         </div>
     )
 }

 export default Tile;