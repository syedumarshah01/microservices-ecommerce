import {pgTable, integer, varchar, primaryKey, time, pgEnum} from 'drizzle-orm/pg-core'
import { ordersTable } from './orders'

export const ordersItemsTable = pgTable('order_items', {
    order_item_id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: varchar({length: 255}).references(() => ordersTable.order_id),
    product_id: varchar({length:255}).notNull(),
    quantity: integer().notNull().default(1),
    unit_price: integer().notNull(),
})