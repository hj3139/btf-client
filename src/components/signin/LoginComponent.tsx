
import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

const LoginComponent = ({handleChange, loginData, handleLogin, signPage}) => {
  return(
    <React.Fragment>
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
          <Button type="primary" className="login-form-button" onClick={signPage}>
            회원가입
          </Button>
          <Button type="primary" className="login-form-button">
            <Link to={`/guest`}>
              게스트
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};
export default LoginComponent;
