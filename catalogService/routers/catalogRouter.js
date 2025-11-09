import express from 'express'
import { getAllProducts, addNewProduct, updateProduct } from '../controllers/catalogController.js'


const catalogRouter = express.Router()

catalogRouter.route('/')
    .get(getAllProducts)
    .post(addNewProduct)
    .patch(updateProduct)


export default catalogRouter