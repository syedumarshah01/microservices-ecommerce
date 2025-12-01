import express from 'express'
import { decrement, getCurrentQuantity, increment, addProduct } from '../controllers/inventoryController'


const inventoryRouter = express.Router()

inventoryRouter.get('/current-quantity', getCurrentQuantity)
inventoryRouter.post('/increment', increment)
inventoryRouter.post('/decrement', decrement)
inventoryRouter.post('/add-product', addProduct)

export default inventoryRouter