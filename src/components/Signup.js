import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {signup} from '../state/auth'
class Signup extends Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        email: '',
       
        
      };
      this.onChange = this.onChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }
  
    onChange(ev) {
      this.setState({ [ev.target.name]: ev.target.value });
    }
  
    onSubmit(ev) {
      ev.preventDefault();
      this.props.signup(this.state);
    }
  
    render() {
      const { onChange, onSubmit } = this;
      const { username, password, email, is } = this.state;
          
      return(
          <>
            <div className="side-bar-header-container">
              <h2 className='side-bar-header'>Sign Up</h2>
            </div>
           <form className='login-signup-form' onSubmit={onSubmit}>
              <p>Username</p>
               <input
                className='side-bar-input'
                name="username"
                onChange={onChange}
                value={username}
               />
              <p>Email</p>
              <input
                className='side-bar-input'
                type='email'
                name="email"
                onChange={onChange}
                value={email}
              />
               <p>Password</p>
               <input
                className='side-bar-input'
                type='password'
                name="password"
                onChange={onChange}
                value={password}
              />
              <button className='login-signup-button'>Sign Up</button>
           </form>
           <p className='or'><span>or</span></p>
           <button className='login-signup-button github-button'>
              <a className='github-link' href='/api/session/github'>
                <img 
                  src='https://cdn-icons-png.flaticon.com/512/25/25231.png' 
                  style={{ height: '1rem', float: 'left', position: 'relative', top: '2px' }} 
                />
                Continue with GitHub
              </a>
            </button>
          </>
          )
      }
    }


const mapDispatch = (dispatch) => {
    return {
      signup: (usrInfo) => {
        dispatch(signup(usrInfo));
      
      },
    };
  };

    export default connect(null, mapDispatch)(Signup);