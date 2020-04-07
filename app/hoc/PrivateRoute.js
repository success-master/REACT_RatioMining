import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

// eslint-disable-next-line react/prop-types
export default ({ component: Component, ...rest }) => {
    const authenticated = useSelector(state => state.auth.authenticated)

    return <Route {...rest} render={props => (authenticated ? <Component {...props} /> : <Redirect to="/login" />)} />
}
