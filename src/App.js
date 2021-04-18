import Footer from "./components/Footer"
import Header from "./components/Header"
import React, { useState, useContext } from "react"
import AppContext from "./context/AppContext"
import Board from "./pages/Board"
import Registro from "./pages/Registro"
import { Route, Switch } from "react-router"
import InitialScreen from "./pages/InitialScreen"
import Final from "./pages/Final"
import "./App.css"

const App = () => {

    const { initialScreenFlag, finalFlag } = useContext(AppContext)

    // Lifted states for user feedback on registration and login
    const [feedbackFlag, setFeedbackFlag] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    return (

        <div className="app__container">
            <Header
                setFeedbackFlag={setFeedbackFlag}
                setFeedbackMessage={setFeedbackMessage}
            />
            <Switch>
                <Route exact path='/'>
                    {
                        initialScreenFlag ?
                            <InitialScreen
                                feedbackFlag={feedbackFlag}
                                setFeedbackFlag={setFeedbackFlag}
                                feedbackMessage={feedbackMessage}
                                setFeedbackMessage={setFeedbackMessage}
                            /> :
                            finalFlag ?
                                <Final
                                    feedbackFlag={feedbackFlag}
                                    setFeedbackFlag={setFeedbackFlag}
                                    feedbackMessage={feedbackMessage}
                                    setFeedbackMessage={setFeedbackMessage}
                                /> :
                                <Board
                                    feedbackFlag={feedbackFlag}
                                    setFeedbackFlag={setFeedbackFlag}
                                    feedbackMessage={feedbackMessage}
                                    setFeedbackMessage={setFeedbackMessage}
                                />
                    }
                </Route>
                <Route exact path='/registro'>
                    <Registro
                        setFeedbackFlag={setFeedbackFlag}
                        setFeedbackMessage={setFeedbackMessage}
                    />
                </Route>
            </Switch>
            <Footer />
        </div>
    )
}

export default App
