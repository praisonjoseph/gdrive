import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        >

        </Route>
    )
}
