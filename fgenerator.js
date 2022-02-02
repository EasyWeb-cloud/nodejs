// function* logGenerator(i){
//     yield i + 1
//     yield i + 2
//     yield i + 3
// }

// const consoleResult = i => {
//     console.log(i)
// }

// const log = logGenerator(0)

// consoleResult(log.next())
// consoleResult(log.next())
// consoleResult(log.next())

function* generator(){
    let i = 0
    while (i < 2){
        yield i++
    }
}

const gen = generator()

console.log(gen)
console.log(gen.next())
console.log(gen)
console.log(gen)
