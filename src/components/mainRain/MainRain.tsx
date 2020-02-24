import * as React from 'react';
import axios from 'axios';
import { PageHeader, Table } from 'antd';


const MainRain = ({history}) => {

    const [boardListData, setBoardListData] = React.useState();
    const [tableloding, setTableLoding] = React.useState(true);

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
                pathname:'/mainRain/data',
                state:recode
              }
            )
          }}>{text}</div>
        },
      ];

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
                title="정모레인"
                style={{
                    background: "#00d0ff5e",
                }}
            />
            <Table 
                dataSource={boardListData}
                loading={tableloding}
                columns={columns}
            />
        </React.Fragment>
    )
}

export default MainRain;