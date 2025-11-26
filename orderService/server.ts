import express from 'express'
import dotenv from 'dotenv'
import orderRouter from './src/routers/orderRouter'
dotenv.config()


const PORT = process.env.PORT || 3003
const app = express()

app.use(express.json())

app.use('/orders', orderRouter)


app.listen(PORT, () => {
    console.log("OrderService is listening on PORT:", PORT)
})
