import * as React from 'react';
import { PageHeader, Table } from 'antd';
import {useCookies} from 'react-cookie';
import axios from 'axios';

const UserInfo = () => {
    const [cookies] =  useCookies(['loginkey']);
    const [dataSource, setDataSource] = React.useState();
    const [tableLoading, setTableLoading] = React.useState(true);
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
            title:'Avg',
            dataIndex:'avg',
            key:'avg',
        }
    ];

    React.useEffect(() => {
        const datas:any = [];
        setTableLoading(true);
        axios.get('/api/users?access_token=' + cookies.loginkey ).then(async res => {
            for(const i of res.data){
               await axios.get('/api/mainscoreData/getAllAvg?getName=' + i.username + '&getId' + i.id )
                .then(response => {
                    console.log(response)
                    
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
                            })()
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
            console.log(datas);
            setTableLoading(false);
        })
    }, [])

    return (
        <React.Fragment>
            <PageHeader 
                title={`회원정보`}
                style={{
                    background: "#00d0ff5e",
                }}
            />


        <Table 
            columns={colums}
            rowKey={(recode:any) => `${recode.username}`}
            dataSource={dataSource} 
            loading={tableLoading}
            style={{color:'black'}}
        />
        </React.Fragment>
    )
}

export default UserInfo;