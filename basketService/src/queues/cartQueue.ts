import {Queue} from 'bullmq'
import Redis from 'ioredis'


const connection = {
    host: 'localhost',
    port: 6379
}

const cartQueue = new Queue('cart-persistence', {connection})

export default cartQueue
