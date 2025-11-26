import mongoose from 'mongoose'


const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI!)
        console.log("MongoDB Connected Successfully...")
    } catch(err) {
        console.log("Error connecting to MongoDB...")
        console.log(err)
    }
}

export default connectMongoDB