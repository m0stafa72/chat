import React, { Component } from 'react';
import moment from 'jalali-moment';


class PmBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatar : '',
            position : '',
            out_user : this.props.out_user,
            in_user : this.props.in_user,
            message : this.props.message,

        };
        this.handelMessages = this.handelMessages.bind(this);
    }
    
    componentDidMount() {
        
       this.handelMessages();

    }


    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                out_user : nextProps.out_user,
                in_user : nextProps.in_user,
                message : nextProps.message,
            },
            function () {
                this.handelMessages();
            }
        );
    }

    handelMessages() {

        const {out_user,in_user,message} = this.state;

        if (message.user_id === in_user.id) {
            this.setState({
               position : 'in',
               avatar : in_user.avatar,
            });
        }else if (message.user_id === out_user.id) {
            this.setState({
                position : 'out',
                avatar : out_user.avatar,
            });
        }

    }
    
    

    render() {
        
        const {position,avatar} = this.state;
        const {message} = this.props;

        return (
            <div className={['col-sm-12  margin-top-15', position].join(' ')} 
                    >
                <div className="wrap-ut">
                    {
                        (position === 'in') ? ('') : (
                            <div className="userinfo">
                                <div className="  img-sm">
                                    <img alt="dsfdg" src={avatar} className="rounded img-sm " />
                                </div>
                            </div>
                        )
                    }
                    
                    <div className="posttext text-right rounded-5">
                        <span className="alert no-padding">{message.text} </span>
                    </div>
                    <small className=" time"><i className="fa fa-clock-o "></i> { moment(message.created_at, 'YYYY/MM/DD HH:mm:ss').locale('fa').format('YYYY/MM/DD HH:mm:ss') }</small>
                </div>
            </div>
        );
    }
}

export default PmBox;