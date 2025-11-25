import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


// const uri = process.env.MONGODB_CONNECTION_URI || 'mongodb://localhost:27017/';

// mongoose.connect(uri)
//   .then(() => console.log('MongoDB connected successfully!'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Wait for the 'connected' event before running your worker
// The worker should be wrapped in a function that only executes after the connection succeeds.
const connectMongoDb = async() =>  {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI!)
        console.log("Connected to MongoDB Successfully...")
    } catch(err) {
        console.log("Error connecting to MongoDB", err)
    }
}

export default connectMongoDb