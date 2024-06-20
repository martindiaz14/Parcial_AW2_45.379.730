import { API } from "./api.js"

export const adding = async()=>{
    try{
    const res = await fetch(`${API}/ingredientes/all`,{
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json',
    }
    })
    
    if(!res.ok){
    throw new Error(`Error: ${res.status}`)
    }
    
    const prod = await res.json()
    return prod
    }catch(error){
        console.error(error)
        }
    }

    export const NewIng = async (NewIngData) => {

        try {
            const res = fetch(`${API}/ingredientes/AgregarIngrediente`, {
                method: 'POST',
                body: JSON.stringify(NewIngData),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
    return res
        } catch (error) {
    console.log(error)
        }
    
    }