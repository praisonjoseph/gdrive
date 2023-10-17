import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useRef } from 'react'
import CenteredContainer from './CenteredContainer'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


export default function ForgotPassword() {
    const emailRef = useRef('')
    const { resetPassword } = useAuth();
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setMessage("")
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch(err) {
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(`Failed to reset password with error code ${errorCode} and message ${errorMessage}`)
        }
        setLoading(false)
    }
    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Reset Password</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {message && <Alert variant='success'>{message}</Alert>}
                        {/* {console.log(currentUser.email)} */}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} type='submit' className='w-100'> Reset Password</Button>
                        </Form>
                        <div className='w-100 text-center mt-2'>
                            <Link to="/login">Log In</Link>
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
