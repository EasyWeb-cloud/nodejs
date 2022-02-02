fs = require('fs')

const data = fs.readFileSync('./text.txt')
console.log(data.toString())