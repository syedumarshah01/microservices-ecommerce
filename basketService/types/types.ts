export interface CartJob {
    userId: string,
    cartItem: CartItem
    action: String
}


export interface CartItem {
    id: string,
    title: string,
    price: Number,
    description: string,
    imageUrl: string,
    quantity: Number
}

export interface UserCart {
    userId: string,
    cartData: CartItem[]
}