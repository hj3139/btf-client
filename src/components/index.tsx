import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginComponent from './signin/LoginComponent';
import SignupComponent from './signup/SignupComponent';


const Login = () => {
    return( 
        <Switch>
            <Route exact={true} path='/' component={LoginComponent} />
            <Route exact={true} path='/signup' component={SignupComponent} />
        </Switch>
    )
}

export default Login;


