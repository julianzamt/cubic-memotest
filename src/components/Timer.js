import React, { useState, useEffect, useContext } from "react"
import AppContext from "../context/AppContext"
import "./Timer.css"

const Timer = (props) => {

    const context = useContext(AppContext)

    const [beat, setBeat] = useState(false)

    // Set timer for each level
    let initialTimeValue = null
    switch (context.level) {
        case 1:
            initialTimeValue = 20;
            break;
        default:
            initialTimeValue = 10;
            break;
    }

    const [time, setTime] = useState(initialTimeValue)

    useEffect(() => {
        time > -1 && setTimeout(() => setTime(prevState => prevState - 1), 1000);
        if (time === 5) {
            setBeat(true)
        }
    }, [time]);

    // if (time === -1) { props.setFinalFlag(true) }

    return (
        <div className="timer__container">
            <div className="timer__text">Time</div>
            <div className={beat ? "time beat" : "time"}>{time}</div>
        </div>
    )
}

export default Timer




