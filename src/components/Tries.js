import "./Tries.css"
import React, { useContext } from "react"
import AppContext from "../context/AppContext"

const Tries = (props) => {

    const { bonusFlag } = useContext(AppContext)

    return (
        <div className="tries__container">
            <div className="tries__text">Tries left</div>
            <div>
                <div className="tries__number" key={props.tries}>{props.tries}</div>
            </div>
        </div>
    )
}

export default Tries