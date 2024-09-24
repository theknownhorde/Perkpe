// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TransactionsList from './components/Dashboard/TransactionsList';
import TransferPoints from './components/Dashboard/TransferPoints';
import TransferToBank from './components/Dashboard/TransfertoBank';
import PrivateRoute from './components/shared/PrivateRoutes';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from './actions/types';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: user,
      });
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer-points"
          element={
            <PrivateRoute>
              <TransferPoints />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfer-to-bank"
          element={
            <PrivateRoute>
              <TransferToBank />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes here */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
