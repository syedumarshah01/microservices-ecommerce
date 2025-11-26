import { Request, Response } from "express"
import { generateCustomOrderId, isValidOrderItem } from "../utils/utils"
import Database from "../../config/dbConn"
import { sql } from "drizzle-orm"
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