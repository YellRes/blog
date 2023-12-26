import a from './a.js';

export function handleClick() { 
    console.log(a, 'clicked')
}
if (import.meta.hot) { 
    import.meta.hot.accept();
}
