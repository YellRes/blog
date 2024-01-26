import { Readable } from 'stream'

// 事件监听
function readableToStringByEvent(readStream) { 
    return new Promise((res, rej) => { 
        let data = ''
        readStream.on('data', chunk => data += chunk)
        readStream.on('end', () => res(data))
        readStream.on('error', err => rej(err))
    })
}

// 异步迭代
async function readableToStringByAsyncIterator(readStream) { 
    let data = ''
    for await (let chunk of readStream) { 
        data += chunk
    }
    return data
}

const readStream = Readable.from('long time no see, yellres!', { encoding: 'utf-8' })
const readStream2 = Readable.from('long time no see, korha!', { encoding: 'utf-8' })
console.log(await readableToStringByAsyncIterator(readStream), 'by iterator')
console.log(await readableToStringByEvent(readStream2), 'by event') 