import React, { useState, useEffect, useContext, useRef } from "react"
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

    // Manage internal win logic
    const [internalScore, setInternalScore] = useState(0)

    // Prevent more than 2 cards being picked simultaneously
    const [lockCards, setLockCards] = useState(false)

    const handleClick = (e) => {
        const eventCard = e.target.getAttribute("card")
        const face = e.target.getAttribute("face")
        switch (face) {
            case "front":
                setFrontFlip(true)
                break
            case "back":
                setBackFlip(true)
                break
            case "right":
                setRightFlip(true)
                break
            case "left":
                setLeftFlip(true)
                break
            case "top":
                setTopFlip(true)
                break
            case "bottom":
                setBottomFlip(true)
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
        // copy states to use them before next render
        let activeFacesSync = activeFaces
        let tries = props.tries
        let internalScoreSync = internalScore
        if (currentCards.length === 2) {
            tries = tries - 1
            props.setTries(tries)
            setLockCards(true)

            // If scored
            if (currentCards[0] === currentCards[1]) {
                // Game Scores
                context.setScore(prevState => prevState + 1)
                // Internal Score
                internalScoreSync = internalScoreSync + 1
                setInternalScore(internalScoreSync)
                // Filter winner faces from actives
                const temp = activeFaces.filter(item => item !== currentFaces[0])
                activeFacesSync = temp.filter(item => item !== currentFaces[1])
                setActiveFaces(activeFacesSync)

                if (internalScoreSync === 3) {
                    setTimeout(() => {
                        props.setWinFlag(true)
                        props.setFinalFlag(true)
                    }, 1500)
                }
            }
            else if (tries === 0) {
                setTimeout(() => { props.setFinalFlag(true) }, 1500)
            }

            // reset active cards
            setTimeout(() => {
                if (activeFacesSync.includes("front")) { setFrontFlip(false) }
                if (activeFacesSync.includes("back")) { setBackFlip(false) }
                if (activeFacesSync.includes("left")) { setLeftFlip(false) }
                if (activeFacesSync.includes("right")) { setRightFlip(false) }
                if (activeFacesSync.includes("top")) { setTopFlip(false) }
                if (activeFacesSync.includes("bottom")) { setBottomFlip(false) }
                setLockCards(false)
            }, 800)
            setCurrentCards([])
            setCurrentFaces([])
        }
    }, [currentCards, activeFaces, context, currentFaces])

    /* Rotate on drag*/

    // Cube drag states
    const [drag, setDrag] = useState(false)
    const [x0, setX0] = useState(null)
    const [y0, setY0] = useState(null)
    const A = .2;

    const _C = useRef(null)

    /* helper function to handle both mouse and touch */
    function getE(ev) { return ev.touches ? ev.touches[0] : ev };

    function lock(ev) {
        let e = getE(ev);

        setDrag(true)
        setX0(e.clientX)
        setY0(e.clientY)
    };

    function rotate(ev) {
        if (drag) {
            let e = getE(ev),
                x = e.clientX, y = e.clientY,
                dx = x - x0, dy = y - y0,
                d = Math.hypot(dx, dy);

            if (d) {
                _C.current.style.setProperty('--p', getComputedStyle(_C.current).transform.replace('none', ''));
                _C.current.style.setProperty('--a', `${+(A * d).toFixed(2)}deg`);
                _C.current.style.setProperty('--i', (-dy).toFixed(2));
                _C.current.style.setProperty('--j', +(dx).toFixed(2));

                setX0(x)
                setY0(y)
            }
        }
    };

    function release(ev) {
        if (drag) {
            setDrag(false)
            setX0(null)
            setY0(null)
        }
    };

    useEffect(() => {
        console.log(_C)
    }, [])

    return (
        <div className="scene"
            onMouseDown={lock}
            onMouseMove={rotate}
            onMouseUp={release}
            onTouchStart={lock}
            onTouchMove={rotate}
            onTouchEnd={release}
        >
            <div className="cube" ref={_C}>
                <div className="cube__face cube__face--front">
                    <div className="card__scene">
                        <div className={`card__object ${frontFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
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
                        <div className={`card__object ${backFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
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
                        <div className={`card__object ${rightFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
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
                        <div className={`card__object ${leftFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
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
                        <div className={`card__object ${topFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
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
                        <div className={`card__object ${bottomFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
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