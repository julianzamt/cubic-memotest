import LittleCube from "../components/LittleCube"
import "./InitialScreen.css"
import Feedback from "../components/Feedback";
import React, { useState, useContext } from "react"
import AppContext from "../context/AppContext"
import InstructionsModal from "../components/InstructionsModal"

const InitialScreen = (props) => {

    const { startGame } = useContext(AppContext)

    // Instructions dialog logic
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    };

    function handleClick(e) {
        const name = e.target.name
        if (name) {
            setOpen(true);
        }
        else {
            // TODO context.initialize()
            startGame()
        }
    }

    return (
        <div className="initialScreen__container">
            <div style={{ textAlign: "center" }}>
                <h4 className="welcome__h4">Welcome to</h4>
                <h1 className="welcome__h1">Cubic Memotest</h1>
            </div>
            <LittleCube />
            <div className="initialButton__container">
                <button className="start__button" onClick={handleClick}>Start</button>
                <button className="instructions__button" name="instructions" onClick={handleClick}>Instructions</button>
            </div>
            <InstructionsModal open={open} onClose={handleClose} />
            {props.feedbackFlag ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default InitialScreen