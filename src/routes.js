
import React from 'react';
import Products from './views/Products/Products';
import Login from './views/Auth/Login/Login';
import Registeration from './views/Auth/Registeration/Registeration';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
    <Switch>
<Route exact  path="/products" component={Products}/>
<Route path="/login" component={Login}/>
<Route path="/registeration" component={Registeration}/>
</Switch>   
)


export default Routes;