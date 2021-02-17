import React, { useState } from "react"
import "./Board.css"
import Cube from "../components/Cube"
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const Board = () => {
    const [value, setValue] = useState('front');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className="board__container">
            <Cube face={value} />
        </div>
    )
}

export default Board

/*For buttons variation */
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