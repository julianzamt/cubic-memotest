import React, { useEffect, useState, useContext } from "react"
import AppContext from "../context/AppContext"
import "./Timer.css"
import HighScore from "../components/HighScore"
import firebase from "../config/firebase"

const Timer = (props) => {

    const context = useContext(AppContext)

    const rankingRef = firebase.db.collection("Ranking")

    const { setFinalFlag, time, setTime, stopTimeFlag, setStopTimeFlag, setLooseAnimationFlag, setLockCards, winFlag } = props

    const [beat, setBeat] = useState(false)
    let timeUp = false

    useEffect(() => {
        let timeout = null
        if (!stopTimeFlag) {
            if (time >= 0) {
                timeout = setTimeout(() => setTime(prevState => prevState - 1), 1000)
            }
            time === 5 && setBeat(true)
        }
        else if (time < 0) {
            // Add score and get rankings
            if (context.login) {
                console.log("timer Loose logged")
                rankingRef.add({
                    username: context.username,
                    score: context.score
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
        }
        // if win, during Bonus
        else { setBeat(false) }

        return () => clearTimeout(timeout)

    }, [time, setTime, stopTimeFlag]);

    if (time < 0) {
        timeUp = true
        setLockCards(true)
        setLooseAnimationFlag(true)
        setStopTimeFlag(true)
        setTimeout(() => {
            setFinalFlag(true)
        }, 3000)
    }

    return (
        <div className={winFlag ? "timer__container timer__hidden" : "timer__container"} >
            <div className="timer__text">Time</div>
            {timeUp ? <div className="timeup">Time´s up!</div> :
                <div className={beat ? "time beat" : "time"}>{time}</div>
            }
        </div>
    )
}

export default Timer




