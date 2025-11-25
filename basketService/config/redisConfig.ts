import {createClient} from 'redis'


class RedisDatabase {
    private static _instance: RedisDatabase | null = null
    private db: ReturnType<typeof createClient>

    private constructor() {
        this.db = createClient()
        this.db.connect()
    }

    public static getInstance(): RedisDatabase {
        if(!RedisDatabase._instance) {
         RedisDatabase._instance = new RedisDatabase()
        }
        return RedisDatabase._instance
    }

    public getRedisDb() {
        return this.db
    }
}

export default RedisDatabase