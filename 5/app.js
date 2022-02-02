const { PerformanceObserver , performance } = require('perf_hooks')

const perfomanceObserver = new PerformanceObserver((items , observer) => {
    // console.log(items.getEntries())
    const entry = items.getEntriesByName('slow').pop()
    console.log(`${entry.name}: ${entry.duration}`)
    observer.disconnect()
})

perfomanceObserver.observe({ entryTypes: ['measure'] })

function slow(){
    performance.mark('start')
    const arr = []
    for(let i = 0; i < 10000; i++ ){
        arr.push(i * i)
    }
    performance.mark('end')
    performance.measure('slow' , 'start' , 'end')
}

slow()