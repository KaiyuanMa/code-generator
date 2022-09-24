import React, { Component } from 'react';
import {login} from '../state/auth'
import { connect } from 'react-redux';

class Login extends Component{
  constructor() {
  super();
  this.state = {
    username: '',
    password: '',
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
    render(){
      const { onChange, onSubmit } = this;
    const { username, password } = this.state;

      
        return(
          <form  className='login' onSubmit={onSubmit}>
            <h3>Login</h3>
          <input
            name="username"
            onChange={onChange}
            value={username}
            placeholder="Enter Username"
          />
          <input
          type='password'
            name="password"
            onChange={onChange}
            value={password}
            placeholder="Enter Password"
          />
          <button>Login</button> 
          </form> 
        )
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