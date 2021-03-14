import React, { useContext } from "react"
import "./Scores.css"
import AppContext from "../context/AppContext"
// import firebase from "../config/firebase"

const Scores = () => {
    const context = useContext(AppContext)

    // let rankingRef = firebase.db.collection("Ranking").orderBy("score", "desc").limit(1)

    // const [highScore, setHighScore] = useState(null)

    // useEffect(() => {
    //     rankingRef.get()
    //         .then(querySnapshot => {
    //             const highscore = querySnapshot.docs.map(item => item.data())
    //             console.log(highscore)
    //             setHighScore(highscore[0]["score"])
    //         })
    // }, [])

    return (
        <div className="scores__container">
            <div>Score {context.score}</div>
            <div>Highscore {context.highscore}</div>
        </div>
    )
}

export default Scores