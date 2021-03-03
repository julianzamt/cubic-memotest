import React, { useContext } from "react"
import AppContext from "../context/AppContext"
import "./Final.css"
import Feedback from "../components/Feedback"

const Final = (props) => {
    const context = useContext(AppContext)

    const handleClick = (e) => {
        const name = e.target.name
        props.setFinalFlag(false)
        props.setWinFlag(false)
        context.setInit(true)
        context.setScore(0)
        if (name === "exit") {
            props.setInitialScreenFlag(true)
        }
    }

    return (
        <div className="final__container">
            {props.winFlag ? <div className="result"> You win! :)</div> : <div className="result">You loose :(</div>}
            <div className="final__score">Score {context.score} pts</div>
            <div>Thanks for playing Cubic Memotest Demo</div>
            <div>©2021 Julián Zamt</div>
            <div className="highscores">HighScores</div>
            <div className="buttons__container">
                <button onClick={handleClick} className="final__button">Play again</button>
                <button onClick={handleClick} name="exit" className="final__button">Exit Game</button>
            </div>
            {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default Final