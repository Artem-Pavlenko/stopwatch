import React from 'react'
import './App.css'
import Stopwatch from "./stopwatcher/Stopwatch"
import StopwatchRxJs from "./stopwatcher/Stopwatch_RxJS"

function App() {

    return (
        <div className="App">
            {/*<Stopwatch/>*/}
            <StopwatchRxJs/>
        </div>
    )
}

export default App
