import * as React from 'react';
import { Icon } from 'antd';

const EventList = ({eventList}) => {
   console.log(eventList);
    return(
        <React.Fragment>
           <div style={{width:'60%', margin:'0 auto', textAlign:'center'}}>
                {
                    eventList.map((array, index) => {
                        let icon;
                        if(array.rrule !== undefined) {
                            icon = 'gift'
                        }else{
                            icon = 'heart'
                        }
                        return (
                            <React.Fragment  key={`"eventList"${index}`}>
                                    <Icon type={`${icon}`} style={{color:'red'}} theme="filled" />
                                    <span style={{borderBottom:'1px solid white', color:'white', textAlign:'center'}}>
                                        {array.title}
                                    </span>  
                                    <br />
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default React.memo(EventList);