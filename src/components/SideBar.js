import React, { Component } from "react";
import { connect } from 'react-redux'
import { getDataSets } from "../api/dataSet";
import { exchangeToken, logout } from "../state/auth";
import UserPage from "./UserPage";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true
    }
  }
  async componentDidMount() {
    this.props.exchangeToken()
  }
  render() {
    const { isOpen } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div>
        <div className='side-bar' style={{ width: isOpen ? '20%' : 0 }}>
          {
              isLoggedIn ? (
                  <UserPage />
              ) : (
                  <h3>Login/Sign Up</h3>
              )
          }
        </div>
        <button onClick={ () => this.setState({ isOpen: !isOpen }) } className='toggle' style={{ right: isOpen ? '272px' : '-16px' }}>toggle</button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    exchangeToken: ()=> dispatch(exchangeToken())
  }
}

export default connect(mapState, mapDispatch)(SideBar);