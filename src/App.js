import Footer from "./components/Footer"
import Header from "./components/Header"
import React, { useState, useContext } from "react"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import Registro from "./pages/Registro"
import { Route, Switch } from "react-router"
import AppContext from "./context/AppContext"
import Final from "./pages/Final"
import "./App.css"

const App = () => {
    // Lifted states for user feedback on registration and login
    const [feedbackFlag, setFeedbackFlag] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState(null)
    const [winFlag, setWinFlag] = useState(false)
    const [finalFlag, setFinalFlag] = useState(false)

    const context = useContext(AppContext)

    return (
        <GlobalState>
            <div className="app__container">
                <Header
                    setFeedbackFlag={setFeedbackFlag}
                    setFeedbackMessage={setFeedbackMessage}
                />
                <Switch>
                    <Route exact path='/'>
                        {/* {finalFlag ?
                            <Final
                                winFlag={winFlag}
                            /> : */}
                        <Board
                            feedbackFlag={feedbackFlag}
                            setFeedbackFlag={setFeedbackFlag}
                            feedbackMessage={feedbackMessage}
                            setFeedbackMessage={setFeedbackMessage}
                            setFinalFlag={setFinalFlag}
                            setWinFlag={setWinFlag}
                        />
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
        </GlobalState>
    )
}

export default App
