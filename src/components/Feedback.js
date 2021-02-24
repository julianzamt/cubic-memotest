import { useSpring, animated, config } from 'react-spring'
import "./Feedback.css"

const Feedback = (props) => {

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
            <animated.div style={fade} className="feedback">{props.feedbackMessage}</animated.div>
        </div>
    )
}

export default Feedback
