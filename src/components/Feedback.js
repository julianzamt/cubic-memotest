import React, { useContext } from "react"
import { useSpring, animated as a, config } from 'react-spring'
import "./Feedback.css"
import AppContext from "../context/AppContext"

const Feedback = (props) => {

    const context = useContext(AppContext)

    const fade = useSpring({
        to: {
            opacity: props.feedbackFlag ? 0 : 1
        },
        from: { opacity: 1 },
        delay: 2500,
        config: { ...config.slow },
        onRest: () => { props.setFeedbackFlag(false); props.setFeedbackMessage('') },
    })

    return (
        <div className="feedback__container">
            {props.feedbackFlag ? <a.div style={fade}>{props.feedbackMessage}</a.div> : null}
            {
                !context.login && !props.feedbackMessage &&
                <div> Currently playing as <b>Guest</b>. Login for track your scores.</div>
            }
        </div>
    )
}

export default Feedback
