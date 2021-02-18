import React, { useState } from "react"
import AppContext from "./AppContext"
import { useHistory } from "react-router-dom"

const GlobalState = (props) => {

    const [login, setLogin] = useState(localStorage.getItem("login"))
    const [username, setUsername] = useState(localStorage.getItem("username"))
    const [logoutMessage, setLogoutMessage] = useState(false)
    const [registryFeedback, setRegistryFeedback] = useState(false)
    const [score, setScore] = useState(0)
    const history = useHistory()

    const loginUser = () => {
        setLogin(true)
        localStorage.setItem("login", true)
    }
    const logoutUser = () => {
        setLogin(false)
        setLogoutMessage(true)
        registryFeedbackOut()
        localStorage.clear()
        setUsername(null)
        history.push("/")
    }
    const logoutFeedbackIn = () => {
        setLogoutMessage(true)
    }
    const logoutFeedbackOut = () => {
        setLogoutMessage(false)
    }
    const registryFeedbackIn = () => {
        setRegistryFeedback(true)
    }
    const registryFeedbackOut = () => {
        setRegistryFeedback(false)
    }

    return (
        <AppContext.Provider
            value={{
                login: login,
                loginUser: loginUser,
                logoutUser: logoutUser,
                logoutMessage: logoutMessage,
                logoutFeedbackIn: logoutFeedbackIn,
                logoutFeedbackOut: logoutFeedbackOut,
                registryFeedback: registryFeedback,
                registryFeedbackIn: registryFeedbackIn,
                registryFeedbackOut: registryFeedbackOut,
                username: username,
                setUsername: setUsername,
                score: score,
                setScore: setScore
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}

export default GlobalState
