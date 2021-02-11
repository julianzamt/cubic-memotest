import Footer from "./components/Footer"
import Header from "./components/Header"
import Routes from "./pages/Routes"
import Board from "./pages/Board"
import GlobalState from "./context/GlobalState"
import "./App.css"

const App = () => {
    return (
        <GlobalState>
            <div className="app__container">
                <Header />
                <Board />
                <Footer />
            </div>
        </GlobalState>
    )
}

export default App
