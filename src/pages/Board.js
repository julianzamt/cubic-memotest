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

    return (
        <div>
            {showFocus ? <Focus /> :
                <div className="board__container">
                    <Scores />
                    <Timer time={time} setTime={setTime} />
                    <div className="object__container">
                        {/* TODO renombrar winFlag a bonusFlag*/}
                        {context.bonusFlag ? <Bonus time={time} tries={tries} levelClearPoints={levelClearPoints} /> :
                            <Cube tries={tries} setTries={setTries} />
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

