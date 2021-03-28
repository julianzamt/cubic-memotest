import React, { useState, useContext } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import firebase from '../config/firebase'
import Alert from 'react-bootstrap/Alert'
import AppContext from "../context/AppContext"
import "./Registro.css"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom"

function Registro(props) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmation: ''
    })

    const [spinner, setSpinner] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const context = useContext(AppContext)

    function handleSubmit(e) {
        setSpinner(true)
        setError(false)
        const username = form.username
        const email = form.email
        const password = form.password
        const confirmation = form.confirmation
        if (password.length >= 6 && password !== confirmation) {
            e.preventDefault()
            setError(true)
            setErrorMessage("Password and confirmation must match")
            setSpinner(false)
            return
        }
        else if (password.length < 6) {
            setError(true)
            setErrorMessage("Password must have 6 characters or more")
            e.preventDefault()
            setSpinner(false)
            return
        }
        else {
            firebase.auth.createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    firebase.db.collection("Usuarios").doc(data.user.uid).set({
                        username: username,
                        email: email
                    })
                })
                .then(() => { return (firebase.auth.signInWithEmailAndPassword(email, password)) })
                .then((data) => {
                    context.loginUser()
                    return (firebase.db.collection("Usuarios").doc(data.user.uid).get())
                })
                .then((data) => {
                    let user = data.data()
                    localStorage.setItem("username", user["username"])
                    context.setUsername(localStorage.getItem("username"))
                    setSpinner(false)
                    props.setFeedbackMessage("Succesfully registered and logged in.")
                    props.setFeedbackFlag(true)
                    props.setInitialScreenFlag(true)
                    props.setFinalFlag(false)
                    props.setWinFlag(false)
                    context.initialize()
                })
                .catch((err) => {
                    setError(true)
                    setErrorMessage(err.message)
                    setSpinner(false)
                })
        }
        e.preventDefault()
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

    return (
        <div className="register__container mt-3 text-center">
            <h2>User registration</h2>
            {error ? <Alert variant="danger">{errorMessage}</Alert> : null}
            <Form onSubmit={handleSubmit} >
                <Form.Control className="register__input" type="text" name="username" value={form.username} placeholder="Choose a username" onChange={handleChange} autofocus />
                <Form.Control className="register__input" type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} />
                <Form.Control className="register__input" type="password" name="password" value={form.password} placeholder="Password (6+ characters)" onChange={handleChange} />
                <Form.Control className="register__input" type="password" name="confirmation" value={form.confirmation} placeholder="Password confirmation" onChange={handleChange} />
                <Button variant="primary" type="submit">Register
            {spinner ? <Spinner animation="grow" variant="success" size="sm" className="ml-2" /> : null} </Button>
            </Form>
            <Link to="/" className="back__sign"><ArrowBackIcon /> Back to board</Link>
        </div>
    )
}

export default Registro