import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const AdminPrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = window.localStorage.getItem("admin") === null ? false : true;

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect to={{ pathname: '/admin-login-page', state: { from: props.location } }} />
                    )
            }
        />
    )
}

export default AdminPrivateRoute;