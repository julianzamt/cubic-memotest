import "./Tries.css"

const Tries = (props) => {
    return (
        <div className="tries">
            <div>Tries</div>
            <div>{props.tries}</div>
        </div>
    )
}

export default Tries