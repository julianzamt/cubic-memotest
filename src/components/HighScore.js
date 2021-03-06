import "./HighScore.css"

const HighScore = (props) => {
    return (
        <div className="highscore__container">
            <div>{props.index}. {props.username}</div>
            <div className="highscore__number">{props.score}</div>
        </div>
    )
}

export default HighScore