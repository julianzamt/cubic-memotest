import React, { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import "./Bonus.css"
import { useSpring, animated as a, config } from "react-spring"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"

const Bonus = (props) => {

    const context = useContext(AppContext)

    const rankingRef = firebase.db.collection("Ranking")

    const triesLeftPoints = props.tries * 500
    const timeLeftPoints = props.time * 100

    const totalBonusPoints = props.levelClearPoints + triesLeftPoints + timeLeftPoints

    useEffect(() => {
        context.setScore(context.score + totalBonusPoints)
        if (context.login) {
            console.log("bonus logged")
            rankingRef.add({
                username: context.username,
                score: (context.score + totalBonusPoints)
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
    }, [])

    const handleClick = () => {
        props.setFinalFlag(true)
        context.setInit(false)
    }

    const fadeIn = useSpring({
        to: { opacity: 1 },
        from: { opacity: 0 },
    })

    return (
        <a.div className="bonus__container" style={fadeIn}>
            <h3 className="bonus__title">Stage {context.level} Cleared!</h3>
            <div className="bonus__points">
                <div>Level completed</div> <div className="points">{props.levelClearPoints} pts</div>
                <div>{props.tries} tries left</div> <div className="points">{triesLeftPoints} pts</div>
                <div>{props.time} seconds left</div> <div className="points">{timeLeftPoints} pts</div>
                <hr className="horizontal-line" /> <hr className="horizontal-line" />
                <div>Bonus</div> <div className="points">{totalBonusPoints} pts</div>
                <div>Score</div> <div className="points">{context.score} pts</div>
            </div>
            <button className="bonus__button" onClick={handleClick}>Continue</button>
        </a.div>
    )
}

export default Bonus