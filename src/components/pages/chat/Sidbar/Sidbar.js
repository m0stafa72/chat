import React, { Component } from 'react';
import {Route} from 'react-router-dom';


import UserProfile from './components/UserProfile';
import TopLinks from './components/TopLinks/TopLinks';

import TalksSidbar from './components/talks/chatItems';
import UsersSidbar from './components/Users/Users';

import SettingSidbar from './components/setting/SettingSidbar';


class Sidbar extends Component {
    
   
   
    render() {
        const {user,LogOut} = this.props;
        

        return (
            
            <div className="sidbar padding-tb-20">
                {/* Main user information profile from './components/UserProfile' */}
                <UserProfile  user={user} />
                {/* Main user information profile */}
                <div className="clearfix"></div>
                <hr className=" margin-tb-20"/>
                
                {/* List Of top Links in Sidbar from './components/TopLinks/TopLinks'*/}
                <TopLinks LogOut={LogOut} />
                {/* List Of top Links in Sidbar */}
                
                <div className="sidbar-contents"> 
                    

                    {/* <Talks /> */}
                    <Route path="/Chat" exact render={ props => <TalksSidbar {...props} user={user} /> } />
                    <Route path="/Chat/Talks" render={ props => <TalksSidbar {...props} user={user} /> } />

                    <Route path="/Chat/users" render={props => <UsersSidbar {...props} myKey={user.user_key} />} />
                    
                    <Route path="/Chat/setting" component={SettingSidbar} />
                </div>

            </div>
            
        );
    }
}

export default Sidbar;