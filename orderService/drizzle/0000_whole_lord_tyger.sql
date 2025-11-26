CREATE TYPE "public"."order_status" AS ENUM('Placed', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled');--> statement-breakpoint
--> statement-breakpoint
CREATE TABLE "orders" (
	"order_id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"total_amount" integer NOT NULL,
	"purchase_timestamp" timestamp DEFAULT now(),
	"order_status" "order_status" DEFAULT 'Placed'
);
--> statement-breakpoint
