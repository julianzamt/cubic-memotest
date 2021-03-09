import React, { useContext } from "react"
import AppContext from "../context/AppContext"
import "./Ranking.css"

const Ranking = () => {

    const context = useContext(AppContext)

    return (
        <div className="ranking__container">
            <div className="ranking__text">Highscores</div>
            {context.ranking}
        </div>
    )
}

export default Ranking