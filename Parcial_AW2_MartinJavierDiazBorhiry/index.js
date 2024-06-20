import express from 'express'
import recetasRouter from './routes/recetas.routes.js';
import IngredientesRouter from './routes/ingredientes.routes.js';
const app = express()
const port = 3000

app.use(express.json());

app.listen(port, ()=> {
    console.log(`servidor levantado en puerto ${port}`)
})

app.use(express.static('./public'))

app.use('/recetas', recetasRouter)
app.use('/ingredientes', IngredientesRouter)
