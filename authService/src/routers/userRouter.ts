import express from 'express'
import { authenticateUser, createUser } from '../controllers/usersController'


const userRouter = express.Router()

userRouter.post('/login', authenticateUser)
userRouter.post('/create', createUser)


export default userRouter