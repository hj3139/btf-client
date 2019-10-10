import * as React from 'react';
import Header from './Header';

const Home = () =>{
    return(
        <React.Fragment>
            <div style={{width:'100%', height:'100%', background:'white'}} >
                <Header />
                홈임
            </div>
        </React.Fragment>
    )
}

export default Home;