import { OrderItem } from "../types/types";

export function generateCustomOrderId() {
  const prefix = 'ORD'; // Or a store-specific prefix
  const timestamp = Date.now().toString(36); // Base 36 for shorter output
  const randomSuffix = Math.random().toString(36).substring(2, 8); // Short random string
  return `${prefix}-${timestamp}-${randomSuffix}`.toUpperCase();
}


// export function isOrderItem(obj: any): obj is OrderItem {
//   return (
//     typeof obj === 'object' &&
//     obj !== null &&
//     'id' in obj &&
//     'title' in obj &&
//     'price' in obj &&
//     'description' in obj &&
//     'imageUrl' in obj &&
//     'quantity' in obj &&
//     typeof obj.id === 'string' &&
//     typeof obj.title === 'string' &&
//     typeof obj.price === 'number' &&
//     typeof obj.description === 'string' &&
//     typeof obj.imageUrl === 'string' &&
//     typeof obj.quantity === 'number'
//   )
// }


export const isValidOrderItem = (obj: any): obj is OrderItem => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'price' in obj && 
    'quantity' in obj &&
    typeof obj.id === 'string' &&
    typeof obj.price === 'number' &&
    typeof obj.quantity === 'number'
  )
}


