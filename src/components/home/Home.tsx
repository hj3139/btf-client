import * as React from 'react';
import './Home.css';
import 'antd/dist/antd.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import axios from 'axios';
import { MainScoreBoard, MainScoreInput } from '../mainscore';
import { Calendars } from '../calendar';
import User from '../user/User';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../reducer';
import { userDataFc } from '../../reducer/userData';


const Home = ({setLogin}) =>{
    const { Header, Sider, Content } = Layout;
    const {SubMenu} : any = Menu;
    const [collapsed, setCollapsed] = React.useState(true);
    const [pageState, setPageState] = React.useState('1');
    const [headerName, setHeaderName] = React.useState('');
    const loginData = useSelector( (state:RootState) => state.login.loginKey);
    const userData = useSelector( (state:RootState) => state.userData);
    const dispatch = useDispatch();

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    const menuClick = (key:any) => {
        setPageState(key);
    }
    const logout = () => {
        axios.post(`/api/users/logout?access_token=${loginData.id}`).then(res => {
            setLogin(false)    
        });
    }
    
    React.useEffect(() => {
        console.log("aaaaaa");
        console.log(userData);
        axios.get(`/api/users/${loginData.userId}?access_token=${loginData.id}`).then(res => {
            dispatch(userDataFc(res.data));
            setHeaderName(res.data.username);
            return res;
        });
    },[])
    console.log(pageState);
    return(       
    <Layout style={{width:"100%", height:"100%"}}>
                 { window.innerWidth > 540 ? 
                 <Sider trigger={null} collapsible={true} collapsed={collapsed} theme="dark">
                <div className="logo" >BTF</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['mainscore']} >
                    <SubMenu 
                        key="user" 
                        title={
                            <span>
                                <Icon type="user" />
                                <span>게시판</span> 
                            </span>
                        }
                    
                    >
                        <Menu.Item key="mainscore" onClick={menuClick}><Link to='/mainscore' />점수기록</Menu.Item>
                        <Menu.Item>abc</Menu.Item>
                        <Menu.Item>def</Menu.Item>
                        <Menu.Item>ghi</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="name" onClick={menuClick}>
                        <Icon type="video-camera" />
                        <span>김호정</span>
                        <Link to='/user' />
                    </Menu.Item>
                    <Menu.Item key="calendar" onClick={menuClick}>
                        <Icon type="calendar" />
                        <span>이달의 일정</span>
                        <Link to='/calendar' />
                    </Menu.Item>
                </Menu>
            </Sider>
            :''
        }
        <Layout style={{background:"#2b3e50"}} >
          {window.innerWidth > 540 ? 
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
            <Link to ='/'>
                <Icon type="logout" className='trigger' onClick={logout} style={{float:'right'}} />
            </Link>
            <div style={{fontSize:'18px', float:'right'}}>{headerName}</div>
          </Header>
            : 
            <Header style={{background: '#001529', padding: 0}} >
                
                <Dropdown 
                    overlay={
                        <Menu theme="dark" selectable={true} defaultSelectedKeys={['mainscore']}  >
                            <SubMenu selectable={true} key="user" title={<span>게시판</span>}>
                                <Menu.Item key="mainscore" onClick={menuClick}>
                                    <Link to='/mainscore'>
                                        정모점수    
                                    </Link>
                                </Menu.Item >  
                                <Menu.Item>
                                    정모점수    
                                </Menu.Item>
                                <Menu.Item>
                                    정모점수    
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="name" onClick={menuClick}>
                                <Link to='/user'>
                                    김호정
                                </Link>
                            </Menu.Item>
                           
                            <Menu.Item  key="/calendar" onClick={menuClick}>
                                <Link to='calendar'>
                                    이달의 일정
                                </Link>
                            </Menu.Item>
                        </Menu>
                        
                    } 
                    overlayStyle={{
                        width:'80%'
                    }}
                    trigger={['click']}
                >
                    <Icon 
                        type="menu" 
                        style={{
                            padding:'24px',
                            float:'left',
                            color:'white'
                        }}
                    />
                </Dropdown>
                <div 
                    style={{
                        position:'absolute',
                        width:100, 
                        height:32,
                        top:16,  
                        left:0,
                        right:0,
                        fontSize:25, 
                        color:'white', 
                        background:'#fe6500',
                        fontWeight:800,
                        textAlign:'center',
                        margin: '0 auto',
                        lineHeight:'35px',
                        borderRadius: '100px'
                    }}
                >
                    BTF
                </div> 
                <Link to ='/'>
                    <Icon 
                        type="logout" 
                        className='trigger' 
                        onClick={logout} 
                        style={{
                            float:'right', 
                            position:'relative', 
                            padding:'24px',
                            lineHeight:'0px',
                            color:'white'
                        }}
                    />
                </Link>   
            </Header>
          }
        <Content style={{overflow:'scroll', position:'relative'}}>
            <Switch>
                <Route exact={true} path='/' render={() => <Redirect to='/mainscore' />} />
                <Route exact={true} path='/mainscore' component={MainScoreBoard} />
                <Route exact={true} path='/mainscore/data'  render={ (location) => <MainScoreInput location={location} userData={userData} /> }/>
                <Route exact={true} path='/user' component={User} />
                <Route exact={true} path='/calendar' component={Calendars}/>
            </Switch>
        </Content>
        </Layout>
      </Layout> 
    
    )
    
}

export default Home;