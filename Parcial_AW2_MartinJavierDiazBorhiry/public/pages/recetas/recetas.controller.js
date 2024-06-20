import { recipe } from "../../components/recipe.js"
import {addrec, NewRec} from "../../api/recipe.api.js"
const btnAdd = document.getElementById("add")
const btnCancel = document.getElementById("cancel")
const btnCreate = document.getElementById('create')

const arrIng = []

btnCreate.addEventListener('click', async()=>{
    const name = document.getElementById("name").value
    const ing = document.getElementById("ing").value
    const quantity = document.getElementById("quantity").value

    
    const NewRecObj = {
        name: name,
        ing:ing,
        quantity:quantity
    }
    const res = await NewSale(NewRecObj)
    if (res.status) {
        alert("receta agregada")
    }
    else {
        alert("nose pudo agregar la receta")
    }
    /*Se debe añadir la receta creada al servidor */
})

btnAdd.addEventListener('click',()=>{
    const quantity = document.getElementById("quantity").value
    const ing = document.getElementById("ing").value
    const li = document.createElement('li')


    arrIng.push({quantity, ing})
    li.textContent = `${ing}: ${quantity}`
    document.getElementById('list').appendChild(li)
})


btnCancel.addEventListener('click',()=>{
    arrIng.splice(0,arrIng.length)
    document.getElementById('list').innerHTML = ''
})

window.addEventListener('load', async function() {
    await renderprod();
    /*Llenar lista con las recetas existentes
        Se debe usar el componente recipe que recibe dos parametros, title y un array con los ingredientes de la receta llamado ing
    */

})

const renderprod = async () => {

    const prod = await addrec()
    const prodcontainer = document.getElementById("listRecipe")

    let prodcon = ``
    prodcontainer.innerHTML = prodcon

    prod.forEach(e => {
        prodcon += prodcard(e, user.id)
    });
    prodcontainer.innerHTML = prodcon

}