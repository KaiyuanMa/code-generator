import React, { Component } from "react";
import { connect } from 'react-redux'
import { getDataSets } from "../api/dataSet";
import { exchangeToken, logout } from "../state/auth";
import UserPage from "./UserPage";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    }
  }
  async componentDidMount() {
    this.props.exchangeToken()
  }
  render() {
    const { isOpen } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div className='side-bar' style={{ width: isOpen ? '20%' : 0 }}>
        {
            isLoggedIn ? (
                <UserPage />
            ) : (
                <h3>Login/Sign Up</h3>
            )
        }
        <button onClick={ () => this.setState({ isOpen: !isOpen }) } className='toggle'>toggle</button>
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