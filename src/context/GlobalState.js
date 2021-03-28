import React, { useState } from "react"
import AppContext from "./AppContext"
import { useHistory } from "react-router-dom"

const GlobalState = (props) => {

    const [login, setLogin] = useState(localStorage.getItem("login"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(1)
    const [highscore, setHighscore] = useState(null)
    const [init, setInit] = useState(true)
    const [ranking, setRanking] = useState([])
    const history = useHistory()

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

    const initialize = () => {
        setScore(0)
        setLevel(1)
        history.push("/")
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
                init: init,
                setInit: setInit,
                highscore: highscore,
                setHighscore: setHighscore,
                ranking: ranking,
                setRanking: setRanking,
                initialize: initialize
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default GlobalState
