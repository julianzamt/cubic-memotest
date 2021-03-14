import Footer from "./components/Footer"
import Header from "./components/Header"
import React, { useState } from "react"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import Registro from "./pages/Registro"
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from "react-router"
import InitialScreen from "./pages/InitialScreen"
import Final from "./pages/Final"
import "./App.css"
import "inobounce"

const App = () => {

    // Lifted states for user feedback on registration and login
    const [feedbackFlag, setFeedbackFlag] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState(null)
    const [winFlag, setWinFlag] = useState(false)
    const [finalFlag, setFinalFlag] = useState(false)
    const [initialScreenFlag, setInitialScreenFlag] = useState(true)

    return (
        <BrowserRouter>
            <GlobalState>
                <div className="app__container">
                    <Header
                        setFeedbackFlag={setFeedbackFlag}
                        setFeedbackMessage={setFeedbackMessage}
                        initialScreenFlag={initialScreenFlag}
                    />
                    <Switch>
                        <Route exact path='/'>
                            {
                                initialScreenFlag ?
                                    <InitialScreen
                                        setInitialScreenFlag={setInitialScreenFlag}
                                        feedbackFlag={feedbackFlag}
                                        setFeedbackFlag={setFeedbackFlag}
                                        feedbackMessage={feedbackMessage}
                                        setFeedbackMessage={setFeedbackMessage}
                                        setFinalFlag={setFinalFlag}
                                    /> :
                                    finalFlag ?
                                        <Final
                                            winFlag={winFlag}
                                            setWinFlag={setWinFlag}
                                            setFinalFlag={setFinalFlag}
                                            setInitialScreenFlag={setInitialScreenFlag}
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
                                            setFinalFlag={setFinalFlag}
                                            setWinFlag={setWinFlag}
                                            winFlag={winFlag}
                                        />
                            }
                        </Route>
                        <Route exact path='/registro'>
                            <Registro
                                setFeedbackFlag={setFeedbackFlag}
                                setFeedbackMessage={setFeedbackMessage}
                                initialScreenFlag={initialScreenFlag}
                                setInitialScreenFlag={setInitialScreenFlag}
                            />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </GlobalState>
        </BrowserRouter>
    )
}

export default App
