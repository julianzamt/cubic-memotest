import React, { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import "./Final.css"
import Feedback from "../components/Feedback"
import Ranking from "../components/Ranking"
import { useSpring, animated as a, config } from 'react-spring'


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

    const standUp = useSpring({
        from: { transform: 'rotateX(-90deg)' },
        to: { transform: 'rotateX(0deg)' },
        config: { mass: 3, tension: 180, friction: 12 }
    })

    return (
        <div className="final__container">
            {props.winFlag ? <a.div className="result" style={standUp}> You win! :)</a.div> : <a.div className="result" style={standUp}>You loose :(</a.div>}
            <div className="final__score">Score {context.score} pts</div>
            <div>Thanks for playing Cubic Memotest Demo</div>
            <div>©2021 Julián Zamt</div>
            <Ranking />
            <div className="buttons__container">
                <button onClick={handleClick} className="final__button">Play again</button>
                <button onClick={handleClick} name="exit" className="final__button">Exit Game</button>
            </div>
            {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default Final