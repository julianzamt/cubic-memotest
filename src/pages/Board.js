import React, { useState, useContext, useEffect } from "react"
import "./Board.css"
import Cube from "../components/Cube"
import AppContext from "../context/AppContext"
import Timer from "../components/Timer"
import Tries from "../components/Tries"
import Feedback from "../components/Feedback"
import Scores from "../components/Scores"
import Bonus from "../components/Bonus"
import Focus from "../components/Focus"

const Board = (props) => {

    const context = useContext(AppContext)

    // Focus, GO
    const [showFocus, setShowFocus] = useState(true)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowFocus(false)
        }, 3000)
        return () => clearTimeout(timeout)
    }, [])

    // Lifted states for use in Timer, Tries, Bonus & level setup
    let levelTries = 0;
    let levelTime = 0;
    let levelClearPoints = 0;
    switch (context.level) {
        case 1:
            levelTries = 6
            levelTime = 20
            levelClearPoints = 1000
            break;
        default:
            levelTries = 6
            levelTime = 20
            levelClearPoints = 1000
            break;
    }
    const [tries, setTries] = useState(levelTries)
    const [time, setTime] = useState(levelTime)
    const [stopTimeFlag, setStopTimeFlag] = useState(false)

    // Final animations
    const [winAnimationFlag, setWinAnimationFlag] = useState(false)
    const [looseAnimationFlag, setLooseAnimationFlag] = useState(false)

    // Prevent more than 2 cards being picked simultaneously
    const [lockCards, setLockCards] = useState(false)

    return (
        <div>
            {showFocus ? <Focus /> :
                <div className="board__container">
                    <Scores />
                    <Timer setFinalFlag={props.setFinalFlag} time={time} setTime={setTime} stopTimeFlag={stopTimeFlag} setLooseAnimationFlag={setLooseAnimationFlag} setStopTimeFlag={setStopTimeFlag} setLockCards={setLockCards} setWinFlag={props.setWinFlag} />
                    <div className="object__container">
                        {/* TODO renombrar winFlag a bonusFlag*/}
                        {props.winFlag ? <Bonus setFinalFlag={props.setFinalFlag} time={time} tries={tries} levelClearPoints={levelClearPoints} /> :
                            <Cube tries={tries} setTries={setTries} setFinalFlag={props.setFinalFlag} setWinFlag={props.setWinFlag} winFlag={props.winFlag} finalFlag={props.finalFlag} stopTimeFlag={stopTimeFlag} setStopTimeFlag={setStopTimeFlag} winAnimationFlag={winAnimationFlag} setWinAnimationFlag={setWinAnimationFlag} looseAnimationFlag={looseAnimationFlag} setLooseAnimationFlag={setLooseAnimationFlag} setLockCards={setLockCards} lockCards={lockCards} />
                        }
                    </div>
                    <Tries tries={tries} />
                    {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
                </div>
            }
        </div>
    )
}

export default Board

