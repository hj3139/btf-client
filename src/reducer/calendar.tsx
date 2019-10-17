import axios from 'axios';

const CALENDARDATA_INPUT = 'CALENDARDATA_INPUT';
const CALENDARDATA_DELETE = 'CALENDARDATA_DELETE';

export const inputdata = (title: string, start: string) => (
    {
        type:CALENDARDATA_INPUT,
        title,
        start
    }
)

export const deletedata = (title: string, start: string) => (
    {
        type:CALENDARDATA_DELETE,
        title,
        start
    }
)

const initialState = {}

const calendar = (state = initialState, action: any) => {
    switch(action.type){
        case CALENDARDATA_INPUT:
                axios.post('/api/calendarData/',{
                    title:action.title,
                    start:action.start
                })
                .then(res => {
                    console.log(res);
                })
            return {
                title:action.title,
                start:action.start
            } 
        case CALENDARDATA_DELETE:
            return{
                ...state,
                events:[]
            };
        default:
            return state;
    }
}

export default calendar;
