import * as React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import logo from '../../asset/img/logo.png';
import axios from 'axios';


const SignupComponent = ({signPage}) => {
  interface IFormData {
    username:string;
    password:string;
    securityNumber:string;
    email:string;
    sex:string;
  }

  
const [form, setValues] = React.useState<IFormData>({username:'', password:'', securityNumber:'', email:'', sex:''});
const today = new Date();
const year = (today.getFullYear()).toString();
let month = (today.getMonth() + 1).toString();
let day = today.getDate().toString();

if(parseInt(day, 10) < 10){
  day = '0'+ day
}

if(parseInt(month, 10) < 10){
  month = '0' + month
}

console.log(`${year}${month}${day}`);

const handleChange = (e:any) => {
  setValues({
    ...form,
    [e.target.name] : e.target.value
  })

  console.log(e.target.value);
 }

const handleJoin = () => {

  if(form.username !== '' || form.password !=='' || form.email !== ''){
    axios.post('/api/users',{
      username : form.username,
      password : form.password,
      email:form.email,
      securityNumber : form.securityNumber,
      sex: form.sex,
      joinDate : `${year}${month}${day}` 
    }).then(res => {
      location.reload();
      alert('가입완료');
    }).catch(error => {
      alert('가입 실패');
    });
     
  }else{
    alert('정확한정보를 입력해주세요');
  }
}

  
 return(
    <React.Fragment>
       <div id="loginForm" style={{height:window.innerHeight}}>
            <img src={ logo } alt="logo" style={ {margin:'auto', display:'block', width:'360px'} } id="logo"/>
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
          <Form.Item>
            <Input
               prefix={ <Icon type="mail" style={{ color: 'rgba(0, 0, 0, .7)'}} />}
               placeholder="Email"
               name="email"
               value={form.email}
               onChange={handleChange}
            />
          </Form.Item>
          <Form.Item >
            <Input
              prefix={ <Icon type="lock" style={{ color: 'rgba(0, 0, 0, .7)'}} /> }
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
          </Form.Item>
          <Form.Item>
             <Input
              prefix={ <Icon type="user" style={{ color: 'rgba(0, 0, 0, .7)' }} /> }
              placeholder="MemberName"
              name="username"
              onChange={handleChange}
              value={form.username}
            />
          </Form.Item>
          <Form.Item>
          <Input
              prefix={ <Icon type="user" style={{ color: 'rgba(0, 0, 0, .7)' }} /> }
              placeholder="남 or 여"
              name="sex"
              onChange={handleChange}
              value={form.sex}
            />
          </Form.Item>
          <Form.Item>
            <Input
               prefix={ <Icon type="idcard" style={{ color: 'rgba(0, 0, 0, .7)'}} />}
               placeholder="Six Digit Social Security Number"
               name="securityNumber"
               value={form.securityNumber}
               onChange={handleChange}
            />
          </Form.Item>
          <Form.Item style={ {marginBottom:0} }>
            <Button type="primary" className="login-form-button" onClick={handleJoin} >
                  가입
            </Button>
            <Button type="primary" className="login-form-button" onClick={signPage}>      
                  취소
            </Button>
          </Form.Item>
        </Form>
        </div>
      </React.Fragment>
 );
}

export default SignupComponent;