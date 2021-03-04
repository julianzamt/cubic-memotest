import LittleCube from "../components/LittleCube"
import "./InitialScreen.css"
import Feedback from "../components/Feedback";

const InitialScreen = (props) => {
    function handleClick() {
        props.setInitialScreenFlag(false)
        props.setFinalFlag(false)
    }

    return (
        <div className="initialScreen__container">
            <div style={{ textAlign: "center" }}>
                <h4 className="welcome__h4">Welcome to</h4>
                <h1 className="welcome__h1">Cubic Memotest</h1>
            </div>
            <LittleCube />
            <button className="start__button" onClick={handleClick}>Start</button>
            {props.feedbackFlag ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default InitialScreen