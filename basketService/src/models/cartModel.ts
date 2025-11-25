import mongoose from "mongoose";
import { Schema } from "mongoose";


const cartSchema = new Schema({
    // title: {type: String, required: true},
    // price: {type: Number, required: true},
    // description: {type: String},
    // imageUrl: {type: Array, required: true},
    // quantity: {type: Number, default: 1}
    userId: {type: String, required: true},
    cartData: {type: Array, default: []}
})


export default mongoose.model('Cart', cartSchema)