import React, { Component } from 'react';


class UserProfile extends Component {
 
    render() {
        // console.log(this.props);
        const {user} = this.props;
        return (
            <div className="profile padding-rl-20 ">
                <div className="profile-img">
                    <img src={user.avatar}
                        className="img-sm" alt={user.name +' '+ user.lastname } />
                    <span className="circled success">
                        <i className="fa fa-circle"></i>
                    </span>
                </div>
                <div className="profile-detial margin-right-30 margin-top-10 white" >
                    <strong className="font-sm-2">{user.name +' '+ user.lastname }</strong>
                    <p className="font-xs font-gray">{(user.bio != null) ? user.bio : 'یک متن برای بیو خود وارد کنید !'}</p>
                </div>
            </div>
        );
    }
}

export default UserProfile;