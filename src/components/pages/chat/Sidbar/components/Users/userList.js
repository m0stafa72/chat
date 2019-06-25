import React, { Component } from 'react';
import {Route, Link } from 'react-router-dom';


class userList extends Component {
    render() {
        const {user} = this.props;
        // console.log(this.props);
        
        return (
            <Route path={'/Chat/users/'+user.user_key} children={({match}) => (

                <li className={["talks-item ",match ? 'active' : ''].join(' ')}>
                    <Link to={'/Chat/users/'+user.user_key}>
                        <div className="profile">
                            <div className="profile-img">
                                <img src={user.avatar} className="img-sm" alt={user.name} />
                                <span className="circled success">
                                    <i className="fa fa-circle"></i>
                                </span>
                            </div>
                            <div className="profile-detial margin-right-20 margin-top-10 white" >
                                <strong className="font-sm">{user.name + ' ' + user.lastname} </strong>
                                <p className="font-xs font-gray">متن بیو ی این کاربر </p>

                                <span className="time">1 دقیقه پیش</span>
                            </div>
                        </div>
                    </Link>
                </li>

            )} />

            
        );
    }
}

export default userList;