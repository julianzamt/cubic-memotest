import React, { useState, useEffect } from "react"
import Countdown, { formatTimeDelta } from 'react-countdown';
import "./Timer.css"

const Timer = (props) => {
    return (
        <div className="timer__container">
            <Countdown
                date={Date.now() + (props.seconds * 1000)}
                renderer={props => <div>{props.seconds}</div>}
            />
        </div>
    )
}

export default Timer




