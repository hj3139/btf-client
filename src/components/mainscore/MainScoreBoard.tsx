import * as React from 'react';
import { Table, PageHeader, Input, Form, Button } from 'antd';
import {useSelector} from 'react-redux';
import './MainScoreBoard.css';
import { RootState } from 'src/reducer';
import axios from 'axios';


const MainScoreBoard = ({history}:any) => {
  const userData = useSelector((state:RootState) => state.userData.data);
  const [boardTitle, setBoardTitle] = React.useState('');
  const [boardListData, setBoardListData] = React.useState();
  const [tableLoading, setTableLoding] = React.useState(true);
  const addEvent = () => {
   boardTitle === ''
   ? (() => alert('민규야 제목입력해라'))() 
    :(() => {
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
    const num:any = Object.values(boardListData)[0];
    let boardListNum:number = Object.values(boardListData).length !== 0 ? num.key : 0;
    setTableLoding(true); 
    axios.post('/api/mainscoreBoardData', {
      key:++boardListNum,
      title:boardTitle,
      name:userData.username,
      date:year + month + day
    }).then(() => {
      axios.get('/api/mainscoreBoardData')
      .then(res => {
        setBoardListData([...res.data.reverse()])
      })
      .then(() => {
        setTableLoding(false)
      })
    })
  })()
  }
  
  const changeTitle = (e:any) => {
    setBoardTitle(e.target.value);
  }

  const columns : any = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      width:'20%'
    },
    {
      title: '작성자',
      dataIndex: 'name',
      key: 'name',
      width:"25%"
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      width:"55%",
      render: (text:any,recode:any) => <div onClick={() => {
        history.push(
          {
            pathname:'/mainscore/data',
            state:recode
          }
        )
      }}>{text}</div>
    },
  ];
  const columns2 : any = [
    {
      title: '번호',
      dataIndex: 'key',
      key: 'key',
      width:'20%'
    },
    {
      title: '작성자',
      dataIndex: 'name',
      key: 'name',
      width:"25%"
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
      width:"55%",
      render: (text:any,recode:any) => <div onClick={() => {
        history.push(
          {
            pathname:'/mainscore/data',
            state:recode
          }
        )
      }}>{text}</div>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (index:any, recode:any, text:any) =>
       <a 
        onClick={() => {
          axios.delete('http://ec2-54-180-32-185.ap-northeast-2.compute.amazonaws.com:3000/api/mainscoreBoardData/'+ recode.id).then(() => {
            axios.get('/api/mainscoreBoardData').then(res => {
              console.log(res)
              res.data.length > 0 ? setBoardListData(res.data.reverse()) : setBoardListData([]);

            });
            axios.post('/api/mainScoreData/removeAll', {removeId:recode.id}).then((res) => {
              console.log(res);
            })
          })
        }} 
      >
        Delete
      </a>,
    }
  ];


  

  React.useEffect(() => {
    console.log(userData);
    axios.get('/api/mainscoreBoardData').then(res => {
      console.log(res)
      setBoardListData(res.data.reverse())
    })
    .then(() =>{
      setTableLoding(false)
    })
  }, [])

    return(
    <React.Fragment>
        <PageHeader 
            title="정모점수 게시판"
            style={{
            background: "#00d0ff5e",
            }}
        />
        <Table 
          columns={userData.usertype === 'admin' ? columns2 : columns} 
          dataSource={boardListData}
          pagination={{
              size:"small"
          }}
          rowKey={(recode:any) => `${recode.key}`}
          loading={tableLoading}
        />
        {
          userData.usertype === 'admin' 
          ? 
          <Form style={{textAlign:'center'}}>
            <Form.Item>
                <Input style={{color:'white', width:'60%'}} onChange={changeTitle} />
                <Button style={{width:'60%'}} block={true} onClick={addEvent} > 게시글 등록</Button>
            </Form.Item>
          </Form>
          : ''
        }
    </React.Fragment>
    )
}

export default React.memo(MainScoreBoard);