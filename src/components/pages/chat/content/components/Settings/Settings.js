import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import UserProfile from '../../../Sidbar/components/UserProfile';

import ProfileDetils from './components/profileDetils';
import Avatar from './components/Avatar';
import ChangePass from './components/ChangePass';

class Settings extends Component {

    

    render() {
        
        const {user,handelLogin} = this.props;

        return (
            <div className="settings">
                <UserProfile  user={user} />

                <hr />

                <div className="margin-top-30">
                    
                    
                    <Route path="/Chat/setting" exact render={ props => <ProfileDetils {...props} user={user} handelLogin={handelLogin} /> } />

                    <Route path="/Chat/setting/avatar" render={ props => <Avatar {...props} user={user} handelLogin={handelLogin} /> } />

                    <Route path="/Chat/setting/password" render={ props => <ChangePass {...props} /> } /> 
                </div>
            </div>
        );
    }
}

export default Settings;