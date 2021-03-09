import React, { useState, useContext } from "react"
import AppContext from "../context/AppContext"
import firebase from "../config/firebase"
import { useSpring, animated as a, config } from 'react-spring'
import "./Focus.css"

const Focus = () => {
    const context = useContext(AppContext)
    const [focus, setFocus] = useState(true)
    setTimeout(() => setFocus(false), 2000)

    const rankingRef = firebase.db.collection("Ranking").orderBy("score", "desc").limit(10)

    rankingRef.get()
        .then(querySnapshot => {
            const highscore = querySnapshot.docs.map(item => item.data())
            context.setHighscore(highscore[0]["score"])
        })

    const standUp = useSpring({
        from: { transform: 'rotateY(-90deg)' },
        to: {
            transform: focus ? 'rotateY(-90deg)' : 'rotateY(0deg)'
        },
        config: { mass: 3, tension: 180, friction: 12 }
    })

    return (
        <div className="focus__container">
            {focus ? <div className="focus">Focus</div> : <a.div className="go" style={standUp}>GO!</a.div>}
        </div>

    )
}

export default Focus