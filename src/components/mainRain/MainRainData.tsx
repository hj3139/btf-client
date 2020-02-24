import * as React from 'react';
import { PageHeader } from 'antd';
import DragDrop from './DragDrop';

const MainRainData = (location:any) => {

    return(
        <React.Fragment>
            <PageHeader
                title={`${location.location.location.state.title} 레인배정`}
                style={{
                    background: "#00d0ff5e",
                    textAlign:'left'
                }}
            />
            <DragDrop location={location}/>
        </React.Fragment>
    )
}

export default MainRainData;