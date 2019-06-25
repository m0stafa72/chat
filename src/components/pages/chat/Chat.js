import React, { Component } from 'react';
import {connect} from './../../ConnectIo';


import Sidbar from './Sidbar/Sidbar';
import Content from './content/Content';



class Chat extends Component {
    
    constructor(props) {
        super(props);

        connect(this.props.isAuth,this.props.user.user_key);
    };


    render() {
        const {user,handelLogin,LogOut} = this.props;
        
        return (
            <div className="container-fluid">
                <div className="row chat">

                    <Sidbar user={user}  LogOut={LogOut}/>
                                       
                    <Content handelLogin={handelLogin} user={user} />
                </div>
            </div>
        );
    }
}

export default Chat;