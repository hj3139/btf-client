import * as React from 'react';
import axios from 'axios';
import logo from '../asset/img/logo.png';
import 'antd/dist/antd.css';
import '../asset/css/loginForm.css';
import LoginComponent from './signin/LoginComponent';
import Home from './home/Home';
import SignupComponent from './signup/SignupComponent';
import {useDispatch} from 'react-redux';
import {loginKeyFc} from '../reducer/login';
import {userDataFc} from '../reducer/userData';
import {useCookies} from 'react-cookie';




const Login = () => {

  interface ILoginData{
    email:string;
    password:string;
  }

  const dispatch = useDispatch();
  const [cookies,setCookie] =  useCookies(['loginkey']);
  const [loginData, setLoginData] = React.useState<ILoginData>({email:'', password:''});
  const [login, setLogin] =React.useState(true);
  const [singup, setSignup] = React.useState(false);

  const signPage = () => {
    setSignup(!singup);
  }

  const handleLogin = () => {
  cookies.loginkey !== undefined && cookies.loginkey !== ''? 
    (() => {
      console.log("로그인유지 & 자동로그인")
    })()
    :
    axios.post('/api/users/login',{
      email:loginData.email,
      password:loginData.password
    }).then(res => {
      axios.get('/api/users/' + res.data.userId + "?access_token=" + res.data.id).then(
        response => {
          dispatch(userDataFc(response.data))
        }
      )
      dispatch(loginKeyFc(res.data));
      setLoginData({
        email:'',
        password:''
      })
      return res;
    }).then(res => {
      setLogin(true);   
      setCookie('loginkey', res.data.id, {path: '/'})
   })
    .catch(err => {
      setLogin(false);
      alert("id, 비밀번호 확인")
    })
   
  }

  const handleChange = (e:any) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }
  React.useEffect( () => {
    cookies.loginkey !== undefined && cookies.loginkey !== '' ? 
     axios.get('/api/accessTokens/getUser?getUser=' + cookies.loginkey + '&access_token=' + cookies.loginkey).then(async res => {
       console.log(res)
       dispatch(loginKeyFc(res.data.result[0]));
     
       await axios.get('/api/users/' + res.data.result[0].userId + '?access_token=' + cookies.loginkey)
         .then(response => {
           console.log(response);
           dispatch(userDataFc(response.data));
         }).then(() => {
          setLogin(true)
         })
     })
    :(() => {
      setLogin(false)
    })()
},[])
    return( 
        <React.Fragment>
            {!singup ?
                <React.Fragment>
                {
                    !login ? 
                    <div id="loginForm" style={{height:window.innerHeight}}>
                        <img src={ `${logo}` } alt="logo" style={ {margin:'auto', display:'flex', width:360} } id="logo"/>
                        <LoginComponent handleChange={handleChange} handleLogin={handleLogin} loginData={loginData} signPage={signPage} />
                    </div>
                    : <Home setLogin={setLogin} />
                }
                </React.Fragment>
                : <SignupComponent signPage={signPage} />
            }
        </React.Fragment>
    )
}

export default Login;


