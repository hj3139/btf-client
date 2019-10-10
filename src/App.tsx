import * as React from 'react';
import LoginComponent from './components/signin/LoginComponent';
import SignupComponent from './components/signup/SignupComponent';
import {Route, Switch} from 'react-router-dom';
import Home from './components/home/Home';


class App extends React.Component {
  
  public render() {
    return (
      <Switch>
        <Route exact={true} path={`/`} component={LoginComponent} />
        <Route exact={true} path={`/signup`} component={SignupComponent} />
        <Route exact={true} path='/home' component={Home} />
      </Switch>
    );
  }
}

export default App;
