import "./Tries.css"

const Tries = (props) => {
    return (
        <div className="tries__container">
            <div>
                <div className="tries__text">Tries</div>
                <div className="tries__number">{props.tries}</div>
            </div>
        </div>
    )
}

export default Tries