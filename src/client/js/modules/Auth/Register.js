// @flow

import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { registerRequested, removeErrors } from "../../actions/auth";
import Button from "../../components/Button";
import Errors from "../../components/Errors";

type State = {
  name: string,
  email: string,
  password: string,
  password2: string
};

export class Register extends Component<{}, State> {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
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
    const { registerRequested, removeErrors } = this.props;
    const { name, email, password, password2 } = this.state;
    e.preventDefault();

    const newUser = {
      name,
      email,
      password
    };
    removeErrors();
    registerRequested(newUser);
  };
  render() {
    const { name, email, password, password2 } = this.state;
    const { isGuest, errors } = this.props;
    if (!isGuest) {
      return <Redirect to="/home"></Redirect>;
    }
    return (
      <Fragment>
        <h1>Register</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Name"
            />
          </div>
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
            <Button type="submit" text="Зарегистрироваться" />
          </div>
          <div className="form__field">
            <span> Есть аккаунт? </span>
            <span>
              <Link to="/login">Авторизация</Link>
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

export default connect(mapStateToPtops, { registerRequested, removeErrors })(
  Register
);
