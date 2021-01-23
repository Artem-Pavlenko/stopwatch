import React, {useEffect, useRef, useState} from 'react'
import {BehaviorSubject, fromEvent, interval, Observable, timer} from "rxjs";



const StopwatchRxJs = () => {


    const interval$ = timer(1000,1000)

    const fixTime = (num) => num < 10 ? '0' + num : num
    const [sec, setSec] = useState(55)
    const [min, setMin] = useState(0)
    const [hour, setHour] = useState(0)

    // start stop
    const [trigger, setTiger] = useState(false)

    const startStopRef = useRef(null)
    const waitRef = useRef(null)
    const resetRef = useRef(null)



    let timer$

    useEffect( () => {
        const start$ = fromEvent(startStopRef.current, 'click').subscribe( click => {
            setTiger(prev => !prev)
        })

        const reset$ = fromEvent(resetRef.current, 'click').subscribe(click => {
            setSec(0)
            setMin(0)
            setHour(0)
        })

        const wait$ = fromEvent(waitRef.current, 'click').subscribe(click => {

        })


        return () => {
            wait$.unsubscribe()
            reset$.unsubscribe()
            start$.unsubscribe()
        }

    }, [])




    useEffect( () => {
        // timer$ = interval$.subscribe( x => setSec(x))
        if (trigger) {
            timer$ = interval$.subscribe(() => setSec(prev => prev + 1))
        }


        return () => {
            // проверка на случай первой перерисовки
            // так как trigger меняется и запускается clearUp
           timer$ && timer$.unsubscribe()
        }
    }, [trigger])


    // upt stopwatch
    useEffect(() => {
        if (sec >= 60) {
            setSec(0)
            setMin(prev => prev + 1)
        }
        if (min >= 60) {
            setMin(0)
            setHour(prev => prev + 1)
        }
    }, [trigger, sec, min])

    return (
        <div style={{border: '1px solid', padding: '20px'}}>
            <h2>Stopwatch RxJS</h2>
            <span>{fixTime(hour)}:</span>
            <span>{fixTime(min)}:</span>
            <span>{fixTime(sec)}</span>
            <div>
                <button ref={startStopRef} >{trigger ? 'STOP' : 'START'}</button>
                <button ref={waitRef} id={'pause'} >wait</button>
                <button ref={resetRef} id={'reset'}>reset</button>
            </div>
        </div>
    )
}


export default StopwatchRxJs