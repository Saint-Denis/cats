import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUserRequested } from "./actions/auth";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./modules/Home";
import SiteNavigation from "./modules/SiteNavigation";
import Register from "./modules/Auth/Register";
import Login from "./modules/Auth/Login";
import CatsPage from "./modules/CatsPage";
import setAuthToken from "./utils/auth";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = ({ loadUserRequested }) => {
  loadUserRequested();
  return (
    <div className="page-content">
      <Router>
        <SiteNavigation />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivateRoute path="/cats" component={CatsPage}></PrivateRoute>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default connect(null, { loadUserRequested })(App);
