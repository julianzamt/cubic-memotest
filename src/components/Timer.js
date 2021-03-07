import React, { useEffect, useState } from "react"
import "./Timer.css"

const Timer = (props) => {

    const { setFinalFlag, time, setTime, stopTimeFlag, setLooseAnimationFlag, setLockCards, winFlag } = props

    const [beat, setBeat] = useState(false)
    let timeUp = false

    useEffect(() => {
        let timeout = null
        if (!stopTimeFlag) {
            if (time >= 0) {
                timeout = setTimeout(() => setTime(prevState => prevState - 1), 1000)
            }
            time === 5 && setBeat(true)
        }
        // if win, during Bonus
        else { setBeat(false) }

        return () => clearTimeout(timeout)

    }, [time, setTime, stopTimeFlag]);

    if (time < 0) {
        timeUp = true
        setLockCards(true)
        setLooseAnimationFlag(true)
        setTimeout(() => {
            setFinalFlag(true)
        }, 3000)
    }

    return (
        <div className={winFlag ? "timer__container timer__hidden" : "timer__container"} >
            <div className="timer__text">Time</div>
            {timeUp ? <div className="timeup">Time´s up!</div> :
                <div className={beat ? "time beat" : "time"}>{time}</div>
            }
        </div>
    )
}

export default Timer




