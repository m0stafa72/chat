import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from './../../../../../../ApiUrl.json';

import Items from './items';
import Profiles from './Profiles';

class Talks extends Component {
    
    constructor(props) {
        super(props);
        this.state={
            chats : [],
            wating : true,
        }
    }

    componentDidMount() {
        
        const token = localStorage.getItem('api_token');
        if (token !== null) {
            const url = ApiUrl.Url;
            const user_key = this.props.user.user_key;
            const instance = axios.create({
                baseURL : url,
                headers : { 'Authorization' : 'Bearer '+token },
            });
            instance.get('/chats/'+user_key).then(response => {
                // console.log(response);
                this.setState({
                    chats : response.data.chats,
                });
            }).catch(error => {
                console.log(error);
            });
        }
        setTimeout(() => {
            this.setState({
                wating : false
            });
        },1500);
        
    }
    

    render() {
        
        // console.log(this.state.chats);
        const {chats} = this.state;
        const {user} = this.props;

        return (
            <div className="talks margin-tb-20">
                <div className="search form-group padding-rl-10" >
                    <input name="search" className="form-control" type="text" placeholder="جستجو در گفتگو ها " />
                </div>
                
                <div className="text-center margin-top-30" style={(this.state.wating === false ) ? {'display' : 'none'} : {'display' : 'block'} }>
                    <div id="loading">
                        <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    </div>
                </div>
            
                <ul className="padding-top-5" style={(this.state.wating) ? {'opacity' : '0'} : {'opacity' : '1'} }>
                    {
                        (chats.length === 0 ) ? ( 
                            <div className="text-center font-sm-2 white margin-top-20">
                                <p>هیچ گفتگویی یافت نشد .</p>
                                <p>میتوانید از بخش افراد ،  گفتگو ایجاد نمایید .</p>
                            </div>
                         ) : (
                            chats.map((chat , index) => (
                                <Items to={'/Chat/Talks/'+chat.chat_key} key={index} >
                                    <Profiles user={user} chat={chat} />
                                </Items> 
                                
                            ))
                         )
                        
                    }
                </ul>
                
            </div>
        );
    }
}

export default Talks;