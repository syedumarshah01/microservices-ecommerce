export interface OrderItem {
    id: string,
    price: number,
    quantity: number
}

export interface PostgresOrderItem {
    order_id: string,
    product_id: string,
    quantity: number,
    unit_price: number
}

export interface Order {
    order_id: string,
    user_id: string,
    total_amount: number,
    
}