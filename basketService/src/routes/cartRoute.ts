import express from 'express'
import { createOrUpdateCart, getCart, removeFromCart } from '../controllers/cartController'


const cartRouter = express.Router()

cartRouter.post('/add_to_cart', createOrUpdateCart)
cartRouter.get('/get_cart', getCart)
cartRouter.delete('/remove_from_cart', removeFromCart)

export default cartRouter