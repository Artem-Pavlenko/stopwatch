import React, {useState, useEffect} from 'react'

const Stopwatch = () => {

    const START = 'START'
    const STOP = 'STOP'

    const [sec, setSec] = useState(55)
    const [min, setMin] = useState(0)
    const [hour, setHour] = useState(0)

    const [trigger, setTrigger] = useState(false)

    const [startStop, setStartStop] = useState(START)

    const fixTime = (num) => num < 10 ? '0' + num: num

    const onStartStop = () => {
        setStartStop(prev => prev === START ? STOP : START)
        if (startStop === STOP) {
            setTrigger(false)
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

    }

    useEffect( () => {

        const timer = trigger && setInterval( () => {
            setSec(prev => prev + 1)
        }, 1000)

        return () => {
            if (typeof timer == 'number')
            clearInterval(timer)
        }

    }, [setMin, trigger])

    useEffect( () => {
        if (sec >= 60) {
            setSec(0)
            setMin(prev => prev + 1)
        }
    }, [sec])

    useEffect( () => {
        if (min >= 60) {
            setMin(0)
            setHour(prev => prev + 1)
        }
    }, [min])

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