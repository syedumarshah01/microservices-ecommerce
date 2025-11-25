import connectMongoDb from "./config/dbConn"



const startWorker = async () => {
    await connectMongoDb()

    try {
        const cartWorker = await import("./src/workers/cartWorker")
    } catch(err) {
        console.log("Error Occurred: ", err)
    }
    

    console.log("Worker started and listening for jobs...")

}

startWorker()

// console.log("Processing Jobs...")
// cartWorker.run()
// mongoose.connection.on('open' , () => {
//     console.log("Here")
//     cartWorker.run()
// })

// process.on('SIGTERM', async() => {
//     await cartWorker.close()
//     process.exit(0)
// })


