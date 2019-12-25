import * as React from 'react';
import Login from './components';
import {CookiesProvider} from 'react-cookie';



class App extends React.Component {
  
  public render() {
    return (
      <CookiesProvider>
        <Login />
     </CookiesProvider>
    );
  }
}

export default App;
