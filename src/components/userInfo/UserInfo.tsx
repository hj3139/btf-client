import * as React from 'react';
import { PageHeader, Table, Button, Modal } from 'antd';
import {useCookies} from 'react-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducer';

const UserInfo = () => {
    const [cookies] =  useCookies(['loginkey']);
    const [dataSource, setDataSource] = React.useState();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [tableLoading, setTableLoading] = React.useState(true);
    const userData = useSelector((state:RootState) => state.userData.data);
    const loginData = useSelector((state:RootState) => state.login.loginKey);
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

    const handleResetPoint = () => {
        setTableLoading(true);
        axios.get('/api/users/getUser?getUser=undefined&getName=undefined&access_token=' + cookies.loginkey).then(async res => {
            for(const i of res.data.result){
                i.id = i._id
                delete i._id
                console.log(i)
                await axios.put(`/api/users?&access_token=${loginData._id}`,{
                    ...i,
                    mPoint:0
                })
            }
            alert('초기화완료');
            window.location.reload()
        })
    }

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
                    <React.Fragment key="1">
                        <Button onClick ={handleClickPoint}>Mpoint 제도</Button>
                        {
                            userData.usertype === 'admin'
                            ? 
                            <Button onClick={handleResetPoint}>
                                포인트 초기화
                            </Button>
                            :''
                        }
                    </React.Fragment>
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
        <p>정모 랭킹 1 ~ 3등 및 스트라이크, 올커버에 부여합니다.</p>
        <p>⦿ 정모 랭킹 1등 -> 50 point</p>
        <p>⦿ 정모 랭킹 2등 -> 30 point</p>
        <p>⦿ 정모 랭킹 3등 -> 10 point</p> 
        <p>⦿ 올 커버 -> 30 point</p> 
        <p>⦿ 남자 파이브베가, 여자 터키 -> 10 point</p>
        <p>6개월마다 포인트 시상</p>                
        <p>⦿ 1등 -> 15만원</p> 
        <p>⦿ 2등 -> 10만원</p> 
        <p>⦿ 3등 -> 5만원</p> 
        </Modal>
        </React.Fragment>
    )
}

export default UserInfo;