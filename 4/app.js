const EventEmitter = require('events')

const myEmitter = new EventEmitter()
myEmitter.setMaxListeners(3)

const connectDB = () => {
    console.log('connected func')
}

myEmitter.addListener('connected' , connectDB)
myEmitter.emit('connected')
myEmitter.removeListener('connected' , connectDB) 
myEmitter.emit('connected')

myEmitter.on('msg' , (name) => {
    console.log(`Hello ${name}`)
})
myEmitter.emit('msg' , 'Danil' )

console.log(myEmitter.getMaxListeners())
console.log(myEmitter.listenerCount('connected'))
console.log(myEmitter.listenerCount('msg'))
console.log(myEmitter.listeners())