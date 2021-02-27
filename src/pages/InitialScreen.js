import LittleCube from "../components/LittleCube"
import "./InitialScreen.css"

const InitialScreen = (props) => {
    return (
        <div className="initialScreen__container">
            <div>
                <h4 style={{ textAlign: "center" }}>Welcome to</h4>
                <h1>Cubic Memotest</h1>
            </div>
            <LittleCube />
            <button className="start__button" onClick={() => { props.setInitialScreenFlag(false); console.log(props.initialScreen) }}>Click to start</button>
        </div>
    )
}

export default InitialScreen