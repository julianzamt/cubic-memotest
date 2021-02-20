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
                userId = data.user.uid
                return (firebase.db.collection("Usuarios").where("userId", "==", userId).get())
            }).then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data()
                }))
                localStorage.setItem("username", data[0].username)
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
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <img src={logo} alt="logo" height="30" width="30" />
                <span className="ml-2">Cubic Memotest</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    context.login &&
                    <Nav className="greeting">
                        {context.username !== null ? <Navbar.Text className="username">Hi there, {context.username}</Navbar.Text> : <Navbar.Text className="username welcome">Welcome!</Navbar.Text>}
                        <Nav.Link onClick={logout}><span className="logout">| Logout </span></Nav.Link>
                    </Nav>
                }
                {
                    !context.login &&
                    <Nav className="ml-auto">
                        <Form inline onSubmit={handleSubmit}>
                            <Form.Group controlId="logIn">
                                <Form.Label className="mr-2 nav-input">Login</Form.Label>
                                <FormControl
                                    name="email"
                                    value={form.email}
                                    placeholder="email"
                                    aria-label="email"
                                    className="mr-2 nav-input"
                                    onChange={handleChange}
                                />
                                <FormControl
                                    placeholder="Password"
                                    aria-label="password"
                                    type="password"
                                    className="nav-input"
                                    onChange={handleChange}
                                    name="password"
                                    value={form.password}
                                />
                            </Form.Group>
                            {spinner ? <Spinner className="mr-2 ml-2" animation="grow" variant="success" size="sm" /> :
                                <button className="button mr-2" type="submit"><NavigateNextIcon color="action" /></button>}


                        </Form>
                        <Navbar.Text className="register">Don´t have an account?</Navbar.Text><Nav.Link as={Link} to={'/registro'} className="register" >Register Here</Nav.Link>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header