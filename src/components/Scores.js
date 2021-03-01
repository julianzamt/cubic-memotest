import React, { useContext } from "react"
import "./Scores.css"
import AppContext from "../context/AppContext"

const Scores = () => {
    const context = useContext(AppContext)

    return (
        <div className="scores__container">
            <div>Score {context.score}</div>
            <div>Highscore 0000</div>
        </div>
    )
}

export default Scores