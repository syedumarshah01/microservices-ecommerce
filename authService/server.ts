import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import {drizzle} from 'drizzle-orm/node-postgres'
import userRouter from './src/routers/userRouter'

const PORT = process.env.PORT || 3002
const app = express()
const db = drizzle(process.env.DATABASE_URL!)


app.use(express.json())
app.use('/user', userRouter)




app.listen(PORT, () => {
    console.log("Server listening on PORT: ", PORT)
})





