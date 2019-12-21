import * as React from 'react';
import { Table, PageHeader, Form, Button, Modal, Input } from 'antd';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 
import { useSelector } from 'react-redux';
import '../mainscore/MainScoreBoard.css';
import { RootState } from 'src/reducer';

const MainAttend = ({history}:any) => {
  const userData = useSelector((state:RootState) => state.userData.data);
  const [modalVisible, setModalVisible] = React.useState(false);

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
      width:"55%"
    }
  ];

  const onClick = () => {
      setModalVisible(!modalVisible);
  }

    return(
    <React.Fragment>
        <PageHeader 
            title="참가신청"
            style={{
            background: "#00d0ff5e",
            }}
        />
        <Table 
          columns={columns} 
          onRow={(recode, rowIndex) => {
            return{
              onClick: evnet => {
                history.push(
                  {
                    pathname:'/mainAttend/data',
                    state:recode
                  }
                )
              }
            }
          }}
          pagination={{
              size:"small"
          }}
          rowKey={(recode:any) => `${recode.key}`}
        />
        {
          userData.usertype === 'admin' 
          ? 
          <Form style={{textAlign:'center'}}>
            <Form.Item>
                <Button style={{width:'60%'}} onClick={onClick}  block={true}> 게시글 등록</Button>
            </Form.Item>
          </Form>
          : ''
        }
        <Modal visible={modalVisible} width='100%' bodyStyle={{height:'100%'}}>
          <Input addonBefore="제목" />
          <ReactQuill theme="snow" style={{marginTop:'20px', height:'100%'}} />
        </Modal>    
    </React.Fragment>
    )
}

export default React.memo(MainAttend);