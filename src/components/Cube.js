import React, { useState, useEffect, useContext, useRef } from "react"
import AppContext from "../context/AppContext"
import logo from "../img/cube-outline.svg"
import "./Cube.css"
import { sortCubeCards } from "../helpers/randomFrancellas"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"

const Cube = (props) => {
    const context = useContext(AppContext)

    const { tries, setTries, setFinalFlag, setWinFlag, looseAnimationFlag, setLooseAnimationFlag, winAnimationFlag, setWinAnimationFlag, lockCards, setStopTimeFlag, stopTimeFlag, setLockCards } = props

    const rankingRef = firebase.db.collection("Ranking")

    // Sort cards on game start with helper
    const [cubeFrancellas] = useState(sortCubeCards())

    // Each card flip state
    const [frontFlip, setFrontFlip] = useState(false)
    const [backFlip, setBackFlip] = useState(false)
    const [leftFlip, setLeftFlip] = useState(false)
    const [rightFlip, setRightFlip] = useState(false)
    const [topFlip, setTopFlip] = useState(false)
    const [bottomFlip, setBottomFlip] = useState(false)

    // Game logic 
    const [currentCards, setCurrentCards] = useState([])
    const [currentFaces, setCurrentFaces] = useState([])
    const [activeFaces, setActiveFaces] = useState(["front", "back", "right", "left", "top", "bottom"])

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
            default:
                console.log("An error ocurred selecting the card")
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
        if (currentCards.length === 2) {
            // copy states to use them before next render
            console.log("cube current cards 2")
            let activeFacesSync = activeFaces
            let score = context.score
            setTries(prevState => prevState - 1)
            setLockCards(true)

            // If scores
            if (currentCards[0] === currentCards[1]) {
                context.setScore(context.score + 100)
                score = score + 100
                // Filter faces from actives
                activeFacesSync = activeFaces.filter(item => !currentFaces.includes(item))
                setActiveFaces(activeFacesSync)
                // Win the game!
                if (!activeFacesSync.length) {
                    setWinAnimationFlag(true)
                    setStopTimeFlag(true)
                    setTimeout(() => {
                        setWinFlag(true)
                    }, 2000)
                }
            }
            // Loose
            if (tries < 0) {
                setLooseAnimationFlag(true)
                setStopTimeFlag(true)
                // Add score and get rankings
                if (context.login) {
                    console.log("cube Loose")
                    rankingRef.add({
                        username: context.username,
                        score: score
                    })
                        .then(rankingRef.orderBy("score", "desc").limit(10).get()
                            .then((querySnapshot) => {
                                const ranking = querySnapshot.docs.map((item, index) =>
                                    <HighScore
                                        key={item.id}
                                        index={index + 1}
                                        username={item.data().username}
                                        score={item.data().score}
                                    />
                                )
                                context.setRanking(ranking)
                            }))
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    rankingRef.orderBy("score", "desc").limit(10).get()
                        .then((querySnapshot) => {
                            const ranking = querySnapshot.docs.map((item, index) =>
                                <HighScore
                                    key={item.id}
                                    index={index + 1}
                                    username={item.data().username}
                                    score={item.data().score}
                                />
                            )
                            context.setRanking(ranking)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                setTimeout(() => {
                    setFinalFlag(true)
                }, 3000)
            }

            // reset active cards if game isn't over
            if (tries > 0 && activeFaces.length) {
                console.log("activeFaces: " + activeFacesSync)
                setTimeout(() => {
                    if (activeFacesSync.includes("front")) { setFrontFlip(false) }
                    if (activeFacesSync.includes("back")) { setBackFlip(false) }
                    if (activeFacesSync.includes("left")) { setLeftFlip(false) }
                    if (activeFacesSync.includes("right")) { setRightFlip(false) }
                    if (activeFacesSync.includes("top")) { setTopFlip(false) }
                    if (activeFacesSync.includes("bottom")) { setBottomFlip(false) }
                    setLockCards(false)
                }, 600)
                setCurrentCards([])
                setCurrentFaces([])
            }
        }
    }, [currentCards, activeFaces, currentFaces])

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

    return (
        <div className="scene"
            onMouseDown={lock}
            onMouseMove={rotate}
            onMouseUp={release}
            onTouchStart={lock}
            onTouchMove={rotate}
            onTouchEnd={release}
        >
            <div className={winAnimationFlag ? "cube win__animation" : "cube"} ref={_C}>
                <div className={looseAnimationFlag ? "cube__face cube__face--front loose__animation" : "cube__face cube__face--front"}>
                    <div className="card__scene">
                        <div className={`card__object ${frontFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" onClick={handleClick} card={cubeFrancellas[0]} face="front">
                                <img src={logo} alt="cube logo" width="100%" height="100%" card={cubeFrancellas[0]} face="front" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[0]} alt="card" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "cube__face cube__face--back loose__animation" : "cube__face cube__face--back"}>
                    <div className="card__scene">
                        <div className={`card__object ${backFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
                            <div className="card__face card__face--front" card={cubeFrancellas[1]} face="back" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[1]} face="back" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[1]} alt="card-2" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "cube__face cube__face--right loose__animation" : "cube__face cube__face--right"}>
                    <div className="card__scene">
                        <div className={`card__object ${rightFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
                            <div className="card__face card__face--front" card={cubeFrancellas[2]} face="right" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[2]} face="right" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[2]} alt="card-3" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "cube__face cube__face--left loose__animation" : "cube__face cube__face--left"}>
                    <div className="card__scene">
                        <div className={`card__object ${leftFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[3]} face="left" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[3]} face="left" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[3]} alt="card-4" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "cube__face cube__face--top loose__animation" : "cube__face cube__face--top"}>
                    <div className="card__scene">
                        <div className={`card__object ${topFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[4]} face="top" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[4]} face="top" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[4]} alt="card-5" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "cube__face cube__face--bottom loose__animation" : "cube__face cube__face--bottom"}>
                    <div className="card__scene">
                        <div className={`card__object ${bottomFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" card={cubeFrancellas[5]} face="bottom" onClick={handleClick}>
                                <img src={logo} alt="" width="100%" height="100%" card={cubeFrancellas[5]} face="bottom" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={cubeFrancellas[5]} alt="card-6" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cube