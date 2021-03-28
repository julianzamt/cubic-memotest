import React, { useState } from "react"
import Dialog from '@material-ui/core/Dialog';
import Pagination from '@material-ui/lab/Pagination';
import instructions_1 from "../img/instructions/instructions_1.png"
import instructions_2 from "../img/instructions/instructions_2.png"
import instructions_3 from "../img/instructions/instructions_3.png"
import instructions_4 from "../img/instructions/instructions_4.png"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CloseIcon from '@material-ui/icons/Close';
import "./InstructionsModal.css"

function InstructionsModal(props) {
    const { onClose, open } = props;
    const [page, setPage] = useState(1)

    const handleClose = () => {
        onClose();
    };

    const handleChange = (event, value) => {
        const id = event.target.id
        if (value) setPage(value);
        else if (id === "next") setPage(2);
        else setPage(1);
    };
    return (
        <Dialog onClose={handleClose} aria-labelledby="instructions" open={open}>
            <div style={{ position: "relative", height: 0, width: "100%" }}>
                <CloseIcon className="closeButton" onClick={handleClose} />
            </div>
            <div className="instructions__container">
                {page === 1 ?
                    <div className="page__container">

                        <NavigateNextIcon className="nextButton" id="next" onClick={handleChange} />

                        <img src={instructions_1} alt="instructions_1" className="instructionsImg" onDragStart={(e) => { e.preventDefault() }} />
                        <div className="instructions__text">Drag the object</div>
                        <img src={instructions_2} alt="instructions_2" className="instructionsImg" onDragStart={(e) => { e.preventDefault() }} />
                        <div className="instructions__text">Tap or click cards to reveal images</div>
                        <img src={instructions_3} alt="instructions_3" className="instructionsImg" onDragStart={(e) => { e.preventDefault() }} />
                        <div className="instructions__text">Found matching pairs. <br></br>If so, images remain visible. If don´t, they hide again.</div>
                    </div>
                    :
                    <div className="page__container">
                        <NavigateBeforeIcon className="prevButton" id="previous" onClick={handleChange} />
                        <div style={{ textAlign: "center" }}>
                            <div className="timeTries">Time / Tries</div>
                            <div className="instructions__text">But stay focused, and be fast! You have limited resources.</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <img src={instructions_4} alt="instructions_4" className="instructionsImg" onDragStart={(e) => { e.preventDefault() }} />
                            <div className="instructions__text">Found all matches, and win.<br></br>Prepare yourself for the next level. <br></br><span style={{ fontSize: "smaller", color: "gray" }}>(Demo: 1 level only)</span></div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div className="highscores__instructions">Highscores</div>
                            <div className="instructions__text">Create an account and track your scores. <br></br>Beat´em all. Have fun!</div>
                        </div>
                    </div>
                }
                <Pagination count={2} page={page} onChange={handleChange} className="pagination" hidePrevButton hideNextButton />
            </div>

        </Dialog>
    )
}

export default InstructionsModal