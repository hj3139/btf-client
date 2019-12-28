import * as React from 'react';
import { Table, PageHeader } from 'antd';
import './MainScoreBoard.css';
import axios from 'axios';


const MainScoreBoard = ({history}:any) => {
  
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
  
  React.useEffect(() => {
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
          columns={columns} 
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