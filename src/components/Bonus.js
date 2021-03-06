import React, { useContext, useState, useEffect } from "react"
import AppContext from "../context/AppContext"
import "./Bonus.css"

const Bonus = (props) => {

    const context = useContext(AppContext)

    console.log("Bonus score before useeffect: " + context.score)

    const triesLeftPoints = props.tries * 500
    const timeLeftPoints = props.time * 100

    const totalBonusPoints = props.levelClearPoints + triesLeftPoints + timeLeftPoints

    useEffect(() => {
        context.setScore(context.score + totalBonusPoints)
    }, [])

    const handleClick = () => {
        props.setFinalFlag(true)
        context.setInit(false)
    }

    return (
        <div className="bonus__container">
            <h3 className="bonus__title">Stage {context.level} Cleared!</h3>
            <div className="bonus__points">
                <div>Level completed</div> <div className="points">{props.levelClearPoints} pts</div>
                <div>{props.tries} tries left</div> <div className="points">{triesLeftPoints} pts</div>
                <div>{props.time} seconds left</div> <div className="points">{timeLeftPoints} pts</div>
                <hr className="horizontal-line" /> <hr className="horizontal-line" />
                <div>Bonus</div> <div className="points">{totalBonusPoints} pts</div>
                <div>Score</div> <div className="points">{context.score} pts</div>
            </div>
            <button className="bonus__button" onClick={handleClick}>Continue</button>
        </div>
    )
}

export default Bonus