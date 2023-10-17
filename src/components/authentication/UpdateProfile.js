import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useRef } from 'react'
import CenteredContainer from './CenteredContainer'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useHistory} from 'react-router-dom'


export default function UpdateProfile() {
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const passwordConfirmRef = useRef('')
    const { currentUser, updatingEmail, updatingPassword } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        const promises = []
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updatingEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatingPassword(passwordRef.current.value))
        }
        Promise.all(promises).then(() => {
            history.push('/')
        })
        .catch(() => {
            setError("Failed to update account")
        })
        .finally (() => {
            setLoading(false)
        })

    }
    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Update Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same' />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same' />
                            </Form.Group>
                            <Button disabled={loading} type='submit' className='w-100'> Update Profile</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    {/* Already have an account? <Link to={Login} >Log In</Link> */}
                    <Link to="/">Cancel</Link>
                </div>
            </CenteredContainer>
        </>
    )
}
