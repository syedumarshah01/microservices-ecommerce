import { pgTable, varchar, integer, timestamp, foreignKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const orderStatus = pgEnum("order_status", ['Placed', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'])


export const orders = pgTable("orders", {
	orderId: varchar("order_id", { length: 255 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	totalAmount: integer("total_amount").notNull(),
	purchaseTimestamp: timestamp("purchase_timestamp", { mode: 'string' }).defaultNow(),
	orderStatus: orderStatus("order_status").default('Placed'),
});

export const orderItems = pgTable("order_items", {
	orderItemId: integer("order_item_id").primaryKey().generatedAlwaysAsIdentity({ name: "order_items_order_item_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	orderId: varchar("order_id", { length: 255 }),
	productId: varchar("product_id", { length: 255 }).notNull(),
	quantity: integer().default(1).notNull(),
	unitPrice: integer("unit_price").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.orderId],
			foreignColumns: [orders.orderId],
			name: "order_items_order_id_orders_order_id_fk"
		}),
]);
