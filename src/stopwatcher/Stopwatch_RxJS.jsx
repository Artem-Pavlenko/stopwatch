import React, {useEffect, useRef, useState} from 'react'
import {fromEvent, of, timer} from "rxjs"
import {timeout} from "rxjs/operators";


const StopwatchRxJs = () => {

    // time
    const [sec, setSec] = useState(55)
    const [min, setMin] = useState(0)
    const [hour, setHour] = useState(0)

    // start stop
    const [trigger, setTrigger] = useState(false)

    // simulate double click
    const [click, setClick] = useState(false)
    const [secClick, setSecClick] = useState(false)
    const [touchedWait, setTouchedWait] = useState(false)

    const startStopRef = useRef(null)
    const waitRef = useRef(null)
    const resetRef = useRef(null)

    const fixTime = (num) => num < 10 ? '0' + num : num
    const reset = () => {
        setSec(0)
        setMin(0)
        setHour(0)
    }


    // stop/start button
    useEffect(() => {
        const start$ = fromEvent(startStopRef.current, 'click').subscribe(() => {
            !trigger && setTrigger(true)
            if (trigger) {
                setTrigger(false)
                reset()
            }
        })
        return () => start$.unsubscribe()
    }, [trigger])

    // reset button
    useEffect(() => {
        const reset$ = fromEvent(resetRef.current, 'click').subscribe(() => reset())
        return () => reset$.unsubscribe()
    }, [])

    // wait button
    useEffect(() => {
        const wait$ = fromEvent(waitRef.current, 'click')
            .subscribe(() => {
                !click && setClick(true)
                !touchedWait && setTouchedWait(true)
                click && touchedWait && setSecClick(true)
            })
        return () => wait$.unsubscribe()
    }, [click, touchedWait, secClick])

    console.log('click:', click, ' touched: ', touchedWait, ' second click: ', secClick)

    // useEffect(() => {
    //     click && setTimeout(() => setClick(false), 300)
    //     click && touchedWait && setTimeout(() => setTouchedWait(false), 300)
    //     secClick && setTimeout(() => setSecClick(false), 300)
    //     click && touchedWait && secClick &&  setTrigger(false)
    //
    // }, [click, touchedWait, secClick])


    // wait
    useEffect(() => {
        let a$
        if (click) {
            a$ = of(click).pipe(timeout(500)).subscribe(() => {
                // console.log('click set falsy value')
                setTrigger(false)
                setClick(false)
            })
        }
        let b$
        if (click && touchedWait) {
            b$ = of(touchedWait).pipe(timeout(500)).subscribe(() => {
                setTouchedWait(false)
            })
        }

        let c$
        if (secClick) {
            c$ = of(secClick).pipe(timeout(500)).subscribe(() => {
                setSecClick(false)
            })
        }

        touchedWait && secClick &&  setTrigger(false)

        return () => {
            a$ && a$.unsubscribe()
            b$ && b$.unsubscribe()
            c$ && c$.unsubscribe()
        }

    }, [click, touchedWait, secClick])

    // useEffect( () => {
    //     let a$
    //     if (click) {
    //         a$ = of(click).pipe(timeout(300)).subscribe(() => {
    //             // console.log('click set falsy value')
    //             setClick(false)
    //         })
    //     }
    //     return () => {
    //         a$ && a$.unsubscribe()
    //     }
    // }, [click])
    // useEffect( () => {
    //     let b$
    //     if (touchedWait) {
    //         b$ = of(touchedWait).pipe(timeout(300)).subscribe(() => {
    //             setTouchedWait(false)
    //         })
    //     }
    //
    //     return () => {
    //         b$ && b$.unsubscribe()
    //     }
    // }, [touchedWait])

    // start observer
    useEffect(() => {
        let timer$
        if (trigger) {
            timer$ = timer(1000, 1000)
                .subscribe(() => setSec(prev => prev + 1))
        }

        return () => {
            // проверка на случай первой перерисовки
            // так как trigger меняется и запускается clearUp
            timer$ && timer$.unsubscribe()
        }
    }, [trigger])

    // correct time observer
    useEffect(() => {
        let minObserver = of(sec).subscribe(value => {
            if (value === 60) {
                setMin(prev => prev + 1)
                setSec(0)
            }
        })
        let hourObserver = of(min).subscribe(value => {
            if (value === 60) {
                setMin(0)
                setHour(prev => prev + 1)
            }
        })
        let timeObserver = of(hour).subscribe(value => {
            if (hour === 60) {
                reset()
            }
        })
        return () => {
            timeObserver.unsubscribe()
            hourObserver.unsubscribe()
            minObserver.unsubscribe()
        }

    }, [trigger, sec, min, hour])

    return (
        <div style={{border: '1px solid', padding: '20px'}}>
            <h2>Stopwatch RxJS</h2>
            <span>{fixTime(hour)}:</span>
            <span>{fixTime(min)}:</span>
            <span>{fixTime(sec)}</span>
            <div>
                <button ref={startStopRef}>{trigger ? 'STOP' : 'START'}</button>
                <button ref={waitRef} id={'pause'}>wait</button>
                <button ref={resetRef} id={'reset'}>reset</button>
            </div>
        </div>
    )
}


export default StopwatchRxJs