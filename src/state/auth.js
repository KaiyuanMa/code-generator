//temporary file for testing login & logout

import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const exchangeToken = () => async dispatch => {
  const token = window.localStorage.getItem('token')
  if (token) {
    const res = await axios.get('/api/session', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const login = (credentials) => async dispatch => {
    let res = await axios.post('/api/session', credentials);
    const { token } = res.data;
    window.localStorage.setItem('token', token); 
    res = await axios.get('/api/session', {
        headers: {
            authorization: token
        }
    });
    return dispatch(setAuth(res.data))
  }

export const logout = () => {
  window.localStorage.removeItem('token')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}
export const signup = (userInfo, history) => {
  return async (dispatch) => {
    const response = await axios.post('/api/session/signup', userInfo);
    const { token } = response.data;
    window.localStorage.setItem('token', token);
    const auth = (
      await axios.get('/api/session', {
        headers: {
          authorization: token,
        },
      })
    ).data;
    dispatch(setAuth(auth));
    
  };
};
