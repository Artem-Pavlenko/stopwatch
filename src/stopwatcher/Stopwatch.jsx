import React, {useState, useEffect} from 'react'

const Stopwatch = () => {

    // time
    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(0)
    const [hour, setHour] = useState(0)

    // simulate double click
    const [click, setClick] = useState(false)
    const [secClick, setSecClick] = useState(false)
    const [touchedWait, setTouchedWait] = useState(false)

    // start/stop
    const [trigger, setTrigger] = useState(false)

    const fixTime = (num) => num < 10 ? '0' + num : num

    const onStartStop = () => {
        !trigger && setTrigger(true)
        if (trigger) {
            setTrigger(false)
            reset()
        }
    }

    // console.log('click:', click, ' touched: ', touchedWait, ' second click: ', secClick)

    const reset = () => {
        setSec(0)
        setMin(0)
        setHour(0)
    }

    const wait = () => {
        !click && setClick(true)
        !touchedWait && setTouchedWait(true)
        click && touchedWait && setSecClick(true)
    }


    // tick-tack =)
    useEffect(() => {
        const timer = trigger && setInterval(() => {
            setSec(prev => prev + 1)
        }, 1000)

        if (sec >= 60) {
            setSec(0)
            setMin(prev => prev + 1)
        }

        if (min >= 60) {
            setMin(0)
            setHour(prev => prev + 1)
        }

        return () => {
            if (typeof timer == 'number')
                clearInterval(timer)
        }
    }, [trigger, sec, min])

    // simulate double click
    useEffect(() => {
        click && setTimeout(() => setClick(false), 300)
        click && touchedWait && setTimeout(() => setTouchedWait(false), 300)
        secClick && setTimeout(() => setSecClick(false), 300)
        click && touchedWait && secClick &&  setTrigger(false)

    }, [click, touchedWait, secClick])

    return (
        <div style={{border: '1px solid', padding: '20px'}}>
            <h2>Stopwatch</h2>
            <span>{fixTime(hour)}:</span>
            <span>{fixTime(min)}:</span>
            <span>{fixTime(sec)}</span>
            <div>
                <button onClick={onStartStop}>{trigger ? 'STOP' : 'START'}</button>
                <button onClick={wait}>wait</button>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    )
}

export default Stopwatch