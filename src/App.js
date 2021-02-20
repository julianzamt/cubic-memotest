import Footer from "./components/Footer"
import Header from "./components/Header"
import React, { useState, useEffect } from "react"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import Registro from "./pages/Registro"
import { Route, Switch } from "react-router"
import "./App.css"

const App = () => {
    // Lifted states for user feedback on registration and login
    const [feedbackFlag, setFeedbackFlag] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState(null)

    useEffect(() => {

    }, [feedbackFlag])

    return (
        <GlobalState>
            <div className="app__container">
                <Header
                    setFeedbackFlag={setFeedbackFlag}
                    setFeedbackMessage={setFeedbackMessage}
                />
                <Switch>
                    <Route exact path='/'>
                        <Board
                            feedbackFlag={feedbackFlag}
                            setFeedbackFlag={setFeedbackFlag}
                            feedbackMessage={feedbackMessage}
                            setFeedbackMessage={setFeedbackMessage}
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
