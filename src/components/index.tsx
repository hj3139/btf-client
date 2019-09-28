import * as React from 'react';
import { Route } from 'react-router-dom';
import logo from '../asset/img/logo.png';
import LoginComponent from './signin/LoginComponent';
import SignupComponent from './signup/SignupComponent';

const Login = () => {
    return(
        <div id="loginForm">
            <img src={ logo } alt="logo" style={ {margin:'auto', display:'block'} } id="logo"/>
            <Route exact={true} path='/' component={LoginComponent} />
            <Route exact={true} path='/signup' component={SignupComponent} />
        </div>
    )
}

export default Login;


