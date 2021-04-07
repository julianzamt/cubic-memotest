import React, { useState, useEffect, useContext, useRef } from "react"
import AppContext from "../context/AppContext"
import logo from "../img/cube-outline.svg"
import "./Cube.css"
import { sortTetraCards } from "../helpers/randomFrancellas"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"

const Tetrahedron = () => {

    /* Rotate on drag*/

    // Cube drag states
    const [drag, setDrag] = useState(false)
    const [x0, setX0] = useState(null)
    const [y0, setY0] = useState(null)
    // this constant handles the velocity of rotation
    const A = .45;

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
            <div className={winAnimationFlag ? "tetra win__animation" : "tetra"} ref={_C}>
                <div className={looseAnimationFlag ? "tetra__face tetra__face--one loose__animation" : "tetra__face tetra__face--one"}>
                    <div className="card__scene">
                        <div className={`card__object ${frontFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" onClick={handleClick} card={tetraCards[0]} face="one">
                                <img src={logo} alt="logo" width="100%" height="100%" card={tetraCards[0]} face="one" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={tetraCards[0]} alt="card" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "tetra__face tetra__face--two loose__animation" : "tetra__face tetra__face--two"}>
                    <div className="card__scene">
                        <div className={`card__object ${backFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
                            <div className="card__face card__face--front" card={tetraCards[1]} face="two" onClick={handleClick}>
                                <img src={logo} alt="logo" width="100%" height="100%" card={tetraCards[1]} face="two" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={tetraCards[1]} alt="card-2" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "tetra__face tetra__face--three loose__animation" : "tetra__face tetra__face--three"}>
                    <div className="card__scene">
                        <div className={`card__object ${rightFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`}  >
                            <div className="card__face card__face--front" card={tetraCards[2]} face="three" onClick={handleClick}>
                                <img src={logo} alt="logo" width="100%" height="100%" card={tetraCards[2]} face="three" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={tetraCards[2]} alt="card-3" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={looseAnimationFlag ? "tetra__face tetra__face--four loose__animation" : "tetra__face tetra__face--four"}>
                    <div className="card__scene">
                        <div className={`card__object ${leftFlip ? "is-flipped" : null} ${lockCards ? "lockCards" : null}`} >
                            <div className="card__face card__face--front" card={tetraCards[3]} face="four" onClick={handleClick}>
                                <img src={logo} alt="logo" width="100%" height="100%" card={tetraCards[3]} face="four" onDragStart={(e) => { e.preventDefault() }} />
                            </div>
                            <div className="card__face card__face--back">
                                <img src={tetraCards[3]} alt="card-4" width="100%" height="100%" className="card" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Teatrahedron