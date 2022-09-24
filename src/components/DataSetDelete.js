import React, { Component } from "react";
import { connect } from 'react-redux'
import { addDataSet, getDataSets } from "../api/dataSet";
import { addDataSetAC, setDataSetAC } from "../state/actionCreators/dataSetAC";
import { exchangeToken, logout } from "../state/auth";

class DeleteButton extends Component {
  constructor() {
    super();
    this.state = {
      popUp: false
    }
  }
  render() {
    const { popUp } = this.state;
    console.log(popUp)
    const { auth, logout, setDataSet } = this.props;
    const { createDataSet } = this;

    return (
      <>
        <button onClick={() => this.setState({ popUp: !popUp })}>Delete</button>
      </>
    );
  }
}

const mapState = state => {
  return state
}

const mapDispatch = dispatch => {
  return {
    exchangeToken: ()=> dispatch(exchangeToken()),
    logout: ()=> dispatch(logout()),
    setDataSet: (id)=> dispatch(setDataSetAC(id)),
    addDataSet: (dataSet)=> dispatch(addDataSetAC(dataSet))
  }
}

export default connect(mapState, mapDispatch)(DeleteButton);