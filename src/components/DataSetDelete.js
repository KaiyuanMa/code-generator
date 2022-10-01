import React, { Component } from "react";
import { connect } from 'react-redux'
import { addDataSet, getDataSets } from "../api/dataSet";
import { deleteDataSetAC } from "../state/actionCreators/dataSetAC";
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
    const { deleteDataSet } = this.props;
    const { dataSet } = this.props.dataSet

    return (
      <>
        <button onClick={() => this.setState({ popUp: !popUp })} className='delete-button'>Delete</button>
        { popUp && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgb(0,0,0, .5)",
            top: 0,
            zIndex: "500",
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            action=""
            style={{
              postition: "relative",
              backgroundColor: "#333333",
              display: "flex",
              flexDirection: "column",
              height: "15%",
              width: "30%",
              textAlign: "center",
              padding: "1rem",
              justifyContent: "space-around"
            }}
          >
            <p style={{ color: 'white' }}>Are you sure you want to delete { dataSet.name }?</p>
            <div>
              <button className='popup-button' onClick={ () => this.setState({ popUp: !popUp }) } style={{ marginRight: '1rem'}}>Cancel</button>
              <button className='popup-button' onClick={ () => deleteDataSet(dataSet.id) } style={{ marginLeft: '1rem'}}>Delete</button>
            </div>
          </div>
        </div>
      )}
      </>
    );
  }
}

const mapState = state => {
  return state
}

const mapDispatch = dispatch => {
  return {
    deleteDataSet: (id)=> dispatch(deleteDataSetAC(id))
  }
}

export default connect(mapState, mapDispatch)(DeleteButton);