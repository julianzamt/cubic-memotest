import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from "../img/cube-outline.svg"
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"
import "./Header.css"


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
                    <Form inline>
                        <Form.Group controlId="logIn">
                            <Form.Label className="mr-2 nav-input">Login</Form.Label>
                            <FormControl
                                placeholder="Username"
                                aria-label="Username"
                                className="mr-2 nav-input"
                            />
                            <FormControl
                                placeholder="Password"
                                aria-label="password"
                                type="password"
                                className="mr-2 nav-input"
                            />
                        </Form.Group>
                    </Form>
                    <Navbar.Text className="register">Don´t have an account?</Navbar.Text><Nav.Link as={Link} to={'/registro'} className="register" >Register Here</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header