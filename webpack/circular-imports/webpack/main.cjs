console.log('main starting')
const a = require('./a.cjs')
const b = require('./b.cjs')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)
