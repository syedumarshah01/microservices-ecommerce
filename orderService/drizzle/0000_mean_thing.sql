CREATE TYPE "public"."order_status" AS ENUM('Placed', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled');--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_item_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_items_order_item_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"order_id" varchar(255),
	"product_id" varchar(255) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"unit_price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"total_amount" integer NOT NULL,
	"purchase_timestamp" timestamp DEFAULT now(),
	"order_status" "order_status" DEFAULT 'Placed'
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("order_id") ON DELETE no action ON UPDATE no action;