import { Router } from "express";
import {readFile} from 'fs/promises';

const fileUser = await readFile('./JSON/recetas.json', 'utf-8')
const recetas = JSON.parse(fileUser)

const fileUser2 = await readFile('./JSON/ingredientes.json', 'utf-8')
const ingredientes = JSON.parse(fileUser2)

const router = Router();

router.get('/all', async (req,res)=>{
    try{
    const recetasConNombresIngredientes = recetas.map(receta => ({
        ...receta,
        ingredientes: receta.ingredientes.map(i => ({
            ...i,
            nombre: ingredientes.find(ing => ing.id === i.id)?.nombre || 'Ingrediente desconocido'}))}))

        res.status(200).json(recetasConNombresIngredientes)
    }catch(error){
       res.status(400).json({})
    }

})


let currentId = 0;
router.post('/agregarReceta', (req,res)=>{
    const { nombre,ingredientes:IngredientesReceta } = req.body
    try {
        const nuevaReceta = {
            id: currentId++,
            nombre,
            ingredientes:IngredientesReceta
        };
        recetas.push({nuevaReceta})
        writeFile('./JSON/recetas.json', JSON.stringify(recetas, null, 2))
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(400).json({ status: false })
    }

})

export default router