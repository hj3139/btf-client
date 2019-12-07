const USERDATA = 'USERDATA';

interface IUserDataState {
    data:any,
}
const initialState: IUserDataState = {
    data:{},
}



export const userDataFc = (data:any) => (
    {
        type: USERDATA,
        data
    }
)

const userData = (state = initialState, action: any) => {
    switch(action.type){
      case USERDATA :
          return{
              data : action.data
          }
        default:
            return state;
    }
}

export default userData;
