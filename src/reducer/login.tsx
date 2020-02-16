

const LOGINKEY = 'LOGINKEY';


interface ILoginKeyState {
    loginKey:any,
}


export const loginKeyFc = (loginKey: any) => (
    {
        type:LOGINKEY,
        loginKey
    }
)



const initialState: ILoginKeyState = {
    loginKey:'',
}

const login = (state = initialState, action: any) => {
    switch(action.type){
      case LOGINKEY :
          return{
              loginKey : action.loginKey
          }
        default:
            return state;
    }
}

export default login;
