import Footer from "./components/Footer"
import Header from "./components/Header"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import Registro from "./pages/Registro"
import { Route, Switch } from "react-router"
import "./App.css"

const App = () => {
    return (
        <GlobalState>
            <div className="app__container">
                <Header />
                <Switch>
                    <Route exact path='/' component={Board} />
                    <Route exact path='/registro' component={Registro} />
                </Switch>
                <Footer />
            </div>
        </GlobalState>
    )
}

export default App
