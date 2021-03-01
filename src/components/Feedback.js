import React, { useContext } from "react"
import { useSpring, animated, config } from 'react-spring'
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
        onRest: () => { props.setFeedbackFlag(false); props.setFeedbackMessage(null) },
    })

    return (
        <div className="feedback__container">
            <animated.div style={fade}>{props.feedbackMessage}</animated.div>
            {
                !context.login && !props.feedbackFlag &&
                <div> Currently playing as <b>Guest</b>. Login for track your scores.</div>
            }
        </div>
    )
}

export default Feedback
