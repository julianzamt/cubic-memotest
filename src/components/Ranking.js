import React, { useState, useEffect, useContext } from "react"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"
import { addScoreToRanking } from "../services/Ranking_service"
import AppContext from "../context/AppContext"
import "./Ranking.css"

const Ranking = () => {

    const context = useContext(AppContext)

    const [ranking, setRanking] = useState(null)

    useEffect(() => {
        addScoreToRanking(context.score, context.username)

        let rankingRef = firebase.db.collection("Ranking").orderBy("score", "desc").limit(10)

        rankingRef.get()
            .then((querySnapshot) => {
                const highScores = querySnapshot.docs.map((item, index) =>
                    <HighScore
                        key={item.id}
                        index={index + 1}
                        username={item.data().username}
                        score={item.data().score}
                    />
                )
                setRanking(highScores)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, [])

    return (
        <div className="ranking__container">
            <div className="ranking__text">Highscores</div>
            {ranking}
        </div>
    )
}

export default Ranking