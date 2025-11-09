import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB