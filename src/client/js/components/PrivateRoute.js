import React from "react";
import { Route, Redirect } from "react-router";

const isAuthenticated = localStorage.getItem("token");

const PrivateRoute = ({
  component: Component,
  isGuest,
  isLoading,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
