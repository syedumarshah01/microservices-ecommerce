import express from 'express'
import dotenv from 'dotenv'
import catalogRouter from './routers/catalogRouter.js'
dotenv.config()
import connectDB from './config/dbConn.js'
import mongoose from 'mongoose'
import logger from './middlewares/logger.js'



const PORT = process.env.PORT || 3001
const app = express()
connectDB()

app.use(logger)
app.use(express.json())

app.use('/products', catalogRouter)

app.get('/', (req, res) => {
    res.send("Hi")
})

app.listen(PORT, () => {
    console.log("Server listening on port: ", PORT)
})

mongoose.connection.on('open', () => {
    console.log("DB Connected...")
    app.listen(PORT, () => console.log("Server listening on PORT:", PORT))
})
