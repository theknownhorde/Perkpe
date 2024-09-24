// src/reducers/authReducer.js
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from '../actions/types';
  
  const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: payload,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
        };
      case LOGIN_FAIL:
      case REGISTER_FAIL:
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  