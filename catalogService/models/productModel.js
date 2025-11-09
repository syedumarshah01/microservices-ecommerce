import mongoose, { Schema } from "mongoose";


const productSchema = Schema({
    title: {type: String, required: true},
    price: {type: String, required: true},
    description: String,
    imageUrl: String
})


export default mongoose.model('Product', productSchema)