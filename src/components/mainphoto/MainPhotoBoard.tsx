import * as React from 'react';
import {PageHeader, Button} from 'antd'

const MainPhotoBoard = () => {
    return (
        <React.Fragment>
            <PageHeader 
                title="정모사진"
                style={{
                background: "#00d0ff5e",
                }}
            />
            <Button>
                사진 등록
            </Button>
        </React.Fragment>
        
    )
}

export default MainPhotoBoard;