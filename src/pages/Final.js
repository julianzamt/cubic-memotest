import React, { useContext } from "react"
import AppContext from "../context/AppContext"

const Final = (props) => {
    const context = useContext(AppContext)

    return (
        <div>
            {
                props.winFlag ? <div>Win! :)</div> :
                    <div>Loose :(</div>

            }
        </div>
    )
}

export default Final