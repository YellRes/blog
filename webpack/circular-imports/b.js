import c from './c.js'
// console.log('a', a)
export default 'moduleB'

if (import.meta.hot) { 
    import.meta.hot.accept();
}
