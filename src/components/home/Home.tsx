import * as React from 'react';
import 'antd/dist/antd.css';
import { Link, Route, Switch } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import axios from 'axios';
import { MainScoreBoard } from '../mainscore';
import { Calendars } from '../calendar';
import User from '../user/User';

const Home = ({loginKey, setLogin}) =>{
    const { Header, Sider, Content } = Layout;
    const {SubMenu} : any = Menu;
    const [collapsed, setCollapsed] = React.useState(true);
    const [pageState, setPageState] = React.useState('1');
    const [headerName, setHeaderName] = React.useState('');

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    const menuClick = (key) => {
        setPageState(key);
    }
    const logout = () => {
        axios.post(`/api/users/logout?access_token=${loginKey.id}`).then(res => {
            setLogin(false)    
        });
    }
    const renderCalendar = () => {
        return (
            <Calendars loginKey={loginKey} />
        );
    }

    React.useEffect(() => {
        console.log("aaaaaa");
        axios.get(`/api/users/${loginKey.userId}?access_token=${loginKey.id}`).then(res => {
            setHeaderName(res.data.username);
        })
    },[])
    
    
    console.log(document.getElementsByClassName('ant-menu-item'));
    console.log(typeof pageState)
    console.log(pageState)

    return(
        <Layout style={{width:"100%", height:"100%"}}>
            <Sider trigger={null} collapsible={true} collapsed={collapsed} theme="light">
                <div className="logo" >BTF</div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['mainscore']}>
                    <SubMenu 
                        key="user" 
                        title={
                            <span>
                                <Icon type="user" />
                                <span>게시판</span> 
                            </span>
                        }
                    
                    >
                        <Menu.Item key="mainscore" onClick={menuClick}><Link to='mainscore' />점수기록</Menu.Item>
                        <Menu.Item>abc</Menu.Item>
                        <Menu.Item>def</Menu.Item>
                        <Menu.Item>ghi</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="name" onClick={menuClick}>
                        <Icon type="video-camera" />
                        <span>김호정</span>
                        <Link to='user' />
                    </Menu.Item>
                    <Menu.Item key="calendar" onClick={menuClick}>
                        <Icon type="calendar" />
                        <span>이달의 일정</span>
                        <Link to={`calendar`} />
                    </Menu.Item>
                </Menu>
            </Sider>
        <Layout style={{background:"#2b3e50"}} >
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
        <Content style={{overflow:'scroll'}}>
            <Switch>
                <Route exact={true} path='/' component={MainScoreBoard} />
                <Route exact={true} path='/mainscore' component={MainScoreBoard} />
                <Route exact={true} path='/user' component={User} />
                <Route exact={true} path='/calendar' render={renderCalendar}/>
            </Switch>
        </Content>
        </Layout>
      </Layout>
    )
}

export default Home;