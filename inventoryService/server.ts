import express from 'express'
import dotenv from 'dotenv'
import inventoryRouter from './src/routers/inventoryRouter'
dotenv.config()

const PORT = process.env.PORT || 3005

const app = express()
app.use(express.json())

app.use('/inventory', inventoryRouter)



app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT)
})