import * as React from 'react';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import './Calendars.css';
import Calendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import RRuelPlugin from '@fullcalendar/rrule';
import koLocale from '@fullcalendar/core/locales/es' ;
import { Form, Input, Button, PageHeader } from 'antd';
import * as moment  from 'moment';
import axios from 'axios';
import EventList from './EventList';
import { useSelector } from 'react-redux';
import {RootState} from '../../reducer';



const Calenders = () => {
  const [eventData, setEventData] = React.useState();  
  const [inputEventData, setInputEventData] = React.useState();
  const [selectDate, setSelectDate] = React.useState();
  const [eventList, setEventList] = React.useState();
  const [selectables, setSelectables] = React.useState(false);
  const loginData = useSelector( (state:RootState) => state.login.loginKey);
  const userData = useSelector((state:RootState) => state.userData.data);

  
  const dateClick = (info : any) => {   

    if(userData.usertype !== 'admin'){
      axios.get('/api/calendarData')
       .then(res => {
         setEventList(
           res.data.filter( (obj: { start: string; rrule:object  }) =>
            obj.rrule === undefined 
          ? obj.start ===  info.dateStr
          : obj.start.slice(5, 10) ===  info.dateStr.slice(5, 10)   
           ) 
         )
         res.data.filter( (obj: { start: string; rrule:object  }) =>
          obj.rrule === undefined 
          ? obj.start ===  info.dateStr
          : obj.start.slice(5, 10) ===  info.dateStr.slice(5, 10)
         ).length === 0 
         ? document.getElementsByClassName('ant-layout-content')[0].scrollTo(0,0)
         : document.getElementsByClassName('ant-layout-content')[0].scrollTo(0,document.getElementsByClassName('ant-layout-content')[0].clientHeight);
       })
  }

   
  }

  const select = (selectInfo : any) => {
    setSelectDate(selectInfo.startStr);
    const b = document.createElement('input');
    b.setAttribute('class', 'ant-input');
    b.style.width = '100%';
    b.style.height = '100%';
    if(selectables){
      setSelectables(!setSelectables)
      document.getElementsByClassName('fc-highlight')[0].appendChild(b)
    }
  }

  const addEvnet = () => {
   if(selectDate !== undefined){
    axios.post('/api/calendarData/',{
      title:inputEventData,
      start:selectDate,
  })
    .then(() =>{
      axios.get('/api/calendarData?access_token=' + loginData.id)
      .then(res => {
        setEventData({
          events:res.data
        })
      })
    })
  }else{
      alert("일정을 추가할 날짜를 선택해 주세요");
    }
  }

  React.useEffect(() => {  
    axios.get('/api/calendarData')
    .then(res => {
      setEventData({
        events:res.data
      })
    })
  },[]);
  

  const deleteEvent = (info: any) => {

    if(userData.usertype === 'admin'){
      for(let i = 0; i < eventData.events.length; i ++){
        if(eventData.events[i].rrule === undefined){
          if(eventData.events[i].id === info.event._def.publicId 
          && eventData.events[i].start === moment(info.event.start).format("YYYY-MM-DD")){
            axios.delete("/api/calendarData/" + info.event._def.publicId)
            setEventData({
              events:[
                ...eventData.events.slice(0, i),
                ...eventData.events.slice(i + 1, eventData.events.length)
              ]
            })
          }
        }
      }
    }else{

     axios.get('/api/calendarData')
      .then(res => {
        setEventList(
          res.data.filter( (obj: { start: string; rrule: object }) =>
          obj.rrule === undefined 
          ? obj.start ===  moment(info.event.start).format("YYYY-MM-DD")
          : obj.start.slice(5, 10) ===  moment(info.event.start).format("MM-DD")
          ) 
        )
        res.data.filter((obj: { start: string; rrule: object }) =>
        obj.rrule === undefined 
        ? obj.start ===  moment(info.event.start).format("YYYY-MM-DD")
        : obj.start.slice(5, 10) ===  moment(info.event.start).format("MM-DD")
        ).length === 0 
        ? document.getElementsByClassName('ant-layout-content')[0].scrollTo(0,0)
        : document.getElementsByClassName('ant-layout-content')[0].scrollTo(0,document.getElementsByClassName('ant-layout-content')[0].clientHeight);
      })
    }
  }


  const changeEventData = (e : any) => {
    setInputEventData(e.target.value)
  }

    return(
      <React.Fragment>
        <PageHeader 
          title="이달의 일정"
          style={{
            background: "#00d0ff5e",
          }}
        />
        <div>
          <Calendar 
            defaultView="dayGridMonth" 
            plugins={ [dayGridPlugin, interactionPlugin, RRuelPlugin] } 
            selectable={true} 
            longPressDelay={0}
            eventLongPressDelay={0}
            selectLongPressDelay={0}
            dateClick={dateClick}
            unselectAuto={selectables}
            locales={koLocale}
            locale='ko'
            header={{left:'prev', center:'title', right:'next'}}
            height={800}
            handleWindowResize={false}
            select={select}
            eventLimitText="개 더보기"
            eventLimit={true}
            eventClick={deleteEvent}
            views={
              {
                timeGird:{
                  eventLimit:4
                }
              }
            }
            eventSources={
              [
                {
                  ...eventData
                }
              ]
            }

          />
          {
            userData.usertype === 'admin' ? 
              <Form style={{textAlign:'center'}}>
                <Form.Item>
                  <Input id="inputData" style={{width:'60%', color:'white'}} onChange={changeEventData} autoFocus={true} />
                </Form.Item>
                <Form.Item>
                  <Button style={{width:'60%'}} block={true} onClick={addEvnet} > Add + </Button>
                </Form.Item>
              </Form>
            : eventList !==undefined 
            ? <EventList eventList={eventList}/> 
            :''
          } 
        </div>
      </React.Fragment>
    )
}

export default React.memo(Calenders);



