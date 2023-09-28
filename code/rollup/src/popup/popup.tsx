import { createRoot } from 'react-dom/client'
import React from 'react'

function App() {

    const toSetting = () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    }

    return <div style={{width: '300px', height: '400px'}}>
        hello, popup
        <div>
            <button onClick={toSetting}>设置</button>
        </div>
    </div>
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)