// // src/store/store.js
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers';

// const initialState = {};

// // Redux DevTools Extension
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// // Create Store
// const store = createStore(
//   rootReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default store;
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;