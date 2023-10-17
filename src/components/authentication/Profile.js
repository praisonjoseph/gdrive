import React, { useState } from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import CenteredContainer from './CenteredContainer'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'

export default function Profile() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    const handleLogout = async() => {
        setError("")

        try {
            await logout()
            history.push("/login")
        }catch {
            setError("Failed to Log out")
        }

    }
    return (
        <>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Profile</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <strong>Email:</strong> {currentUser.email}
                        <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    <Button variant='link' onClick={handleLogout}>Log Out</Button>
                </div>
            </CenteredContainer>
        </>
    )
}
