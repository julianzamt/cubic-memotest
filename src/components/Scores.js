import React, { useContext, useEffect, useState } from "react"
import "./Scores.css"
import AppContext from "../context/AppContext"
import firebase from "../config/firebase"
import CircularProgress from '@material-ui/core/CircularProgress';

const Scores = () => {
    const context = useContext(AppContext)

    let rankingRef = firebase.db.collection("Ranking").orderBy("score", "desc").limit(1)

    const [highScore, setHighScore] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        rankingRef.get()
            .then(querySnapshot => {
                const highscore = querySnapshot.docs.map(item => item.data())
                console.log(highscore)
                setHighScore(highscore[0]["score"])
                setIsLoading(false)
            })
    }, [])

    return (
        <div className="scores__container">
            <div>Score {context.score}</div>
            {isLoading ? <div>Highscore <CircularProgress size="1em" /> </div> :
                <div>Highscore {highScore}</div>}
        </div>
    )
}

export default Scores