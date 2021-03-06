import React, { useState, useContext } from "react"
import "./Board.css"
import Cube from "../components/Cube"
import AppContext from "../context/AppContext"
import Timer from "../components/Timer"
import Tries from "../components/Tries"
import Feedback from "../components/Feedback"
import Scores from "../components/Scores"
import Bonus from "../components/Bonus"

const Board = (props) => {

    const context = useContext(AppContext)

    // Lifted states for use in Timer, Tries, Bonus & level setup
    let levelTries = null
    let levelTime = null
    let levelClearPoints = null
    switch (context.level) {
        case 1:
            levelTries = 6
            levelTime = 20
            levelClearPoints = 1000
            break
        default:
            levelTries = 6
            levelTime = 20
            levelClearPoints = 1000
            break
    }
    const [tries, setTries] = useState(levelTries)
    const [time, setTime] = useState(levelTime)
    const [stopTimeFlag, setStopTimeFlag] = useState(false)
    // Final animations
    const [winAnimationFlag, setWinAnimationFlag] = useState(false)
    const [looseAnimationFlag, setLooseAnimationFlag] = useState(false)

    return (
        <div className="board__container">
            <Scores />
            <Timer setFinalFlag={props.setFinalFlag} time={time} setTime={setTime} stopTimeFlag={stopTimeFlag} setLooseAnimationFlag={setLooseAnimationFlag} />
            <div className="object__container">
                {props.winFlag ? <Bonus setFinalFlag={props.setFinalFlag} time={time} tries={tries} levelClearPoints={levelClearPoints} /> :
                    <Cube tries={tries} setTries={setTries} setFinalFlag={props.setFinalFlag} setWinFlag={props.setWinFlag} winFlag={props.winFlag} finalFlag={props.finalFlag} stopTimeFlag={stopTimeFlag} setStopTimeFlag={setStopTimeFlag} winAnimationFlag={winAnimationFlag} setWinAnimationFlag={setWinAnimationFlag} looseAnimationFlag={looseAnimationFlag} setLooseAnimationFlag={setLooseAnimationFlag} />
                }
            </div>
            <Tries tries={tries} />
            {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default Board

