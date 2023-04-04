import axios from 'axios'
const path='http://localhost:5003'

export async function getAllTitles(){
    try{
        const {data}=await axios(`${path}/pages`)
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export async function getRevisionsByTitle(title){
    try{
        const {data}=await axios(`${path}/page/${title}`)
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export async function getLatestRevisionByTitle(title){
    try{
        const {data}=await axios(`${path}/page/${title}/latest`)
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export async function getRevisionAtTimeStampByTitle(title,timestamp){
    try{
        const {data}=await axios(`${path}/page/${title}/${timestamp}`)
        return data
    }
    catch(err){
        console.log(err)
        return err
    }
}

export async function postNewRevisionOfDocument(title,document){

    try{
        document={...document, page:document.data}
        const result=await axios.post(`${path}/page/${title}`,document)
        return result
    }
    catch(err){
        console.log(err)
        return err
    }
}

