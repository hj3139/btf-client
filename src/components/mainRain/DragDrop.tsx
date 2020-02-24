import * as React from 'react';
import axios from 'axios';
import {Button} from 'antd';
import {DragDropContainer, DropTarget} from 'react-drag-drop-container';


const Drag = (location:any) => {

    const [attendList, setAttendList] = React.useState();
    const [dragList1, setDragList1] = React.useState();
    const [dragList2, setDragList2] = React.useState();
    const [dragList3, setDragList3] = React.useState();
    const [dragList4, setDragList4] = React.useState();
 


    React.useEffect(() => {
        console.log(location.location.location.location.state)
        axios.get(`/api/attendUsers/getList?getBoardId=${location.location.location.location.state.boardId}`).then(res => {
            console.log(res);
            setAttendList(res.data.result);
        })
    },[])

    

    return(
        <React.Fragment>
            {
                attendList 
                ? 
                attendList.map((arr, idx) => {
                    return(
                        <DragDropContainer 
                            targetKey='foo' 
                            key={`drag${idx}`} 
                            dragData={arr.username} 
                        >
                            <div
                                style={{width:'70px',height:'30px', background:'blue', margin:'10px', lineHeight:'30px', border: '1px solid'}}
                            >
                                {arr.username}
                            </div>
                        </DragDropContainer>
                    )
                })
                :''
            }
        <div>
        <DropTarget 
            targetKey='foo' 
            onHit={(e) => {

                dragList1 
                ? 
                dragList1.indexOf(e.dragData) > -1
                ?
                setDragList1(dragList1)
                :
                setDragList1([
                    ...dragList1,
                    e.dragData
                ])
                :
                setDragList1([
                    e.dragData
                ])
                e.containerElem.style.visibility = 'hidden';
            }} 
            dropData={["foo"]} 
        >
            <div style={{width:'40%', height:'150px', background:'red', border: '1px solid', float:'left', margin:'5%'}}>
                <p>레인 1</p>
                {
                    dragList1 ? 
                    dragList1.map((arr, idx) => {
                        return(
                            <DragDropContainer 
                                targetKey='foo' 
                                key={`drag${idx}`} 
                                dragData={arr} 
                                onDrop={() => {
                                    dragList1.splice(idx, 1);
                                    setDragList1(dragList1)
                                }}
                            >
                                <div
                                    style={{width:'70px',height:'30px', background:'blue', margin:'10px', lineHeight:'30px'}}
                                >
                                {arr}
                                </div>
                        </DragDropContainer>
                        )
                    })
                    :''
                }
            </div>
        </DropTarget>
        <DropTarget 
            targetKey='foo'  
            dropData={["foo"]}
            onHit={(e) => {
                
                dragList2 
                ? 
                dragList2.indexOf(e.dragData) > -1
                ?
                setDragList2(dragList2)
                :
                setDragList2([
                    ...dragList2,
                    e.dragData
                ])
                :
                setDragList2([
                    e.dragData
                ])
               e.containerElem.style.visibility = 'hidden';
            }} 
        >
            <div style={{width:'40%', height:'150px', background:'red', border: '1px solid', float:'left', margin:'5%'}}>
                {
                    dragList2 ? 
                    dragList2.map((arr, idx) => {
                        return(
                            <DragDropContainer 
                                targetKey='foo' 
                                key={`drag${idx}`} 
                                dragData={arr}
                                onDrop={(e) => {
                                    console.log(e)
                                    dragList2.splice(dragList2.indexOf(e.dragData), 1);
                                    setDragList2(dragList2)
                                }} 
                            >
                                <div
                                    style={{width:'70px',height:'30px', background:'blue', margin:'10px', lineHeight:'30px'}}
                                >
                                {arr}
                                </div>
                        </DragDropContainer>
                        )
                    })
                    :''
                }
            </div>
        </DropTarget>
        <DropTarget 
            targetKey='foo'  
            dropData={["foo"]}
            onHit={(e) => {
                
                dragList3 
                ? 
                dragList3.indexOf(e.dragData) > -1
                ?
                setDragList3(dragList3)
                :
                setDragList3([
                    ...dragList3,
                    e.dragData
                ])
                :
                setDragList3([
                    e.dragData
                ])
                e.containerElem.style.visibility = 'hidden';
            }} 
        >
            <div style={{width:'40%', height:'150px', background:'red', border: '1px solid', float:'left', margin:'5%'}}>
                {
                    dragList3 ? 
                    dragList3.map((arr, idx) => {
                        return(
                            <DragDropContainer 
                                targetKey='foo' 
                                key={`drag${idx}`} 
                                dragData={arr}
                                onDrop={() => {
                                    dragList3.splice(idx, 1);
                                    setDragList3(dragList3)
                                }} 
                            >
                                <div
                                    style={{width:'70px',height:'30px', background:'blue', margin:'10px', lineHeight:'30px'}}
                                >
                                {arr}
                                </div>
                        </DragDropContainer>
                        )
                    })
                    :''
                }
            </div>
        </DropTarget>
        <DropTarget 
            targetKey='foo'  
            dropData={["foo"]}
            onHit={(e) => {
                
                dragList4 
                ? 
                dragList4.indexOf(e.dragData) > -1
                ?
                setDragList4(dragList4)
                :
                setDragList4([
                    ...dragList4,
                    e.dragData
                ])
                :
                setDragList4([
                    e.dragData
                ])
                e.containerElem.style.visibility = 'hidden';
            }} 
        >
            <div style={{width:'40%', height:'150px', background:'red', border: '1px solid', float:'left', margin:'5%'}}>
                {
                    dragList4 ? 
                    dragList4.map((arr, idx) => {
                        return(
                            <DragDropContainer 
                                targetKey='foo' 
                                key={`drag${idx}`} 
                                dragData={arr}
                                onDrop={() => {
                                    dragList4.splice(idx, 1);
                                    setDragList4(dragList4)
                                }} 
                            >
                                <div
                                    style={{width:'70px',height:'30px', background:'blue', margin:'10px', lineHeight:'30px'}}
                                >
                                {arr}
                                </div>
                        </DragDropContainer>
                        )
                    })
                    :''
                }
            </div>
            {
                <Button
                    onClick={() => {
                        console.log('저장');
                    }}
                >
                    저장
                </Button>
            }
        </DropTarget>
        </div>
        </React.Fragment>
    )
}

export default Drag;