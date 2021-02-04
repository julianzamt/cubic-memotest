import Footer from "./components/Footer"
import Header from "./components/Header"
import Routes from "./pages/Routes"
import Board from "./pages/Board"
import "./App.css"

const App = () => {
    return (
        <div className="app__container">
            <Header />
            <Board />
            <Footer />
        </div>
    )
}

export default App
