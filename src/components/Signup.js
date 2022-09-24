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
      const { username, password, email, } = this.state;
          
      return(
            <div>
           <h1>Signup</h1>
           <form className='signup'onSubmit={onSubmit}>
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
              <input
               type='email'
                name="email"
                onChange={onChange}
                value={email}
                placeholder="Enter Email"
              />
              <button>signup</button>
           </form>
        
           </div>
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