
import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import logo from '../../asset/img/logo.png';
import '../../asset/css/loginForm.css';



const LoginComponent = ({match, history}) => {
console.log(match.url);
console.log(match.path);
  
  
  interface ILoginData{
    email:string;
    password:string;
  }


  const [loginData, setLoginData] = React.useState<ILoginData>({email:'', password:''})

  const handleLogin = () => {
    axios.post('/api/users/login',{
      email:loginData.email,
      password:loginData.password
    }).then(res => {
      history.push('/home')
      console.log(res)
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
         <div id="loginForm">
            <img src={ logo } alt="logo" style={ {margin:'auto', display:'block'} } id="logo"/>
        <Form 
            style={{
                width:'50%', 
                minWidth:'264px', 
                top:'0', 
                left:'0', 
                bottom:'0', 
            }}
            className="login-form"
        >
          <Form.Item style={{marginTop:'10px'}}>
             <Input
              prefix={ <Icon type="mail" style={{ color: 'rgba(0, 0, 0, .7)' }} /> }
              placeholder="Email"
              onChange={handleChange}
              value={loginData.email}
              name="email"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Input
              prefix={ <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .7)'}} /> }
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginData.password}
              name="password"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Button type="primary" className="login-form-button" onClick={handleLogin}>
                로그인
            </Button>
            <Button type="primary" className="login-form-button">
              <Link to={`/signup`}>
                회원가입
              </Link>
            </Button>
            <Button type="primary" className="login-form-button">
              <Link to={`/guest`}>
                게스트
              </Link>
            </Button>
          </Form.Item>
        </Form>
        </div>
      </React.Fragment>
    );
};
export default LoginComponent;
