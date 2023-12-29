//b.js
console.log('b starting')
exports.done = false
const a = require('./a.cjs')
console.log(a.aa)
console.log('in b, a.done = %j', a.done)
exports.bb = 'bb'
exports.done = true
console.log('b done')
