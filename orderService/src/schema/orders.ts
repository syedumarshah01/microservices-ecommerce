import {pgTable, integer, varchar, primaryKey, time, pgEnum, timestamp} from 'drizzle-orm/pg-core'

export const orderStatusEnum = pgEnum('order_status', ['Placed', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])

export const ordersTable = pgTable('orders', {
    order_id: varchar({length: 255}).primaryKey().notNull(),
    user_id: varchar({length: 255}).notNull(),
    total_amount: integer().notNull(),
    purchase_timestamp: timestamp('purchase_timestamp', {mode: 'string'}).defaultNow(),
    order_status: orderStatusEnum('order_status').default('Placed'),
})
