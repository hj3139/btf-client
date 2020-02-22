import * as React from 'react';
import { Table, PageHeader } from 'antd';
import { RootState } from 'src/reducer';
import { useSelector } from 'react-redux';
import './MainScoreBoard.css';
import axios from 'axios';


const MainScoreBoard = ({history}:any) => {

  const userData = useSelector((state:RootState) => state.userData.data);
  const loginData = useSelector((state:RootState) => state.login.loginKey);
  const [boardListData, setBoardListData] = React.useState();
  const [tableLoading, setTableLoding] = React.useState(true);

 
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

  const adminColumns : any = [
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
      title:'Action',
      key:'action',
      render: (text:any, record:any) => 
        <div 
          // onClick={() => record.close === 'false' ? handleSucces(record) : alert('집계완료')}
        >
         <a onClick={() => record.close === 'false' ? handleSucces(record) : alert('집계완료')}>집계</a>
        </div>
    }
  ]
  
  const handleSucces = (record:any) => {
    axios.get(`/api/mainScoreData/getScoreAll?getId=${record.id}`)
    .then(res => {
      let data:any; 
      data = res.data.result;
      data.length < 1
      ?(()=>console.log('nodata'))()
      :
        (() => {
          data.sort((a:any, b:any) => {
            return parseFloat(a.avg) < parseFloat(b.avg) ? 1 : parseFloat(a.avg) > parseFloat(b.avg) ? -1 : 0;
          })
          for(let j = 0; j < data.length; j++){
            data[j].rank = j + 1
                  
          }
        })()
      const ranker = data.splice(0, 3);
          return ranker
    }).then(async (data) => {
      const rankerPoint = [50, 30, 10];
      for(let i = 0; i < rankerPoint.length; i++){
       await axios.get(`/api/users/getUser?getUser=${data[i].userId}&getName=${undefined}&access_token=${loginData._id}`)
        .then((res) => {
          res.data.result[0].id = res.data.result[0]._id
          delete res.data.result[0]._id
          axios.put(`/api/users?&access_token=${loginData._id}`,{
            ...res.data.result[0],
            mPoint:res.data.result[0].mPoint + rankerPoint[i]
          })
        }) 
      }
      alert("집계 완료")
    })
    axios.put(`/api/mainscoreBoardData`, {
      ...record,
      close:'true'
    })
  }

  React.useEffect(() => {
    axios.get('/api/mainscoreBoardData').then(res => {
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
          columns={userData.usertype !== 'admin' ? columns : adminColumns} 
          dataSource={boardListData}
          pagination={{
              size:"small"
          }}
          rowKey={(recode:any) => `${recode.key}`}
          loading={tableLoading}
        />
    </React.Fragment>
    )
}

export default React.memo(MainScoreBoard);