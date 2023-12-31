import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useRef } from 'react'
import CenteredContainer from './CenteredContainer'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


export default function Signup() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch(err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(`Failed to create an account with error code:${errorCode}, message:${errorMessage}`)
        }
        setLoading(false)
    }
    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} type='submit' className='w-100'> Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    {/* Already have an account? <Link to={Login} >Log In</Link> */}
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </CenteredContainer>
        </>
    )
}
