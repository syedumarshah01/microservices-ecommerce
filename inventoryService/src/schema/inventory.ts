import { PgTable, integer, pgTable, varchar } from "drizzle-orm/pg-core";


export const inventoryTable = pgTable('inventory', {
    product_id: varchar({length: 255}).primaryKey(),
    quantity: integer().notNull()
})


