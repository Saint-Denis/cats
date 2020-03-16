// @flow

import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { loginRequested, removeErrors } from "../../actions/auth";
import Button from "../../components/Button";
import Errors from "../../components/Errors";

type State = {
  email: string,
  password: string
};

class Login extends Component<{}, State> {
  state = {
    email: "",
    password: ""
  };

  componentWillMount() {
    this.props.removeErrors();
  }

  handleChange = (e: Event) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async (e: Event) => {
    const { email, password } = this.state;
    const { loginRequested, removeErrors } = this.props;
    e.preventDefault();
    removeErrors();
    loginRequested({ email, password });
  };
  render() {
    const { email, password } = this.state;
    const { isGuest, errors } = this.props;

    if (!isGuest) {
      return <Redirect to="/"></Redirect>;
    }

    return (
      <Fragment>
        <h1>Login</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__field">
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email"
            />
          </div>
          <div className="form__field">
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </div>
          <div className="form__field">
            <Button type="submit" text="Вoйти" />
          </div>
          <div className="form__field">
            Нет аккаунта?{" "}
            <span>
              <Link to="/register">Регистрация</Link>
            </span>
          </div>
          {errors && <Errors errors={errors} />}
        </form>
      </Fragment>
    );
  }
}

const mapStateToPtops = ({ auth }) => {
  return {
    isGuest: auth.isGuest,
    errors: auth.errors
  };
};

export default connect(mapStateToPtops, { loginRequested, removeErrors })(
  Login
);
