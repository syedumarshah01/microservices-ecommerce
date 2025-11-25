import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cartRouter from './src/routes/cartRoute'
import connectMongoDb from './config/dbConn'

const PORT = process.env.PORT || 3003
const app = express()
connectMongoDb()

app.use(express.json())

app.use('/cart', cartRouter)

mongoose.connection.on('open', () => {
    app.listen(PORT, () => {
        console.log("Basket Server listening on PORT:", PORT)
    })
})