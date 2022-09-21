// import React, { useCallback, useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// function SideBar() {
//     const state = useSelector((state) => state)
//     console.log(state);

//     const [ isOpen, setIsOpen ] = useState(true);
//     const toggle = () => {
//       setIsOpen(!isOpen)
//     };
//   return (
//     <div className='side-bar' style={{ width: isOpen ? '20%' : 0 }}>
//         <h2>Hello username</h2>
//         <input placeholder='Search for Dataset' />
//         <br />
//         <button>Create New Dataset</button>
//         <ul>
//             <li>Dataset #1</li>
//             <li>Dataset #2</li>
//         </ul>
//         <button onClick={ () => toggle() } className='toggle'>toggle</button>
//     </div>
//   );
// }

// export default SideBar;

// import React, { Component } from "react";
// import { connect } from 'react-redux'
// import { getDataSets } from "../api/dataSet";
// import { exchangeToken, logout } from "../state/auth";

// class UserPage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isOpen: true,
//       dataSets: [],
//       term: ''
//     }
//   }
//   async componentDidMount() {
//     this.props.exchangeToken()
//     const response = await getDataSets();
//     this.setState({ dataSets: response.data })
//   }
//   render() {
//     const { isOpen, dataSets, term } = this.state;
//     const { auth, logout } = this.props;

//     const searchResult = dataSets.filter(dataSet => dataSet.name.toLowerCase().includes(term.toLowerCase()))

//     return (
//       <div className='side-bar' style={{ width: isOpen ? '20%' : 0 }}>
//           <div className='side-bar-header'>
//             <h2>Hello { auth.username }</h2>
//             <button onClick={ logout } style={{ height: '1.5rem' }}>Logout</button>
//           </div>
//           <input placeholder='Search for Dataset' onChange={ ev => this.setState({ term: ev.target.value })} />
//           <ul>
//               <li><button><span style={{ fontSize: '2rem' }}>+</span></button></li>
//               {
//                 searchResult.map(dataSet => {
//                   const { id, name } = dataSet
//                   return (
//                     <li key={ id }>
//                       <button><span>{ name }</span></button>
//                     </li>
//                   )
//                 })
//               }
//           </ul>
//           <button onClick={ () => this.setState({ isOpen: !isOpen }) } className='toggle'>toggle</button>
//       </div>
//     );
//   }
// }

// const mapState = state => {
//   console.log(state)
//   return state
// }

// const mapDispatch = dispatch => {
//   return {
//     exchangeToken: ()=> dispatch(exchangeToken()),
//     logout: ()=> dispatch(logout())
//   }
// }

// export default connect(mapState, mapDispatch)(UserPage);


import React, { Component } from "react";
import { connect } from 'react-redux'
import { addDataSet, getDataSets } from "../api/dataSet";
import { addDataSetAC, setDataSetAC } from "../state/actionCreators/dataSetAC";
import { exchangeToken, logout } from "../state/auth";

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      dataSets: [],
      term: ''
    }
    this.createDataSet = this.createDataSet.bind(this);
  }
  async componentDidMount() {
    const response = await getDataSets();
    this.setState({ dataSets: response.data })
  }
  createDataSet() {
    const dataSet = {
      name: `${this.props.auth.username} Data Set`,
      userId: this.props.auth.id
    }
    this.props.addDataSet(dataSet);
  }
  render() {
    const { dataSets, term } = this.state;
    const { auth, logout, setDataSet } = this.props;
    const { createDataSet } = this;

    const searchResult = dataSets.filter(dataSet => dataSet.name.toLowerCase().includes(term.toLowerCase()))

    return (
      <>
          <div className='side-bar-header'>
            <h2>Hello { auth.username }</h2>
            <button onClick={ logout } style={{ height: '1.5rem' }}>Logout</button>
          </div>
          <input placeholder='Search for Dataset' onChange={ ev => this.setState({ term: ev.target.value })} />
          <ul>
              <li><button onClick={ createDataSet }><span style={{ fontSize: '2rem' }}>+</span></button></li>
              {
                searchResult.map(dataSet => {
                  const { id, name } = dataSet
                  return (
                    <li key={ id }>
                      <button onClick={ () => setDataSet(id) }><span>{ name }</span></button>
                    </li>
                  )
                })
              }
          </ul>
      </>
    );
  }
}

const mapState = state => {
  console.log(state)
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

export default connect(mapState, mapDispatch)(UserPage);