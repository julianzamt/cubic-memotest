import React, { useEffect, useState, useContext } from "react"
import AppContext from "../context/AppContext"
import "./Timer.css"
import HighScore from "../components/HighScore"
import firebase from "../config/firebase"

const Timer = (props) => {

    const { endGame, stopTimeFlag, bonusFlag } = useContext(AppContext)

    const rankingRef = firebase.db.collection("Ranking")

    const { time, setTime } = props

    const [beat, setBeat] = useState(false)
    const [timeUp, setTimeUp] = useState(false)
    const [hide, setHide] = useState(false)

    useEffect(() => {
        let timeout = null;
        if (!stopTimeFlag) {
            if (time > 0) {
                timeout = setTimeout(() => setTime(prevState => prevState - 1), 1000)
                time === 5 && setBeat(true)
            }
            else if (!time) {
                setTimeUp(true)
                setHide(true)
                endGame("lose")
            }
        }

        // if stopTimeFlag == true
        else { setBeat(false) }

        return () => { clearTimeout(timeout) }

    }, [time, setTime]);

    return (
        <div className={bonusFlag ? "timer__container timer__hidden" : "timer__container"} >
            {hide ? null : <div className="timer__text">Time</div>}
            {timeUp ? <div className="timeup">Time´s up!</div> :
                <div className={beat ? "time beat" : "time"}>{time}</div>
            }
        </div>
    )
}

export default Timer




