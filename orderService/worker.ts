import orderWorker from "./src/workers/orderWorker";

console.log("Worker listening for jobs...")


process.on('SIGTERM', async() => {
    await orderWorker.close()
    process.exit(0)
})