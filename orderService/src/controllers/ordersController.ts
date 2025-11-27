import { Request, Response } from "express"
import { generateCustomOrderId, isValidOrderItem, isValidOrderStatus } from "../utils/utils"
import Database from "../../config/dbConn"
import { eq } from "drizzle-orm"
import { ordersTable } from "../schema/orders"
import { ordersItemsTable } from "../schema/orderItems"
import { Order, OrderItem, PostgresOrderItem } from "../types/types"
import orderQueue from "../queues/orderQueue"

export const createOrder = async(req: Request, res: Response) => {
    const {userId, orderData, totalAmount} = req.body
    const orderId = generateCustomOrderId()

    const order: Order = {
        order_id: orderId,
        user_id: userId,
        total_amount: totalAmount,
    }

    const orderItems: PostgresOrderItem[] = []

    for (const orderItem of orderData as OrderItem[]) {
        if(isValidOrderItem(orderItem)) {
            orderItems.push({
            order_id: orderId,
            product_id: orderItem.id,
            quantity: orderItem.quantity,
            unit_price: orderItem.price
            })
        } else {
            return res.status(400).json({success: false, message: "Invalid Order Items data passed..."})
        }
    }

    res.status(200).json({success: true, message: "Order Placed Successfully..."})

    await orderQueue.add('persist-order', {order, orderItems, action: 'createOrder'})
}


export const updateOrderStatus = async(req: Request, res: Response) => {
    const {orderStatus, orderId} = req.body
    

    if(!isValidOrderStatus(orderStatus)) {
        return res.status(400).json({success: false, message: "Invalid order status..."})
    }

    res.status(200).json({success: true, message: "Order status changed successfully..."})

    await orderQueue.add('update-order-status', {orderStatus, orderId, action: 'updateOrderStatus'})
}


export const getOrders = async(req: Request, res: Response) => {
    const {userId} = req.query
 
    const postgresDB = Database.getInstance().getDb()
    
    const allOrdersItems = {} as any

    if(!userId) return res.status(400).json({success: false, message: "No User ID provided..."})
    try {
        const orders: {order_id: string}[] = await postgresDB.select({order_id: ordersTable.order_id})
        .from(ordersTable)
        .where(eq(ordersTable.user_id, String(userId)))


        for (const order of orders) {
            const orderItems = await postgresDB.select()
            .from(ordersItemsTable)
            .where(eq(ordersItemsTable.order_id, String(order.order_id)))
            allOrdersItems[order.order_id] = orderItems
        }

        return res.status(200).json({success: true, data: JSON.stringify(allOrdersItems)})
        
    } catch(err) {
        
    }
}