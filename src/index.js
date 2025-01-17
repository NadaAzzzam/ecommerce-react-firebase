import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/context/authContext';
// import {createStore, applyMiddleware} from 'redux';
// import rootReducer from './store/reducers/rootReducer';
// import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// const store = createStore(rootReducer,applyMiddleware(thunk));


ReactDOM.render(
  // <Provider store={store}>
  <BrowserRouter>
  <AuthProvider>
  <App />
  </AuthProvider>
  </BrowserRouter>
  // </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
