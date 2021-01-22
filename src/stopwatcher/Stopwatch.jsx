import React, {useState, useEffect} from 'react'

const Stopwatch = () => {

    const START = 'START'
    const STOP = 'STOP'

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
    const [startStop, setStartStop] = useState(START)


    const fixTime = (num) => num < 10 ? '0' + num : num

    const onStartStop = () => {
        setStartStop(prev => prev === START ? STOP : START)
        if (startStop === STOP) {
            setTrigger(false)
            reset()
        } else if (startStop === START) {
            setTrigger(true)
        }
    }

    const reset = () => {
        setSec(0)
        setMin(0)
        setHour(0)
    }

    const wait = () => {
        setClick(true)
        setTouchedWait(true)
        click && touchedWait && setSecClick(true)
    }

    const dblClick = () => {
        debugger
        setTrigger(false)
        startStop === STOP && setStartStop(START)
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


    useEffect( () => {
        click && setTimeout( () => setClick(false), 300)
    }, [click])
    useEffect( () => {
        click && touchedWait && setTimeout( () => setTouchedWait(false), 300)
    }, [click, touchedWait])
    useEffect( () => {
        secClick && setTimeout( () => setSecClick(false), 300)
    }, [secClick])
    useEffect( () => {
        if (click && touchedWait && secClick) {
            dblClick()
        }
    }, [click, touchedWait, secClick])


    return (
        <div>
            <h1>Stopwatch</h1>
            <span>{fixTime(hour)}:</span>
            <span>{fixTime(min)}:</span>
            <span>{fixTime(sec)}</span>
            <div>
                <button onClick={onStartStop}>{startStop}</button>
                <button onClick={wait}>wait</button>
                <button onClick={reset}>reset</button>
            </div>
        </div>
    )
}

export default Stopwatch