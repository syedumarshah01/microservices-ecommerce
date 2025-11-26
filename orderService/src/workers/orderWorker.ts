import { Job, Worker } from "bullmq";
import Database from "../../config/dbConn";
import { ordersTable } from "../schema/orders";
import { ordersItemsTable } from "../schema/orderItems";
import { Order, PostgresOrderItem } from "../types/types";


const connection = {
    host: 'localhost',
    port: 6379
}
const orderWorker = new Worker('order-persistence',
    async(job: Job) => {
        const {order, orderItems, action} = job.data

        if(action === 'createOrder') {
            createOrder(order, orderItems)
        }

       
},
    {
        connection,
        concurrency: 10
    }
)


const createOrder = async(order: Order, orderItems: PostgresOrderItem[]) => {
     const postgresDB = Database.getInstance().getDb()

    await postgresDB.transaction(async (tx) => {
        await tx.insert(ordersTable).values(order)
        await tx.insert(ordersItemsTable).values(orderItems)
    })
}


orderWorker.on('completed', () => {
    console.log("Completed")
})

orderWorker.on('failed', (err) => {
    console.log("Failed")
    console.log(err)
})


export default orderWorker