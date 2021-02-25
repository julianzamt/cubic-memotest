import "./Tries.css"

const Tries = (props) => {

    console.log("I render")
    return (
        <div className="tries__container">
            <div>
                <div className="tries__text">Tries</div>
                <div className="tries__number" key={props.tries} >{props.tries}</div>
            </div>
        </div>
    )
}

export default Tries