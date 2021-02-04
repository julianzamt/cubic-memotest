import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from "../img/cube-outline.svg"


const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img src={logo} alt="logo" height="30" width="30" />
                <span className="ml-2">Cubic Memotest</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#link">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header