import * as React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../asset/css/loginForm.css'
import 'antd/dist/antd.css';

const SignupComponent = () => {
 
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
          <Form.Item >
             <Input
              prefix={ <Icon type="user" style={{ color: 'rgba(0, 0, 0, .7)' }} /> }
              placeholder="MemberName"
            />
          </Form.Item>
          <Form.Item >
            <Input
              prefix={ <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .7)'}} /> }
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Input
               prefix={ <Icon type="idcard" style={{ color: 'rgba(0, 0, 0, .7)'}} />}
               placeholder="Six Digit Social Security Number"
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Button type="primary" className="login-form-button">
               <Link to='/'>
                  가입
               </Link>
            </Button>
            <Button type="primary" className="login-form-button">      
               <Link to='/'>
                  취소
               </Link>        
            </Button>
          </Form.Item>
        </Form>
      </React.Fragment>
 );
}

export default SignupComponent;