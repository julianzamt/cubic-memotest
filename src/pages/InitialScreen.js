import LittleCube from "../components/LittleCube"
import "./InitialScreen.css"
import Feedback from "../components/Feedback";

const InitialScreen = (props) => {
    function initialize() {
        props.setInitialScreenFlag(false)
        props.setFinalFlag(false)
    }

    return (
        <div className="initialScreen__container">
            <div>
                <h4 style={{ textAlign: "center" }}>Welcome to</h4>
                <h1>Cubic Memotest</h1>
            </div>
            <LittleCube />
            <button className="start__button" onClick={initialize}>Click to start</button>
            {props.feedbackFlag ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default InitialScreen