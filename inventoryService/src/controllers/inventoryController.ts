import { Request, Response } from "express";
import { inventoryTable } from "../schema/inventory";
import Database from "../../config/dbConn";
import Redis from "../../config/redis";
import { eq, sql } from "drizzle-orm";


export const getCurrentQuantity = async(req: Request, res: Response) => {
    const {productId} = req.query

    const postgresDB = Database.getInstance().getDb()
    const redisDB = Redis.getInstance().getDB()

    const productQuantity = await redisDB.hGetAll(`inventory:${productId}`)
    
    if(Object.keys(productQuantity).length) return res.status(200).json({success: true, data: productQuantity, message: "Redis"})


    try {
        const productQuantity: typeof inventoryTable.$inferSelect[] = await postgresDB.select().from(inventoryTable)
        .where(eq(inventoryTable.product_id, productId as string))
        
        res.status(200).json({success: true, data: productQuantity[0], message: "DB"})
        
        await redisDB.hSet(`inventory:${productId}`, 'data', JSON.stringify(productQuantity[0]))
        return
        
    } catch(err) {
        console.log(err)
        return res.status(500).json({success: false, message: "Failed fetching quantity from inventory..."})
    }
}


export const increment = async(req: Request, res: Response) => {
    const {productId, quantity} = req.body

    const postgresDB = Database.getInstance().getDb()
    const redisDB = Redis.getInstance().getDB()

    try {
        const incrementedProductAndQuantity: typeof inventoryTable.$inferSelect[] = await postgresDB.update(inventoryTable).set({quantity: sql`${inventoryTable.quantity} + ${quantity}`}).where(eq(inventoryTable.product_id, productId)).returning()
        res.status(200).json({success: true, data: incrementedProductAndQuantity[0]})
        await redisDB.del(`inventory:${productId}`)
    } catch(err) {
        console.log(err)
    }
}

export const decrement = async(req: Request, res: Response) => {
    const {productId, quantity} = req.body

    const postgresDB = Database.getInstance().getDb()
    const redisDB = Redis.getInstance().getDB()

    const currentQuantity: {quantity: number}[] = await postgresDB.select({quantity: inventoryTable.quantity}).from(inventoryTable).where(eq(inventoryTable.product_id, productId))
    
    if(currentQuantity[0].quantity === 0 || (currentQuantity[0].quantity - quantity) < 0) {
        return res.status(500).json({success: false, message: "Out of stock..."})
    }

    try {
        const decrementedProductAndQuantity = await postgresDB.update(inventoryTable).set({quantity: sql`${inventoryTable.quantity} - ${quantity}`}).where(eq(inventoryTable.product_id, productId)).returning()
        res.status(200).json({success: true, data: decrementedProductAndQuantity[0]})
        await redisDB.del(`inventory:${productId}`)
    } catch(err) {
        console.log(err)
    }
}

export const addProduct = async(req: Request, res: Response) => {
    const {productId, quantity} = req.body

    const postgresDB = Database.getInstance().getDb()

    try {
        const insertedProduct: typeof inventoryTable.$inferInsert[] = await postgresDB.insert(inventoryTable).values({product_id: productId, quantity: quantity}).returning()

        return res.status(201).json({success: true, data: insertedProduct[0]})
    } catch(err) {
        console.log(err)
        return res.status(500).json({success: false, message: err})
    }
}