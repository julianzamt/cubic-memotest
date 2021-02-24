import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer__container">
            <section>
                <span >©2021 Julián Zamt</span>
                <a href="https://github.com/julizamt" rel="noreferrer" target="_blank" >
                    <GitHubIcon className="footer__icons grow" />
                </a>
                <a href="https://www.linkedin.com/in/julian-zamtlejfer-1520205a/" rel="noreferrer" target="_blank" >
                    <LinkedInIcon className="footer__icons grow" />
                </a>
                <a href="https://twitter.com/julianzamt" rel="noreferrer" target="_blank" >
                    <TwitterIcon className="footer__icons grow" />
                </a>
            </section>
        </div>
    )
}

export default Footer
