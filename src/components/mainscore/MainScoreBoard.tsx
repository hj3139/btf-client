import * as React from 'react';
import { Table, PageHeader } from 'antd';
import './MainScoreBoard.css';

const MainScoreBoard = () => {
    const columns : any = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key',
            width:'20%',
            render:(recode:any, rowIndex) =>{
                return(
                    <div onClick={ () => alert(recode) } style={{cursor:'pointer'}} >{recode}</div>
                )
            }
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
          width:"55%"
        }
      ];
      
      const data = [
        {
          key: '1',
          name: '김호정',
          title: '[100회] 정기모임',
        },
        {
          key: '2',
          name: 'Jim Green',
          title: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          title: 'Sidney No. 1 Lake Park',
        },
        {
            key: '4',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '5',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '6',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '7',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '8',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '9',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '10',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
          {
            key: '11',
            name: 'Joe Black',
            title: 'Sidney No. 1 Lake Park',
          },
      ];
    return(
    <React.Fragment>
        <PageHeader 
            title="정기모임 게시판"
            style={{
            background: "#00d0ff5e",
            }}
        />
        <Table columns={columns} dataSource={data}
            pagination={{
                size:"small"
            }}
        />
    </React.Fragment>
    )
}

export default MainScoreBoard;