import React from 'react';
import './App.css';
// import Header from './layouts/Header/Header';
// import { Switch, Route } from 'react-router-dom';
// import Products from './views/Products/Products';
// import Login from './views/Auth/Login/Login';
// import Registeration from './views/Auth/Registeration/Registeration';
import Navbar from './layout/Navbar';
import Routes from './routes';

function App() {
  return (
    <div>
      <Navbar />
      <div className="container p-4">
<Routes/>     
      </div>

    </div>
  );
}

export default App;
