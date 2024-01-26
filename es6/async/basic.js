import fetch from 'node-fetch'
import co from 'co'

function* gen() { 
    const r1 = yield fetch('https://api.github.com/users/github')
    const json1 = yield r1.json();
    console.log(json1.bio)
}

co(gen)

