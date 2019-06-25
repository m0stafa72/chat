import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from './../../../../../../ApiUrl.json';


class Profiles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            out_user : {
                name : '',
                lastname : '',
                avatar : '',

            },
            
        }
    }
    

    componentDidMount() {
        const {chat,user} = this.props ;
        let otherUserId = 0;

        if (chat.user1 === user.id ) {
            otherUserId = chat.user2;
        }else if (chat.user2 === user.id) {
            otherUserId = chat.user1;
        }

        const token = localStorage.getItem('api_token');
        if (token !== null) {
            const url = ApiUrl.Url;
            const instance = axios.create({
                baseURL : url,
                headers : { Authorization : 'Bearer '+token },
            });
            instance.post('/getUser/'+otherUserId).then(response => {
                // console.log(response);
                this.setState({
                    out_user : {
                        name : response.data.user.name,
                        lastname : response.data.user.lastname,
                        avatar : response.data.user.avatar,
                    }
                });
            }).catch(error => {
                console.log(error);
            })

        } 
        

        // console.log(otherUserId);

    }
    
    render() {
        const {out_user} = this.state ;
        const {chat} = this.props;
        return (
            <div className="profile">

                <div className="profile-img">
                    <img src={out_user.avatar} className="img-sm" alt={out_user.name} />
                    <span className="circled success">
                        <i className="fa fa-circle"></i>
                    </span>
                </div>
                <div className="profile-detial margin-right-20 margin-top-10 white" >
                    <strong className="font-sm">{ out_user.name +' '+ out_user.lastname } </strong>
                    <p className="font-xs font-gray"> { chat.latest_comment.text } </p>

                    <span className="time">5 دقیقه پیش </span>
                </div>
            </div>
            
        );
    }
}

export default Profiles;