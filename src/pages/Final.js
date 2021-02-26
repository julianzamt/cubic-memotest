import React, { useContext } from "react"
import AppContext from "../context/AppContext"
import "./Final.css"

const Final = (props) => {
    const context = useContext(AppContext)

    const handleClick = () => {
        props.setFinalFlag(false)
    }

    return (
        <div className="final__container">
            {
                props.winFlag ?
                    <div>
                        <div>Win!</div>
                        <div>:)</div>
                        <div onClick={handleClick} className="play-again">Click to play again</div>
                    </div>
                    :
                    <div>
                        <div>Loose</div>
                        <div>:(</div>
                        <div onClick={handleClick} className="play-again">Click to play again</div>
                    </div>

            }
        </div>
    )
}

export default Final