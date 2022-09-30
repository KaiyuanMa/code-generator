import React, { Component } from "react";
import { connect } from "react-redux";
import { exchangeToken, logout } from "../state/auth";
import UserPage from "./UserPage";
import Login from "./Login";
import Signup from "./Signup";
import UserControl from "./UserControl";

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: true,
    };
  }
  async componentDidMount() {
    this.props.exchangeToken();
  }
  render() {
    const { isOpen } = this.state;
    const { isLoggedIn } = this.props;
    return (
      <div className="side-bar-container">
        <div className="button-wrapper">
          <button
            onClick={() => this.setState({ isOpen: !isOpen })}
            className="toggle"
          >
            {
              isOpen ?
              '>' :
              '<'
            }
          </button>
        </div>
        <div className="side-bar" style={{ width: isOpen ? "20rem" : 0 }}>
          {isLoggedIn ? (
            <UserPage />
          ) : (
            <div>
              {" "}
              <UserControl />{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    exchangeToken: () => dispatch(exchangeToken()),
  };
};

export default connect(mapState, mapDispatch)(SideBar);
