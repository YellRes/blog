//a.js
console.log('a starting')
exports.done = false
const b = require('./b.cjs')
console.log(b.bb)
console.log('in a, b.done = %j', b.done)
exports.aa  = 'aa'
exports.done = true
console.log('a done')
