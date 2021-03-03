import React, { useEffect, useState } from "react"
import "./Timer.css"

const Timer = (props) => {

    const time = props.time
    const setTime = props.setTime

    const [beat, setBeat] = useState(false)

    useEffect(() => {
        if (!props.winFlag) {
            if (time >= 0) {
                setTimeout(() => setTime(prevState => prevState - 1), 1000)
            }
            time === 5 && setBeat(true)
        }
        else { setBeat(false) }
    }, [time]);

    if (time === -1) { props.setFinalFlag(true) }

    return (
        <div className="timer__container">
            <div className="timer__text">Time</div>
            <div className={beat ? "time beat" : "time"}>{time}</div>
        </div>
    )
}

export default Timer




