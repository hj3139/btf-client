import * as React from 'react';
import { PageHeader, Input, Button, Table } from 'antd';
import axios from 'axios';
import './MainScoreInput.css'

const MainScoreInput = (location:any) =>{
    const [scoreData, setScoreData] = React.useState({
        firstGame:'0',
        secondGame:'0',
        thirdGame:'0',
        fourGame:'0'
    });
    console.log(location)
    const [dataSource, setDataSource] = React.useState([{}]);
    const [buttonCount, setButtonCount] = React.useState(0);
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
           
            
            console.log(totalScore);
            
            axios.get(`/api/mainScoreData/getMyScore?getName=${location.userData.data.username}&getId=${location.location.location.state.id}`)
            .then(res => {
                console.log(res);
                res.data.result.length > 0
                ?
                axios.patch(
                    `/api/mainScoreData/${res.data.result[0]._id}`,
                    {
                        score:scoreData,
                        avg: (totalScore/Object.keys(scoreData).length).toFixed(2)
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
                    avg: (totalScore/Object.keys(scoreData).length).toFixed(2)
                }).then(() => {
                    setButtonCount(buttonCount + 1)
                })
            })
        }catch{
            alert('점수입력하세요')
        }
       

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
                    return a.avg < b.avg ? 1 : a.avg > b.avg ? -1 : 0;
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
                        console.log(i.score)
                        setScoreData(i.score)
                        
                    })()
                    :(()=> console.log())()
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

    return(
        <React.Fragment>
            <PageHeader 
                title={`${location.location.location.state.title} 점수입력`}
                style={{
                    background: "#00d0ff5e",
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
        </React.Fragment>

    )
}

export default MainScoreInput;
