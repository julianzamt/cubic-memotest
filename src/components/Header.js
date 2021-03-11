import React, { useContext, useState } from "react"
import firebase from '../config/firebase'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from "../img/cube-outline.svg"
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom"
import AppContext from "../context/AppContext"
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Spinner from 'react-bootstrap/Spinner'
import MenuIcon from '@material-ui/icons/Menu';
import "./Header.css"


const Header = (props) => {

    const context = useContext(AppContext)

    // Login form and logic
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const [spinner, setSpinner] = useState(false)

    let userId = ""

    function handleSubmit(e) {
        e.preventDefault()
        setSpinner(true)
        const email = form.email
        const password = form.password
        firebase.auth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                context.loginUser()
                return (firebase.db.collection("Usuarios").doc(data.user.uid).get())
            })
            .then((data) => {
                let user = data.data()
                localStorage.setItem("username", user["username"])
                context.setUsername(localStorage.getItem("username"))
                setSpinner(false)
            })
            .catch((err) => {
                props.setFeedbackFlag(true)
                props.setFeedbackMessage(err.message)
                setSpinner(false)
            })
    }

    function handleChange(e) {
        const target = e.target
        const name = target.name
        const value = target.value

        setForm({
            ...form,
            [name]: value
        })
    }

    function logout() {
        props.setFeedbackFlag(true)
        props.setFeedbackMessage("See you soon!")
        context.logoutUser()
    }

    return (
        <div className="navbar__container">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="22" width="22" />
                    <span className="ml-2 brand__text">Cubic Memotest</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="hamburguer__button"><MenuIcon className="hamburguer" /></Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                    {
                        context.login &&
                        <Nav className="greeting toggle-logged">
                            {context.username !== null ? <Navbar.Text className="username">Hi there, {context.username}</Navbar.Text> : <Navbar.Text className="username welcome toggle-logged">Welcome!</Navbar.Text>}
                            <Nav.Link onClick={logout}><span className="logout">| Logout </span></Nav.Link>
                        </Nav>
                    }
                    {
                        !context.login &&
                        <Nav className="ml-auto">
                            <Form inline onSubmit={handleSubmit}>
                                <Form.Group controlId="logIn">
                                    <Form.Label className="mr-2 login-label">Login</Form.Label>
                                    <FormControl
                                        name="email"
                                        value={form.email}
                                        placeholder="Email"
                                        aria-label="email"
                                        className="mr-2 nav-input toggle"
                                        onChange={handleChange}
                                    />
                                    <FormControl
                                        placeholder="Password"
                                        aria-label="password"
                                        type="password"
                                        className="nav-input toggle"
                                        onChange={handleChange}
                                        name="password"
                                        value={form.password}
                                    />
                                    {spinner ? <Spinner className="mr-2 ml-2" animation="grow" variant="success" size="sm" /> :
                                        <button className="button mr-2" type="submit"><NavigateNextIcon color="action" /></button>}
                                </Form.Group>

                            </Form>
                            <div className="register__text"><Navbar.Text className="register">Don´t have an account? &nbsp;</Navbar.Text><Nav.Link as={Link} to={'/registro'} className="register" >Register Here</Nav.Link></div>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header