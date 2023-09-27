import { createRoot } from 'react-dom/client'
import React from 'react'


function App() { 
    return <div>
        hello, popup
    </div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)