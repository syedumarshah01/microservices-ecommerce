import {createClientPool} from 'redis'


class Redis {
    private static _instance: Redis | null = null
    private db: ReturnType<typeof createClientPool>

    constructor() {
        const pool = createClientPool({
            url: process.env.REDIS_URL
        })
        this.db = pool
        this.db.connect()
    }

    public static getInstance(): Redis {
        if(!Redis._instance) {
            Redis._instance = new Redis()
        }
        return Redis._instance
    }

    public getDB() {
        return this.db
    }
}


export default Redis