import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../helpers/auth';

const GuestRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (!Auth.isUserAuthenticated()) {
          return <Component {...rest} {...props} />
        } else {

          return (
            <Redirect to={
              {
                pathname: '/home',
                state: {
                  from: props.location
                }
              }
            } />
          )
        }
      }
    } />
  )
}

export default GuestRoute;