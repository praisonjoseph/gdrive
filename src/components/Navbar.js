import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {
    return (
        <Navbar>
            <Navbar.Brand as={Link} to="/">WDS Drive</Navbar.Brand>
            <h1>Navbar</h1>
        </Navbar>

    )
}
