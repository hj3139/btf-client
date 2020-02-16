import * as React from 'react';
import { PageHeader, Table, Button, Modal } from 'antd';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const UserInfo = () => {
    const [cookies] =  useCookies(['loginkey']);
    const [dataSource, setDataSource] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [tableLoading, setTableLoading] = React.useState(true);
    const colums: any = [
        {
            title:'Rank',
            dataIndex:'rank',
            key:'rank',
        },
        {
            title:'Name',
            dataIndex:'username',
            key:"username",
        },
        {
            title:'Avg',
            dataIndex:'avg',
            key:'avg',
        },
        {
            title:'Mpoint',
            dataIndex:'mPoint',
            key:'mPoint'
        }
    ];

    const handleClickPoint = () => {
        setModalVisible(true);
    }

    React.useEffect(() => {
        const datas:any = [];
        setTableLoading(true);
        axios.get('/api/users?access_token=' + cookies.loginkey ).then(async res => {
            for(const i of res.data){
               await axios.get('/api/mainscoreData/getAllAvg?getName=' + i.username + '&getId' + i.id )
                .then(response => {
                    response.data.result.length > 0    
                    ?
                    (() => {
                        datas.push({
                            username:i.username,
                            avg:(() => {
                                let avg:any = 0;
                                for(const j of response.data.result){
                                    avg += parseFloat(j.avg)
                                }
                            return (avg/response.data.result.length).toFixed(2)
                            })(),
                            mPoint:i.mPoint + ' point'
                        })
                        datas.sort((a:any, b:any) => {
                            return a.avg < b.avg ? 1 : a.avg > b.avg ? -1 : 0;
                        });
                        for(let j = 0; j < datas.length; j++){
                            datas[j].rank = j + 1
                        }
                    })()
                    :(() => {
                        console.log('no data');
                    })()
                })
            }
            setDataSource(datas);
        }).then(() => {
            setTableLoading(false);
        })
    }, [])

    return (
        <React.Fragment>
            <PageHeader 
                title={`회원정보`}
                subTitle={`(각 회원의 정모 참여 횟수에 의한 정보입니다.)`}
                style={{
                    background: "#00d0ff5e",
                }}
                extra={[
                    <Button key="1" onClick ={handleClickPoint}>Mpoint 제도</Button>
                ]}
            />


        <Table 
            columns={colums}
            rowKey={(recode:any) => `${recode.username}`}
            dataSource={dataSource}
            pagination={false} 
            loading={tableLoading}
            style={{color:'black'}}
        />
        <Modal 
            visible={modalVisible}
            title="mPoint"
            onOk={() => setModalVisible(false)}
            closable={false}
            cancelButtonProps={{style:{display:'none'}}}
            maskClosable={false}
        >
        <p>정모 랭킹 1 ~ 3등 및 스트라이크, 올커버, 생일자에 부여합니다.</p>
        <p>추가적인 포인트는 클럽장 재량하에 부여합니다.</p>
        <p>⦿ 정모 랭킹 1등 -> 3 point</p>
        <p>⦿ 정모 랭킹 2등 -> 3 point</p>
        <p>⦿ 정모 랭킹 3등 -> 3 point</p> 
        <p>⦿ 스트라이크, 올커버, 생일자 -> 각 1 point</p>
        </Modal>
        </React.Fragment>
    )
}

export default UserInfo;