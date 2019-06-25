import React, { Component } from 'react';
import {Route} from 'react-router-dom';

// import axios from 'axios';
// import ApiUrl from './../../../../ApiUrl.json';


import GetStart from './components/GetStart/GetStart';
import ChatContents from './components/Talks/chatContents';

import Settings from './components/Settings/Settings';


class Content extends Component {

    
    
    render() {
        // console.log(this.props.user);
        const {user,handelLogin} = this.props;

        return (
            <div className="content" id="content">
                
                
                <Route path="/Chat" exact component={GetStart} />

                
                <Route path="/Chat/Talks" exact  component={GetStart} />
                <Route path="/Chat/Talks/:token" render = { props => <ChatContents {...props} user={user} /> } />

                <Route path="/Chat/users" exact component={GetStart} />
                <Route path="/Chat/users/:user_key"  render = { props => <ChatContents {...props} user={user} /> }  />

                <Route path="/Chat/setting" render = { props => <Settings {...props} user={user} handelLogin={handelLogin}  /> } />

            </div>
        );
    }
}

export default Content;