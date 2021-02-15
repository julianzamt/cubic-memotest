import React, { useState, useEffect, useContext } from "react"
import AppContext from "../context/AppContext"
import logo from "../img/cube-outline.svg"
import "./Cube.css"
import { cubeFrancellas } from "../helpers/randomFrancellas"

const Cube = (props) => {
    const context = useContext(AppContext)

    // Each card flip state
    const [frontFlip, setFrontFlip] = useState(false)
    const [backFlip, setBackFlip] = useState(false)
    const [leftFlip, setLeftFlip] = useState(false)
    const [rightFlip, setRightFlip] = useState(false)
    const [topFlip, setTopFlip] = useState(false)
    const [bottomFlip, setBottomFlip] = useState(false)

    // Game logic states
    const [currentCards, setCurrentCards] = useState([])
    const [currentFaces, setCurrentFaces] = useState([])
    const [activeFaces, setActiveFaces] = useState(["front", "back", "right", "left", "top", "bottom"])

    const handleClick = (e) => {
        const eventCard = e.target.getAttribute("card")
        const face = e.target.getAttribute("face")
        switch (face) {
            case "front":
                setFrontFlip(!frontFlip)
                break
            case "back":
                setBackFlip(!backFlip)
                break
            case "right":
                setRightFlip(!rightFlip)
                break
            case "left":
                setLeftFlip(!leftFlip)
                break
            case "top":
                setTopFlip(!topFlip)
                break
            case "bottom":
                setBottomFlip(!bottomFlip)
                break
        }
        setCurrentCards([
            ...currentCards,
            eventCard
        ])
        setCurrentFaces([
            ...currentFaces,
            face
        ])
    }

    useEffect(() => {
        console.log("Score: " + context.score)
        console.log("currentCard: " + currentCards + "// currentCard.length " + currentCards.length)
        console.log("currentFaces " + currentFaces)
        // copy state to be used before next render on reset
        let activeFacesSync = activeFaces
        if (currentCards.length === 2) {
            // If scored
            if (currentCards[0] === currentCards[1]) {
                context.setScore(context.score + 1)
                const temp = activeFaces.filter(item => item !== currentFaces[0])
                activeFacesSync = temp.filter(item => item !== currentFaces[1])
                setActiveFaces(activeFacesSync)
            }
            console.log("ACtive Faces: " + activeFacesSync)
            // reset cards that are not active
            setTimeout(() => {
                if (activeFacesSync.includes("front")) { setFrontFlip(false) }
                if (activeFacesSync.includes("back")) { setBackFlip(false) }
                if (activeFacesSync.includes("left")) { setLeftFlip(false) }
                if (activeFacesSync.includes("right")) { setRightFlip(false) }
                if (activeFacesSync.includes("top")) { setTopFlip(false) }
                if (activeFacesSync.includes("bottom")) { setBottomFlip(false) }
            }, 1200)
            setCurrentCards([])
            setCurrentFaces([])
        }
    }, [currentCards, activeFaces, context, currentFaces])

    return (

        <div className="scene">
            <div className={`cube ${props.face}`}>
                <div className="cube__face cube__face--front">
                    <div className="card__scene">
                        <div className={`card__object ${frontFlip ? "is-flipped" : null}`} >
                            <div className="card__face card__face--front" onClick={handleClick} card={cubeFrancellas[0]} face="front">
                                <img src={logo} alt="cube logo" width="100%" height="100%" card={cubeFrancellas[0]} face="front" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[0]} alt="francella" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--back">
                    <div className="card__scene">
                        <div className={`card__object ${backFlip ? "is-flipped" : null}`}  >
                            <div className="card__face card__face--front" card={cubeFrancellas[1]} face="back" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[1]} face="back" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[1]} alt="francella-2" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--right">
                    <div className="card__scene">
                        <div className={`card__object ${rightFlip ? "is-flipped" : null}`}  >
                            <div className="card__face card__face--front" card={cubeFrancellas[2]} face="right" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[2]} face="right" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[2]} alt="francella-2" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--left">
                    <div className="card__scene">
                        <div className={`card__object ${leftFlip ? "is-flipped" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[3]} face="left" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[3]} face="left" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[3]} alt="francella-1" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--top">
                    <div className="card__scene">
                        <div className={`card__object ${topFlip ? "is-flipped" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[4]} face="top" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[4]} face="top" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[4]} alt="francella-3" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cube__face cube__face--bottom">
                    <div className="card__scene">
                        <div className={`card__object ${bottomFlip ? "is-flipped" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[5]} face="bottom" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[5]} face="bottom" />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[5]} alt="francella-3" width="100%" height="100%" className="francella" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cube