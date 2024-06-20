import { Router } from "express";
import {readFile} from 'fs/promises';

const fileUser = await readFile('./JSON/ingredientes.json', 'utf-8')
const ingredientes = JSON.parse(fileUser)

const router = Router();

router.get('/all', async (req,res)=>{
    if(ingredientes){
        res.status(200).json(ingredientes)
    }else{
       res.status(400).json({})
    }

})
let currentId = 0;
const loadIngredientes = () => {
    try {
        const data = fs.readFileSync('./JSON/ingredientes.json', 'utf-8');
        ingredientes = JSON.parse(data);
        if (ingredientes.length > 0) {
            currentId = Math.max(...ingredientes.map(ingrediente => ingrediente.id)) + 1;
        } else {
            currentId = 1;
        }
    } catch (error) {
        console.error('Error al cargar los ingredientes:', error);
        ingredientes = [];
        currentId = 1;
    }
};

loadIngredientes()

router.post('/agregarIngrediente', (req,res)=>{
    const { nombre } = req.body
    try {
        const nuevoIngrediente = {
            id : currentId++,
            nombre
        };
        ingredientes.push({ nuevoIngrediente })
        fs.writeFileSync('./JSON/ingredientes.json', JSON.stringify(ingredientes, null, 2))
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(400).json({ status: false })
    }

})

export default router














