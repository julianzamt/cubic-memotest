import React, { useState, useContext } from "react"
import "./Board.css"
import Cube from "../components/Cube"
import AppContext from "../context/AppContext"
import Alert from 'react-bootstrap/Alert'
import { CSSTransition } from "react-transition-group"

const Board = () => {

    const context = useContext(AppContext)

    return (
        <div className="board__container">
            {context.registryFeedback ? <Alert variant="success" className="alert" dismissible transition="true" onClose={context.registryFeedbackOut}>User registered and logged in</Alert> : null}
            <Cube />
            {
                !context.login &&
                <div className="guest-advice">
                    Currently playing as <b>Guest</b>. Login for track your scores.
                </div>
            }
        </div>
    )
}

export default Board

/*For buttons variation */

/*import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';*/

/* const [value, setValue] = useState('front');

    const handleChange = (event) => {
        setValue(event.target.value);
    }; */

/* <FormControl component="fieldset">
    <RadioGroup aria-label="cube-face" name="cube-face" value={value} onChange={handleChange} row>
        <FormControlLabel value="show-front" control={<Radio />} label="Front" />
        <FormControlLabel value="show-back" control={<Radio />} label="Back" />
        <FormControlLabel value="show-left" control={<Radio />} label="Left" />
        <FormControlLabel value="show-right" control={<Radio />} label="Right" />
        <FormControlLabel value="show-top" control={<Radio />} label="Top" />
        <FormControlLabel value="show-bottom" control={<Radio />} label="Bottom" />
    </RadioGroup>
</FormControl> */