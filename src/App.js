import React, {useState} from 'react'
import './App.css'
import Stopwatch from "./stopwatcher/Stopwatch"
import StopwatchRxJs from "./stopwatcher/Stopwatch_RxJS"

function App() {

    const [trigger, setTrigger] = useState(false)

    return (
        <div className="App">
            <button disabled={!trigger} onClick={ () => setTrigger(prev => !prev)}>Stopwatch RxJS</button>
            <button disabled={trigger} onClick={ () => setTrigger(prev => !prev)}>Stopwatch</button>
            {trigger ? <Stopwatch/> : <StopwatchRxJs/>}
        </div>
    )
}

export default App
