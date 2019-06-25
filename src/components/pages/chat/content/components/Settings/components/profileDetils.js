import React, { Component } from 'react';
import axios from 'axios';

import ApiUrl from './../../../../../../../ApiUrl.json';


class ProfileDetils extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filds: {
                name: '',
                lastname: '',
                bio: '',
            },
            wating: false,
        };
        this.handelChangeInputs = this.handelChangeInputs.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }


    handelChangeInputs(event) {
        let target = event.target;
        let fildValue = this.state.filds;
        fildValue[target.name] = target.value;
        this.setState({
            filds: fildValue
        });

        // console.log(this.state);
    }

    handelSubmit(event) {
        event.preventDefault();
        this.setState({
            wating : true
        });

        const { name, lastname, bio } = this.state.filds;

        let data = new FormData();
        data.append('_method', 'PUT');
        if (name !== '') {
            data.append('name', name);
        }
        if (lastname !== '') {
            data.append('lastname', lastname);
        }
        if (bio !== '') {
            data.append('bio', bio);
        }
        

        const user_key = this.props.user.user_key;
        const token = localStorage.getItem('api_token');
        if (token != null) {
            const url = ApiUrl.Url;
            const instance = axios.create({
                baseURL: url,
                headers: { Authorization: 'Bearer '+token }
            });
            instance.post('/Auth/'+user_key, data).then(response => {
                console.log(response);
                if (response.data.status === 'ok') {
                    this.setState({
                        wating : false
                    });
                    this.props.handelLogin();
                    
                }
            }).catch(error => {
                console.log(error);
                this.setState({
                    wating : false
                });
            })

        }


    }

    render() {
        const { user } = this.props;
        let { filds, wating } = this.state;

        return (
            <div>
                <h4 className="font-md font-600">اطلاعات خود را ویرایش کنید : </h4>

                <form onSubmit={this.handelSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" >نام : </label>
                        <input type="text" id="name" onChange={this.handelChangeInputs} name="name" value={filds.name} placeholder={user.name} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname" >نام خوانوادگی : </label>
                        <input type="text" id="lastname" onChange={this.handelChangeInputs} name="lastname" value={filds.lastname} placeholder={user.lastname} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio" >متن بیو : </label>
                        <input type="text" id="bio" onChange={this.handelChangeInputs} name="bio" value={filds.bio} placeholder={(user.bio != null) ? user.bio : 'یک متن برای بیو خود وارد کنید !'} className="form-control" />
                    </div>

                    <div className="form-group margin-top-40">
                        <button type="submit" className={['btn success-light',wating ? '' : 'btn-base'].join(' ')}>
                            {
                                wating ? (
                                    <div id="loading">
                                        <div className="sk-fading-circle">
                                            <div className="sk-circle1 sk-circle"></div>
                                            <div className="sk-circle2 sk-circle"></div>
                                            <div className="sk-circle3 sk-circle"></div>
                                            <div className="sk-circle4 sk-circle"></div>
                                            <div className="sk-circle5 sk-circle"></div>
                                            <div className="sk-circle6 sk-circle"></div>
                                            <div className="sk-circle7 sk-circle"></div>
                                            <div className="sk-circle8 sk-circle"></div>
                                            <div className="sk-circle9 sk-circle"></div>
                                            <div className="sk-circle10 sk-circle"></div>
                                            <div className="sk-circle11 sk-circle"></div>
                                            <div className="sk-circle12 sk-circle"></div>
                                        </div>
                                        <span className="margin-right-30"> لطفا کمی صبر نمایید </span>
                                    </div>
                                ) : (
                                        <span> ذخیره تغییرات </span>
                                    )
                            }


                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ProfileDetils;