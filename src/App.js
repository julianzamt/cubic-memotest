import Footer from "./components/Footer"
import Header from "./components/Header"
import React, { useState } from "react"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import Registro from "./pages/Registro"
import { Route, Switch } from "react-router"
import "./App.css"

const App = () => {
    // Lifted states for user feedback on registration and login
    const [registryFeedback, setRegistryFeedback] = useState(false)
    const [loginErrorFeedback, setLoginErrorFeedback] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)

    return (
        <GlobalState>
            <div className="app__container">
                <Header
                    setRegistryFeedback={setRegistryFeedback}
                    setLoginErrorFeedback={setLoginErrorFeedback}
                    setShowFeedback={setShowFeedback}
                />
                <Switch>
                    <Route exact path='/'>
                        <Board
                            registryFeedback={registryFeedback}
                            loginErrorFeedback={loginErrorFeedback}
                            showFeedback={showFeedback}
                            setShowFeedback={setShowFeedback}
                        />
                    </Route>
                    <Route exact path='/registro'>
                        <Registro
                            registryFeedback={registryFeedback}
                            setRegistryFeedback={setRegistryFeedback}
                            setShowFeedback={setShowFeedback}
                        />
                    </Route>
                </Switch>
                <Footer />
            </div>
        </GlobalState>
    )
}

export default App
