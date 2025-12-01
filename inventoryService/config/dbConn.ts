import {drizzle} from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'


class Database {
    private static _instance: Database | null = null
    private db: ReturnType<typeof drizzle>

    constructor() {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL!
        })

        this.db = drizzle(pool)
    }


    public static getInstance(): Database {
        if(!Database._instance) {
            Database._instance = new Database()
        }

        return Database._instance
    }

    public getDb() {
        return this.db
    }
}


export default Database
