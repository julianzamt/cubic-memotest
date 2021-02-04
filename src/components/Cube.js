import React, { useState } from "react"
import logo from "../img/cube-outline.svg"
import francella1 from "../img/fran-tapa-boca.jpg"
import "./Cube.css"

const Cube = (props) => {
    const [isFlipped, setIsFlipped] = useState(false)
    const [cardFace, setCardFace] = useState(null)

    const handleFlip = () => {
        setIsFlipped(!isFlipped)
        isFlipped ? setCardFace("is-flipped") : setCardFace(null)
    }

    return (
        <div className="scene">
            <div className={`cube ${props.face}`}>
                <div className="cube__face cube__face--front">
                    <div className="card__scene">
                        <div className={`card__object ${cardFace}`} onClick={handleFlip}>
                            <div className="card__face card__face--front">
                                <img src={logo} alt="" width="100%" height="100%" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={francella1} alt="francella1" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--back">back</div>
                <div className="cube__face cube__face--right">right</div>
                <div className="cube__face cube__face--left">left</div>
                <div className="cube__face cube__face--top">top</div>
                <div className="cube__face cube__face--bottom">bottom</div>
            </div>
        </div>
    )
}

export default Cube