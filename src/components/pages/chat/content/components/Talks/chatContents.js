import React, { Component } from 'react';
import myDate from 'current-date';

import axios from 'axios';
import ApiUrl from './../../../../../../ApiUrl.json';

import PmBox from './PmBox';
import MessageForm from './MessageForm.js';

class Talks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_key: '',
            in_user: this.props.user.id,
            out_user : {
                key : '',
                id : '',
                name : '',
                lastname : '',
                avatar : '',
                bio : '',
            },
            messages : [],
            wating: true,
            
            
        };
        this.getMessages = this.getMessages.bind(this);
        this.pushMessage = this.pushMessage.bind(this);
    }

    componentDidMount() {

        const params = this.props.match.params ; 

        if (params.token != null ) {
            this.setState(
                    {
                    chat_key: params.token,
                    },
                    function () {
                        // console.log (this.state);
                        this.getMessages();
                    }
                );
        }else if (params.user_key != null) {
            this.setState(
                    {
                    out_user : {
                        key : params.user_key
                    },},
                    function () {
                        // console.log (this.state);
                        this.getMessages();
                    }
                );
        }
        
        

        this.scrollToBottom();
        

    }
    componentDidUpdate(){
        this.scrollToBottom();
    }

    componentWillReceiveProps(nextProps) {

        const next = nextProps.match.params;

        if (next.token != null ) {
            if (next.token !== this.state.chat_key) {
                this.setState(
                    {
                    chat_key: next.token,
                    },
                    function () {
                        // console.log (this.state);
                        this.getMessages();
                    }
                );
            }
        } else if (next.user_key != null ) {
            if (next.user_key !== this.state.out_user.key) {
                this.setState(
                    {
                    out_user : {
                        key : next.user_key
                    },},
                    function () {
                        // console.log (this.state);
                        this.getMessages();
                    }
                );
            }
            
        }

        
    }

    getMessages() {



        const token = localStorage.getItem('api_token');
        if (token !== null) {


            let { chat_key, in_user, } = this.state;
            const out_user_key = this.state.out_user.key;
            

            let data = new FormData();
            data.append('chat_key', chat_key);
            data.append('in_user_id', in_user);
            data.append('out_user_key', out_user_key);

            const url = ApiUrl.Url;
            const instace = axios.create({
                baseURL: url,
                headers: { 'Authorization': 'Bearer ' + token },
            });
            instace.post('/getMessages', data).then(response => {
                // console.log(response);
                this.setState({
                    wating : false,
                    out_user : {
                        id : response.data.out_user.id,
                        name : response.data.out_user.name,
                        lastname : response.data.out_user.lastname,
                        avatar : response.data.out_user.avatar,
                        bio : response.data.out_user.bio,
                    },
                    messages : response.data.messages,
                });
            }).catch(error => {
                console.log(error);
            });
        }

    }

    pushMessage(text) {
        
        const date = myDate();
        // console.log(date);
        const message = {
            user_id : this.state.in_user,
            text : text,
            created_at : date,
        };
        this.setState(prevState  => ({
            messages : [...prevState.messages , message]
        }));
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
      }


    render() {
        const {user} = this.props;
        const {out_user,messages,chat_key,in_user} = this.state;
        // console.log(out_user.bio);

        return (
            <div className="content-chat">

                <div className="loading" style={ (!this.state.wating) ? { 'display' : 'none' } : { 'direction' : 'block' } }>
                    <div className="lds-roller">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                        
                    </div>
                    <span>لطفا کمی صبر نمایید ...</span>
                </div>

                <div className="panel chat-panel">
                    <div className="panel-heading">
                        <div className="user-profile">
                            <img src={out_user.avatar}
                                className="img-md" alt={out_user.name +' '+out_user.lastname} />
                            <div className="user-detail margin-right-20 margin-top-15">
                                <strong className="dis-blok">{out_user.name +' '+out_user.lastname}</strong>
                                <small className="dis-blok">{(out_user.bio !== null ) ? out_user.bio : 'این کاربر متنی برای بیو خود وارد نکرده است ...'}</small>
                            </div>
                        </div>
                    </div>

                    <div className="panel-body">
                        <div className="post">
                            <article className="row ">
                                {
                                    (messages.length === 0) ? (
                                        <div className="no-msg text-center font-sm">
                                            <p><i className="fa fa-times"></i> هنوز گفتگویی ایجاد نشده است .</p>
                                            <p>برای شروع گفتگو ، در فیلد پایین پیام خود را بنویسید ...</p>
                                        </div>
                                    ) : (
                                        messages.map((message , index) => (
                                            <PmBox  key={index} 
                                                    in_user={user} 
                                                    out_user={out_user} 
                                                    message={message}
                                                    
                                                />
                                        ))
                                    )        
                                }
                                
                                
                            </article>
                            <div className="margin-top-30" style={{ float:"left", clear: "both",'visibility' : 'hidden' }}
                                ref={(el) => { this.messagesEnd = el; }}>
                            </div>

                        </div>
                    </div>
                    <div className="panel-footer bg-white">
                        <MessageForm pushMessage={this.pushMessage} 
                                     sendLoading={this.sendLoading} 
                                     chat_key={chat_key} 
                                     in_user_id={in_user} 
                                     out_user_id={out_user.id} 
                                />
                    </div>

                </div>
            </div>

        );
    }
}

export default Talks;