import * as React from 'react';
import { PageHeader, Input, Button, Table, Modal, Select,Tabs } from 'antd';
import axios from 'axios';
import './MainScoreInput.css'
import { useSelector } from 'react-redux';
import { RootState } from 'src/reducer';

const {Option} = Select;
const {TabPane} = Tabs;

const MainScoreInput = (location:any) => {
    const [scoreData, setScoreData] = React.useState();
    const [dataSource, setDataSource] = React.useState();
    const [buttonCount, setButtonCount] = React.useState(0);
    const [allPinVisible, setAllPinVisible] = React.useState(false);
    const [addPointVisible, setAddPointVisible] = React.useState(false);
    const [children, setChildren] = React.useState();
    const [strikeName, setStrikeName] = React.useState();
    const [allCoverName, setAllCoverName] = React.useState();
    const [birthdayName, setBirthdayName] = React.useState();
    const userData = useSelector((state:RootState) => state.userData.data);
    const loginData = useSelector((state:RootState) => state.login.loginKey);
    const onChangeScore = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;

        
        setScoreData({
            ...scoreData,
           [name] : value,
        })
    }

    const handleInputScore = () => {
        try{
            let totalScore:any = 0;
            for(let i = 0; i < Object.keys(scoreData).length; i++){
                let scoreValue: any;
                scoreValue = Object.values(scoreData);
              location.userData.data.sex === '여' ? totalScore += parseInt(scoreValue[i] , 10) + 15 : totalScore += parseInt(scoreValue[i] , 10);
            }            
            axios.get(`/api/mainScoreData/getMyScore?getName=${location.userData.data.username}&getId=${location.location.location.state.id}`)
            .then(res => {

                res.data.result.length > 0
                ?
                axios.patch(
                    `/api/mainScoreData/${res.data.result[0]._id}`,
                    {
                        score:scoreData,
                        avg: (totalScore/Object.keys(scoreData).length).toFixed(2),
                        allPin:totalScore
                    }
                ).then(() => {
                    setButtonCount(buttonCount + 1)
                })
                :
                axios.post('/api/mainScoreData',{
                    username:location.userData.data.username,
                    userId:location.userData.data.id,
                    date:location.location.location.state.date,
                    boardId:location.location.location.state.id,
                    score:scoreData,
                    allPin:totalScore,
                    avg: (totalScore/Object.keys(scoreData).length).toFixed(2)
                }).then(() => {
                    setButtonCount(buttonCount + 1)
                })
            })
        }catch{
            alert('점수입력하세요')
        }
    }

    const handleAddPoint = () => {
        const array:any = [];
        for(const i  of dataSource){
            array.push(<Option key={i.userId}>{i.username}</Option>)
        } 
        setChildren(array);
        setAddPointVisible(true)
    }
    const addPoint = async () => {
        const a = strikeName.concat(allCoverName);
        const b = a.concat(birthdayName);
        const result = b.filter(word => word !==undefined);

        for(const i of result){
          await axios.get(`/api/users/getUser?getUser=${i}&access_token=${loginData._id}`)
            .then(async (res) => {
                res.data.result[0].id = res.data.result[0]._id
                delete res.data.result[0]._id
                await axios.put(`/api/users?&access_token=${loginData._id}`,{
                ...res.data.result[0],
                mPoint:res.data.result[0].mPoint + 1
              })
            }) 
        }
        setAddPointVisible(false);
    }
    React.useEffect(() => {
        axios.get(`/api/mainScoreData/getScoreAll?getId=${location.location.location.state.id}`)
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

                setDataSource(
                    data
                );
                for(const i of res.data.result){

                    i.username === location.userData.data.username
                    ?
                    (() => {
                        setScoreData(i.score)
                    })()
                    :(()=>{console.log()})()
                }
            })()
        });
        
    },[buttonCount])

    const colums: any = [
        {
            title:'rank',
            dataIndex:'rank',
            key:'rank',
        },
        {
            title:'name',
            dataIndex:'username',
            key:"username",
        },
        {
            title:'1G',
            dataIndex:'score.firstGame',
            key:'score.firstGame',
        },
        {
            title:'2G',
            dataIndex:'score.secondGame',
            key:'score.secondGame',
        },
        {
            title:'3G',
            dataIndex:'score.thirdGame',
            key:'score.thirdGame',
        },
        {
            title:'4G',
            dataIndex:'score.fourGame',
            key:'score.fourGame',
        },
        {
            title:'Avg',
            dataIndex:'avg',
            key:'avg',
        }
    ]
    const colums2: any = [
        {
            title:'name',
            dataIndex:'username',
            key:"username", 
        },
        {
            title:'총 핀',
            dataIndex:'allPin',
            key:'allPin',
        }
    ]

    return(
        <React.Fragment>
            <PageHeader 
                title={`${location.location.location.state.title} 점수입력`}
                style={{
                    background: "#00d0ff5e",
                    textAlign:'left'
                }}
            />
            <div id="inputContent" style={{width:'50%', margin:'20px auto 0px', textAlign:'center'}} >
                <Input 
                    addonBefore="1G"
                    style={{width:'100%', textAlign:'center'}}
                    name="firstGame"
                    value={scoreData? scoreData.firstGame : ''}
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="2G"
                    name="secondGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
                    value={scoreData?scoreData.secondGame? scoreData.secondGame :'':'' }
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="3G"
                    name="thirdGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
                    value={scoreData?scoreData.thirdGame? scoreData.thirdGame :'':'' }
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="4G"
                    name="fourGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
                    value={scoreData?scoreData.fourGame? scoreData.fourGame :'':'' }
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Button 
                    disabled={location.location.history.location.state.close ==='true' ? true : false}
                    style={{
                        width:'100%', 
                        marginTop:'20px'
                    }}
                    onClick={handleInputScore}
                >
                    입력
                </Button>
            </div>
            <Table 
                columns={colums} 
                style={{marginTop:'20px', width:'100%'}} 
                dataSource={dataSource} 
                pagination={false}
                rowKey={(recode:any) => `${recode.username}`}
            />

            <Button 
                style={{
                    width:'50%', 
                    margin:'10% auto', 
                    left:'0', 
                    right:'0',
                    position:'relative',
                }}
                onClick={() => {setAllPinVisible(true)}}
            >
                총 핀
            </Button>
            {
             userData.usertype === 'admin'
             ?  
             <Button
                style={{
                    width:'50%', 
                    margin:'10% auto', 
                    left:'0', 
                    right:'0', 
                    float:'left',
                    position:'relative'
                }}
                disabled={location.location.history.location.state.close ==='true' ? true : false}
                onClick={handleAddPoint}
             >
                추가 포인트
            </Button>
            :''
            }
            <Modal
                visible={allPinVisible}
                onOk={() => setAllPinVisible(false)}
                onCancel={() => setAllPinVisible(false)}
                closable={false}
                cancelButtonProps={{style:{display:'none'}}}
                maskClosable={false}
            >
                <Table 
                    columns={colums2}
                    dataSource={dataSource}
                    pagination={false}
                    style={{marginTop:'20px', width:'100%'}} 
                    rowKey={(recode:any) => `${recode.username}`}
                />
            </Modal>
            <Modal
                visible={addPointVisible}
                onOk={addPoint}
                onCancel={() => setAddPointVisible(false)}
                closable={false}
                maskClosable={false}
            >
                <Tabs defaultActiveKey="스트라이크" animated={false}>
                    <TabPane tab="스트라이크" key="스트라이크" style={{textAlign:'center'}}>
                        <Select 
                            mode='tags' 
                            style={{
                                width:'80%'
                            }}    
                            tokenSeparators={[',']}
                            onChange={
                                (e) => {
                                    setStrikeName(e);
                                }
                            }
                        >
                            {
                                children 
                                ? 
                                children
                                :''
                            }
                        </Select>
                    </TabPane>
                    <TabPane tab="올커버" key="올커버" style={{textAlign:'center'}}>
                            <Select 
                            mode='tags' 
                            style={{
                                width:'80%'
                            }}    
                            tokenSeparators={[',']}
                            onChange={
                                (e) => {
                                    setAllCoverName(e);
                                }
                            }
                        >
                            {
                                children 
                                ?        
                                children
                                :''
                            }
                        </Select>
                    </TabPane>
                    <TabPane tab="생일" key="생일" style={{textAlign:'center'}}>
                        <Select 
                            mode='tags' 
                            style={{
                                width:'80%'
                            }}    
                            tokenSeparators={[',']}
                            onChange={
                                (e) => {
                                    setBirthdayName(e);
                                }
                            }
                        >
                            {         
                                children 
                                ? 
                                children
                                :''
                            }
                        </Select>
                    </TabPane>
                </Tabs>
            </Modal>
        </React.Fragment>

    )
}

export default React.memo(MainScoreInput);


