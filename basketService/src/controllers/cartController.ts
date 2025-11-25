import RedisDatabase from "../../config/redisConfig";
import { Request, Response } from "express";
import cartQueue from "../queues/cartQueue";
import Cart from '../models/cartModel'

export const createOrUpdateCart = async(req: Request, res: Response) => {
    const {userId, cartItem} = req.body

    const redisDB = RedisDatabase.getInstance().getRedisDb()

    const cartData = await redisDB.hGetAll(`cart:${userId}`)
    if(Object.keys(cartData).length) {
        await redisDB.del(`cart:${userId}`)
    }
    
    res.status(200).json({success: true, message: "Added to cart successfully...", cartItem})

    cartQueue.add('persist-cart', {userId, cartItem, action: 'createOrUpdateCart'})
}


export const getCart = async(req: Request, res: Response) => {
    const {userId} = req.query

    const redisDB = RedisDatabase.getInstance().getRedisDb()

    const cartData = await redisDB.hGetAll(`cart:${userId}`)

    if(!Object.keys(cartData).length) {
        const cartData = await Cart.findOne({userId})
        res.status(200).json({success: true, message: "Cart data fetched successfully...", data: JSON.stringify(cartData)})

        await redisDB.hSet(`cart:${userId}`, 'data', JSON.stringify(cartData))
        return
    }

    res.status(200).json({success: true, message: "Cart data fetched successfully...", data: JSON.stringify(cartData)})
}


export const removeFromCart = async(req: Request, res: Response) => {
    const {userId, productIds} = req.body

    const redisDB = RedisDatabase.getInstance().getRedisDb()

    await redisDB.del(`cart:${userId}`)
    res.status(200).json({success: true, message: "Cart Item deleted successfully..."})

    cartQueue.add('remove-from-cart', {userId, productIds, action: 'removeFromCart'})

}

