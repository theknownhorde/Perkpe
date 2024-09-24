// src/actions/authActions.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// Login Action
export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token } = res.data;
    const user = jwtDecode(token);

    // Save token to localStorage
    localStorage.setItem('token', token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: user,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: LOGIN_FAIL,
    });
    alert('Login Failed. Please check your credentials.');
  }
};

// Register Action
export const register = (username, email, password) => async (dispatch) => {
  try {
    await axios.post('/api/auth/register', { username, email, password });

    dispatch({
      type: REGISTER_SUCCESS,
    });
    alert('Registration Successful. Please log in.');
  } catch (err) {
    console.error(err);
    dispatch({
      type: REGISTER_FAIL,
    });
    alert('Registration Failed. Please try again.');
  }
};

// Logout Action
export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT,
  });
};
