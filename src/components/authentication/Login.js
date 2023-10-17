import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useRef } from 'react'
import CenteredContainer from './CenteredContainer'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


export default function Login() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const { login, currentUser } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch(err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(`Failed to sign in with error code ${errorCode} and message ${errorMessage}`)
        }
        setLoading(false)
    }
    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Log In</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {/* {console.log(currentUser.email)} */}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button disabled={loading} type='submit' className='w-100'> Log In</Button>
                        </Form>
                        <div className='w-100 text-center mt-2'>
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    {/* Already have an account? <Link to={Login} >Log In</Link> */}
                    Need an account? <Link to="/signup">Sign up</Link>
                </div>
            </CenteredContainer>
        </>
    )
}
