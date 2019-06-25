import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Register from './Register';
// import Configuration from './Configuration';
// import UploadAvatar from './UploadAvatar';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regIsSuccess : false,
        };

    }

    
    
    render() {

    //    console.log(isAuth);
        return (
            <div>
                <Route path="/Register/" exact render={props => <Register { ...props } getLogin={this.props.login} />} />

                {/* <Route path="/Register/Configuration" component={Configuration} />
                <Route path="/Register/Continue"  component={UploadAvatar} /> */}
            </div>
        );
        
    }
}

export default Auth;