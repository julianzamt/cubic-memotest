import React, { useState, useContext } from "react"
import "./Board.css"
import Cube from "../components/Cube"
import AppContext from "../context/AppContext"
import Timer from "../components/Timer"
import Tries from "../components/Tries"
import Feedback from "../components/Feedback"
import Scores from "../components/Scores"

const Board = (props) => {

    const context = useContext(AppContext)

    // Lifted State for use it in <Current Figure /> and <Tries />
    let initialTriesValue = null;
    switch (context.level) {
        case 1:
            initialTriesValue = 6
            break
        default:
            initialTriesValue = 6
            break
    }
    const [tries, setTries] = useState(initialTriesValue)

    return (
        <div className="board__container">
            <Scores />
            <Timer setFinalFlag={props.setFinalFlag} />
            <Cube tries={tries} setTries={setTries} setFinalFlag={props.setFinalFlag} setWinFlag={props.setWinFlag} />
            <Tries tries={tries} />
            {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default Board

