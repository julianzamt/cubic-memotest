import React, { useState } from "react"
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./AboutModal.css"
import logo from "../img/cube-outline.svg"
import LittleCubeAbout from "./LittleCubeAbout"
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

function AboutModal(props) {
    const { onClose, open } = props;
    const [page, setPage] = useState(1)

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="instructions" open={open}>
            <div style={{ position: "relative", height: 0, width: "100%" }}>
                <CloseIcon className="closeButton" onClick={handleClose} />
            </div>
            <div className="about__container">
                <div className="about__text__brand">
                    <div className="about__brand">
                        <img src={logo} alt="logo" className="brand__logo" />
                        <span className="ml-2 brand__text__about">Cubic Memotest</span>
                    </div>
                    <div className="demo__brand">(Demo)</div>
                </div>
                <LittleCubeAbout />

                <div className="about__text about__text__first">
                    Concept, Design & Programming:<br></br>
                    Julián Zamt | <a href="https://twitter.com/julianzamt" rel="noreferrer" target="_blank" style={{ textDecoration: "none", color: "gray" }}>@julianzamt</a>
                </div>

                <div className="about__text">
                    <b>This is a one stage only demo. </b><br></br>
                    The final version will include 5 levels, one for each platonic solid.
                </div>

                <div className="about__text">This game <i>is being made</i> entirely in React and -almost- pure CSS, using firebase for the scores database.</div>
                <div className="about__text">
                    I wish to deeply thank to <a href="https://twitter.com/anatudor" rel="noreferrer" target="_blank" style={{ textDecoration: "none", color: "gray" }}>@anatudor</a> and <a href="https://twitter.com/desandro" rel="noreferrer" target="_blank" style={{ textDecoration: "none", color: "gray" }}> @desandro</a>
                    . Without their insightfull teachings about CSS 3d transforms this wouldn´t have been possible.
                </div>
                <div className="about__text">Also thanks to Guille Ares and Nati Grandal for their loving support.</div>
                <div className="about__text">julizamt@gmail.com</div>
                <div className="about__text">
                    <a href="https://github.com/julizamt" rel="noreferrer" target="_blank" >
                        <GitHubIcon className="footer__icons grow" />
                    </a>
                    <a href="https://www.linkedin.com/in/julian-zamtlejfer-1520205a/" rel="noreferrer" target="_blank" >
                        <LinkedInIcon className="footer__icons grow" />
                    </a>
                    <a href="https://twitter.com/julianzamt" rel="noreferrer" target="_blank" >
                        <TwitterIcon className="footer__icons grow" />
                    </a>
                </div>
                <div>© 2021 Bs. As. Argentina</div>

            </div>
        </Dialog>
    )
}

export default AboutModal