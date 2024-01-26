import fetch from 'node-fetch'

// generator 自动运行
function isPromise(fn) { 
    return 'function' === typeof fn.then
}

function toPromise(fn) { 
    if (isPromise(fn)) return fn
    if ('function' === typeof fn) return thunkToPromise(fn)
    return fn
}

/**
 * fn 是一个接受回调函数的函数
 * 
*/
function thunkToPromise(fn) { 
    return new Promise((res, rej) => { 
        fn((err, data) => { 
            if (err) {
              return rej(err)
            } 

            return res(data)
        })
    })
}

function run(gen) { 
    const g = gen()

    return new Promise((res, rej) => { 
        function next(val) { 
            let result
            try { 
                result = g.next(val)
            } catch (e) {
                rej(e)
            }
            
            if (result.done) { 
                return res(result.value)
            }

            result.value = toPromise(result.value)
    
            result.value.then(data => { 
                res(data)
            }, err => { 
                rej(err)
            })
    
        }
    
        next(g)
    })

}


function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var r2 = yield fetch('https://api.github.com/users/github/followers');
    var r3 = yield fetch('https://api.github.com/users/github/repos');

    console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
}

run(gen)