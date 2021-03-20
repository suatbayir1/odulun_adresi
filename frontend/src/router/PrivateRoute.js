import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {

  const isLoggedIn = window.localStorage.getItem("username") === null ? false : true;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login-page', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute;