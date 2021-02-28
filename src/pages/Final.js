import React, { useContext } from "react"
import AppContext from "../context/AppContext"
import "./Final.css"
import Feedback from "../components/Feedback"

const Final = (props) => {
    const context = useContext(AppContext)

    const handleStart = () => {
        props.setFinalFlag(false)
        props.setWinFlag(false)
        context.setInit(true)
    }

    const handleExit = () => {
        props.setFinalFlag(false)
        props.setWinFlag(false)
        props.setInitialScreenFlag(true)
        context.setInit(true)
    }

    return (
        <div className="final__container">
            {
                props.winFlag ?
                    <div>
                        <div>Win!</div>
                        <div>:)</div>
                        <div onClick={handleStart} className="play-again">Click to play again</div>
                        <div onClick={handleExit} className="play-again">Exit Game</div>
                    </div>
                    :
                    <div>
                        <div>Loose</div>
                        <div>:(</div>
                        <div onClick={handleStart} className="play-again">Click to play again</div>
                        <div onClick={handleExit} className="play-again">Exit Game</div>
                    </div>

            }
            {props.feedbackFlag || !context.login ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default Final