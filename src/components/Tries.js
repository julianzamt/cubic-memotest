import "./Tries.css"

const Tries = (props) => {

    return (
        <div className={props.winFlag ? "tries__container tries__hidden" : "tries__container"}>
            <div className="tries__text">Tries left</div>
            <div>
                <div className="tries__number" key={props.tries}>{props.tries}</div>
            </div>
        </div>
    )
}

export default Tries