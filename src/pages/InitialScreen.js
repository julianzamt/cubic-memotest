import LittleCube from "../components/LittleCube"
import "./InitialScreen.css"
import Feedback from "../components/Feedback";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from "react"

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Instructions</DialogTitle>
        </Dialog>
    );
}

const InitialScreen = (props) => {
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    function handleClick(e) {
        const name = e.target.name
        if (name) {
            //open modal
        }
        else {
            props.setInitialScreenFlag(false)
            props.setFinalFlag(false)
        }
    }

    return (
        <div className="initialScreen__container">
            <div style={{ textAlign: "center" }}>
                <h4 className="welcome__h4">Welcome to</h4>
                <h1 className="welcome__h1">Cubic Memotest</h1>
            </div>
            <LittleCube />
            <div className="initialButton__container">
                <button className="start__button" onClick={handleClick}>Start</button>
                <button className="instructions__button" name="instructions" onClick={handleClickOpen}>Instructions</button>
            </div>
            <SimpleDialog open={open} onClose={handleClose} />
            {props.feedbackFlag ? <Feedback setFeedbackFlag={props.setFeedbackFlag} feedbackMessage={props.feedbackMessage} setFeedbackMessage={props.setFeedbackMessage} feedbackFlag={props.feedbackFlag} /> : null}
        </div>
    )
}

export default InitialScreen