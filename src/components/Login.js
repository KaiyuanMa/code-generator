import React, { Component } from "react";
import { login } from "../state/auth";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginAttempt: false,
      error: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSubmit(ev) {
    try {
      ev.preventDefault();
      this.props.login(this.state);
    } catch (err) {
      console.log(err);
    }
  }
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { onChange, onSubmit } = this;
    const { username, password } = this.state;

    return (
      <>
      <div className="side-bar-header-container">
          <h2 className='side-bar-header'>Login</h2>
        </div>
        <form className="login-signup-form" onSubmit={onSubmit}>
          <p>Username</p>
          <input
            className='side-bar-input'
            name="username"
            onChange={onChange}
            value={username}
          />
          <p>Password</p>
          <input
            className='side-bar-input'
            type="password"
            name="password"
            onChange={onChange}
            value={password}
          />
          <button className='login-signup-button'>Login</button>
      </form>
      <p className='or'><span>or</span></p>
      <button className='login-signup-button github-button'>
        <img 
          src='https://cdn-icons-png.flaticon.com/512/25/25231.png' 
          style={{ height: '1rem', float: 'left', position: 'relative', top: '2px' }} 
        />
        Continue with Github
      </button>
      </>
    );
  }
}
const mapDispatch = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};
export default connect(null, mapDispatch)(Login);
