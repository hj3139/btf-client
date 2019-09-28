
import * as React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../asset/css/loginForm.css'

const LoginComponent = () => {
  
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
              prefix={ <Icon type="user" style={{ color: 'rgba(0, 0, 0, .7)' }} /> }
              placeholder="MemberName"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Input
              prefix={ <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .7)'}} /> }
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Button type="primary" className="login-form-button">
              로그인
            </Button>
            <Button type="primary" className="login-form-button">
              <Link to='signup'>
                회원가입
              </Link>
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
};
export default LoginComponent;
