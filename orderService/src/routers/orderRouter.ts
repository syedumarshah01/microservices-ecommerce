import express from 'express'
import { createOrder } from '../controllers/ordersController'


const orderRouter = express.Router()

orderRouter.post('/create-order', createOrder)


export default orderRouter

