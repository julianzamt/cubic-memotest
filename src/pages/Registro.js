import React, { useState, useContext } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import firebase from '../config/firebase'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom"
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

    const history = useHistory()
    const context = useContext(AppContext)

    let userId = ""

    function handleSubmit(e) {
        setSpinner(true)
        setError(false)
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
                    firebase.db.collection("Usuarios").add({
                        username: form.username,
                        email: form.email,
                        userId: data.user.uid
                    })
                })
                .then(() => {
                    const email = form.email
                    const password = form.password
                    return (firebase.auth.signInWithEmailAndPassword(email, password))
                        .then((data) => {
                            context.loginUser()
                            userId = data.user.uid
                            return (firebase.db.collection("Usuarios").where("userId", "==", userId).get())
                        })
                        .then((querySnapshot) => {
                            const data = querySnapshot.docs.map((doc) => ({
                                ...doc.data()
                            }))
                            localStorage.setItem("username", data[0].username)
                            context.setUsername(localStorage.getItem("username"))
                            setSpinner(false)
                            props.setFeedbackFlag(true)
                            props.setFeedbackMessage("Succesfully registered and logged in.")
                            history.push("/")
                        })
                })
                .catch((err) => {
                    setError(true)
                    setErrorMessage(err.message)
                    setSpinner(false)
                })
        }
        e.preventDefault()
        return
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
        <div className="container mt-3 text-center">
            <h2>Welcome to Cubic Memotest</h2>
            {error ? <Alert variant="danger">{errorMessage}</Alert> : null}
            <Form onSubmit={handleSubmit}>
                <Form.Control type="text" name="username" value={form.username} placeholder="Choose a username" onChange={handleChange} /><br></br>
                <Form.Control type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} /><br></br>
                <Form.Control type="password" name="password" value={form.password} placeholder="Password (6+ characters)" onChange={handleChange} /><br></br>
                <Form.Control type="password" name="confirmation" value={form.confirmation} placeholder="Password confirmation" onChange={handleChange} /><br></br>
                <Button variant="primary" type="submit">Register
            {spinner ? <Spinner animation="grow" variant="success" size="sm" className="ml-2" /> : null} </Button>
            </Form>
            <div className="back__container"><Link to="/" className="back__sign"><ArrowBackIcon /> Back to board</Link></div>
        </div>
    )
}

export default Registro