import express from 'express'
import { createOrder, getOrders, updateOrderStatus } from '../controllers/ordersController'


const orderRouter = express.Router()

orderRouter.get('/all-orders', getOrders)
orderRouter.post('/create-order', createOrder)
orderRouter.post('/update-order-status', updateOrderStatus)


export default orderRouter

