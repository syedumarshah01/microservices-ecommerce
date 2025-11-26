import {Queue} from 'bullmq'


const connection = {
    host: 'localhost',
    port: 6379
}
const orderQueue = new Queue('order-persistence', {connection})


export default orderQueue