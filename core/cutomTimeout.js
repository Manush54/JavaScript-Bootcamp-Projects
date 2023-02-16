//  Using Promise Async Await
const timeouts = [4000,2000,3000,1000]

async function wait(timeouts) {

    for (let timeout of timeouts) {

        console.log("Processing")
        console.log(`Wait for ${timeout} ms`)
        // Wait for specified ms
        await new Promise(resolve => setTimeout(resolve, timeout))
        console.log("Processed")
    }
    
    console.log("Completed")
}

wait(timeouts)