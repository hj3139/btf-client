import * as React from 'react';
import axios from 'axios';
/*import logo from '../asset/img/logo.png';*/
import 'antd/dist/antd.css';
import '../asset/css/loginForm.css';
import LoginComponent from './signin/LoginComponent';
import Home from './home/Home';
import SignupComponent from './signup/SignupComponent';


const Login = () => {

  interface ILoginData{
    email:string;
    password:string;
  }


  const [loginData, setLoginData] = React.useState<ILoginData>({email:'', password:''});
  const [login, setLogin] =React.useState(false);
  const [loginKey, setLoginKey] = React.useState('');
  const [singup, setSignup] = React.useState(false);

  const signPage = () => {
    setSignup(!singup);
  }

  const handleLogin = () => {
    axios.post('/api/users/login',{
      email:loginData.email,
      password:loginData.password
    }).then(res => {
     setLoginKey(res.data);
      setLoginData({
        email:'',
        password:''
      })
    }).then(res => {
        setLogin(true);
    })
    .catch(err => {
      setLogin(false);
      alert("id, 비밀번호 확인")
    })
  }

  const handleChange = e => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  
    console.log(e.target.value);
  }

    return( 
        <React.Fragment>
            {!singup ?
                <React.Fragment>
                {
                    !login ? 
                    <div id="loginForm">
                        <img src={ '' } alt="logo" style={ {margin:'auto', display:'flex'} } id="logo"/>
                        <LoginComponent handleChange={handleChange} handleLogin={handleLogin} loginData={loginData} signPage={signPage} />
                    </div>
                    : <Home loginKey={loginKey} setLogin={setLogin} />
                }
                </React.Fragment>
                : <SignupComponent signPage={signPage} />
            }
        </React.Fragment>
    )
}

export default Login;


