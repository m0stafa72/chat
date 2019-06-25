import React, { Component } from 'react';
import axios from 'axios';
import ApiUrl from './../../../../../../ApiUrl.json';


class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chat_key : this.props.chat_key,
            in_user_id : this.props.in_user_id,
            input : '',
        };
        this.handelInputMessage = this.handelInputMessage.bind(this);
        this.handelSubmitMessage = this.handelSubmitMessage.bind(this);
    }

    handelInputMessage (event) {
        const target = event.target;
        let input = target.value;
        // console.log(input);
        this.setState({
            input : input,
        });
    }

    handelSubmitMessage(event) {
        event.preventDefault();
       

        const token = localStorage.getItem('api_token');
        if (token !== null ) {

            const url = ApiUrl.Url;
            const {input , chat_key , in_user_id} = this.state;

            if (input !== null ) {

                this.props.pushMessage(input);
                
                const data = new FormData();
                    data.append('message',input);
                    data.append('chat_key',chat_key);
                    data.append('in_user_id',in_user_id);
                    data.append('out_user_id',this.props.out_user_id);

                const instance = axios.create({
                    baseURL : url,
                    headers : { 'Authorization' : 'Bearer '+token }
                });
                instance.post('/chats',data).then(response => {
                        // console.log(response);
                        this.setState({
                            input : '',
                        });
                    }).catch(error => {
                        console.log(error);
                    });

            }
            

        }
        

    }
    
    render() {
        const {input} = this.state;
        return (
            <form onSubmit={this.handelSubmitMessage} >
                <button type="submit" className="btn success-light"><i className="fa fa-paper-plane"></i></button>
                <input type="text" value={input} onChange={this.handelInputMessage} className="form-control" placeholder="متن پیام خود را  بنویسید ..." />
            </form>
        );
    }
}

export default MessageForm;