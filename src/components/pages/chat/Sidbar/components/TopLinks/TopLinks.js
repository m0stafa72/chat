import React, { Component } from 'react';

import List from './List';

class TopLinks extends Component {
    render() {
        return (
            <div className="chat-items margin-top-30 padding-rl-20">

                <ul>
                    <List toActive="/Chat/Talks*" link="/Chat/Talks" isExact={true}>
                        <i className="fa fa-comment"></i>
                        <small>گفتگوها</small>
                    </List>
                    <List toActive="/Chat/users" link="/Chat/users">
                        <i className="fa fa-users"></i>
                        <small>افراد</small>
                    </List>
                    
                    <List toActive="/Chat/setting" link="/Chat/setting">
                        <i className="fa fa-cogs"></i>
                        <small>تنظیمات</small>
                    </List>

                    <li >
                        <button onClick={this.props.LogOut}>
                            <i className="fa fa-power-off"></i>
                            <small>خروج</small>
                        </button>
                    </li>
                    
                </ul>
            </div>
        );
    }
}

export default TopLinks;