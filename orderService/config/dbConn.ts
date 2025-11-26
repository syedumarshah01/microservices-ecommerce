import {drizzle} from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'


export default class Database {
    private static _instance: Database | null = null
    private db: ReturnType<typeof drizzle>

    constructor() {
        const pool = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'apexpredator649000',
            database: 'orderservice',
            max: 20
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