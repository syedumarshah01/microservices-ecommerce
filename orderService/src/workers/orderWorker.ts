import { Job, Worker } from "bullmq";
import Database from "../../config/dbConn";
import { ordersTable } from "../schema/orders";
import { ordersItemsTable } from "../schema/orderItems";
import { Order, PostgresOrderItem } from "../types/types";
import { OrderStatus } from "../types/types";
import { eq } from "drizzle-orm";


const connection = {
    host: 'localhost',
    port: 6379
}
const orderWorker = new Worker('order-persistence',
    async(job: Job) => {
        const {order, orderItems, orderStatus, orderId, action} = job.data

        if(action === 'createOrder') {
            createOrder(order, orderItems)
        } else if(action === 'updateOrderStatus') {
            updateOrderStatus(orderId, orderStatus)
        }

       
},
    {
        connection,
        concurrency: 10
    }
)


const createOrder = async(order: Order, orderItems: PostgresOrderItem[]) => {
    const postgresDB = Database.getInstance().getDb()

    try {
        await postgresDB.transaction(async (tx) => {
        await tx.insert(ordersTable).values(order)
        await tx.insert(ordersItemsTable).values(orderItems)
    })
    } catch(err) {
        console.log("Error creating order...")
        console.log(err)
    }
    
}

const updateOrderStatus = async(orderId: string, orderStatus: OrderStatus) => {
    const postgresDB = Database.getInstance().getDb()
    try {
        await postgresDB.update(ordersTable).set({order_status: orderStatus}).where(eq(ordersTable.order_id, orderId))
    } catch(err) {
        console.log("Error updating order status...")
        console.log(err)
    }
}


orderWorker.on('completed', () => {
    console.log("Completed")
})

orderWorker.on('failed', (err) => {
    console.log("Failed")
    console.log(err)
})


export default orderWorker