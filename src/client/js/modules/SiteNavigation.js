import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

class SiteNavigation extends Component<> {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    const { isGuest, isLoading } = this.props;

    if (isLoading) return null;

    return (
      <nav className="site-navigation">
        <ul className="site-navigation__list">
          <li className="site-navigation__item">
            <Link to="/">Главная</Link>
          </li>
          {!isGuest && (
            <Fragment>
              <li className="site-navigation__item">
                <Link to="/cats">Котики</Link>
              </li>
              <li className="site-navigation__item" onClick={this.handleLogout}>
                <Link to="/">Выйти</Link>
              </li>
            </Fragment>
          )}
          {isGuest && (
            <Fragment>
              <li className="site-navigation__item">
                <Link to="/register">Регистрация</Link>
              </li>
              <li className="site-navigation__item">
                <Link to="/login">Войти</Link>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToPtops = ({ auth }) => {
  return {
    isGuest: auth.isGuest,
    isLoading: auth.isLoading
  };
};

export default connect(mapStateToPtops, { logout })(SiteNavigation);
