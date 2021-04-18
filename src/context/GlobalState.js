import React, { useState } from "react"
import AppContext from "./AppContext"
import { useHistory } from "react-router-dom"
import firebase from "../config/firebase"
import HighScore from "../components/HighScore"

const GlobalState = (props) => {

    const [login, setLogin] = useState(localStorage.getItem("login"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [highscore, setHighscore] = useState(null)
    const [ranking, setRanking] = useState([])
    const [bonusFlag, setBonusFlag] = useState(false)
    const [finalFlag, setFinalFlag] = useState(false)
    const [initialScreenFlag, setInitialScreenFlag] = useState(true)
    // Final animations
    const [winAnimationFlag, setWinAnimationFlag] = useState(false)
    const [loseAnimationFlag, setLoseAnimationFlag] = useState(false)
    // Prevent more than 2 cards being picked simultaneously
    const [lockCards, setLockCards] = useState(false)
    // Stop time
    const [stopTimeFlag, setStopTimeFlag] = useState(false)

    const history = useHistory()

    const rankingRef = firebase.db.collection("Ranking")

    const loginUser = () => {
        setLogin(true)
        localStorage.setItem("login", true)
    }
    const logoutUser = () => {
        localStorage.clear()
        setLogin(false)
        setUsername(null)
        history.push("/")
    }

    const startGame = () => {
        setScore(0);
        setLevel(1);
        setInitialScreenFlag(false);
        setFinalFlag(false);
        setBonusFlag(false);
        setWinAnimationFlag(false);
        setLoseAnimationFlag(false)
        setStopTimeFlag(false);
        setLockCards(false);
    }

    const endGame = (result) => {

        if (result === "win") {
            setWinAnimationFlag(true);
            setLockCards(true);
            setStopTimeFlag(true);
            setTimeout(() => { setBonusFlag(true) }, 2000)
        }

        else if (result === "lose") {
            setLockCards(true)
            setLoseAnimationFlag(true)
            setStopTimeFlag(true)
            // Add score and get rankings
            if (login) {
                rankingRef.add({
                    username: username,
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
                            setRanking(ranking)
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
                        setRanking(ranking)
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
            setTimeout(() => {
                setFinalFlag(true)
            }, 3000)
        }
    }

    const exitGame = () => {
        setFinalFlag(false)
        setBonusFlag(false)
        setScore(0)
        setInitialScreenFlag(true)
    }

    return (
        <AppContext.Provider
            value={{
                login: login,
                loginUser: loginUser,
                logoutUser: logoutUser,
                username: username,
                setUsername: setUsername,
                score: score,
                setScore: setScore,
                level: level,
                setLevel: setLevel,
                highscore: highscore,
                setHighscore: setHighscore,
                ranking: ranking,
                setRanking: setRanking,
                startGame: startGame,
                endGame: endGame,
                exitGame: exitGame,
                bonusFlag: bonusFlag,
                finalFlag: finalFlag,
                setFinalFlag: setFinalFlag,
                initialScreenFlag: initialScreenFlag,
                winAnimationFlag: winAnimationFlag,
                loseAnimationFlag: loseAnimationFlag,
                lockCards: lockCards,
                setLockCards: setLockCards,
                stopTimeFlag: stopTimeFlag
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default GlobalState
