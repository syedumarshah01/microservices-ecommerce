import {Queue} from 'bullmq'
import { redisConnection } from '../../../shared/config/redis'

const orderQueue = new Queue('orderQueue', {connection: redisConnection})


export default orderQueue