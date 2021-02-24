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
            initialTimeValue = 10;
            break;
        default:
            initialTimeValue = 10;
            break;
    }

    const [time, setTime] = useState(initialTimeValue)
    const [startTime] = useState(new Date())

    useEffect(() => {
        time > 0 && setTimeout(() => setTime(prevState => prevState - 1), 1000);
        if (time === 5) {
            setBeat(true)
        }
    }, [time]);

    if (!time) { props.setFinalFlag(true) }

    return (
        <div className="timer__container">
            <div className={beat ? "time beat" : "time"}>{time}</div>
        </div>
    )
}

export default Timer




