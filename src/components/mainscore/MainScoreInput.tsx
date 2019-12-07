import * as React from 'react';
import { PageHeader, Input, Button, Table } from 'antd';
import axios from 'axios';

const MainScoreInput = (location:any) =>{
    const [scoreData, setScoreData] = React.useState();
    const onChangeScore = (e:any) => {
        const name = e.target.name;
        const value = e.target.value;
        
      scoreData 
      ?  
       setScoreData({
           ...scoreData,
           [name] : value,
       })
      :  
        setScoreData({
            [name] : value,
        })
    }

    const handleInputScore = () => {
        axios.get(`/api/mainScoreData/getMyScore?getName=${location.userData.data.username}&getDate=${location.location.location.state.date}`)
        .then(res => {
            if(res.data.result.length > 0){
                axios.patch(
                    `/api/mainScoreData/${res.data.result[0]._id}`,
                    {
                        score:scoreData       
                    }
                )
            }else{
                axios.post('/api/mainScoreData', {
                    username:location.userData.data.username,
                    date:location.location.location.state.date,
                    score:scoreData
                    
                })
            }
        })

    }

    React.useEffect(() => {

        axios.get(`/api/mainScoreData/getScoreAll?getDate=${location.location.location.state.date}`)
        .then(res => {
            console.log(res.data.result)
        })

    },[])

    const colums = [
        {
            title:'이름',
            dataIndex:'name',
            key:"name"
        },
        {
            title:'1G',
            dataIndex:'firstGame',
            key:'firstGame'
        },
        {
            title:'2G',
            dataIndex:'secondGame',
            key:'secondGame'
        },
        {
            title:'3G',
            dataIndex:'thirdGame',
            key:'thirdGame'
        },
        {
            title:'4G',
            dataIndex:'fourGame',
            key:'fourGame'
        },
        {
            title:'Avg',
            dataIndex:'average',
            key:'average'
        },
        {
            title:'등수',
            dataIndex:'rank',
            key:'rank'
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
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="2G"
                    name="secondGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="3G"
                    name="thirdGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
                    onChange={onChangeScore}
                    maxLength={3}
                />
                <Input 
                    addonBefore="4G"
                    name="fourGame"
                    style={{width:'100%', textAlign:'center', marginTop:'10px'}}
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
            <Table columns={colums} style={{marginTop:'20px'}} dataSource={[{}]} pagination={false}/>
        </React.Fragment>

    )
}

export default MainScoreInput;
