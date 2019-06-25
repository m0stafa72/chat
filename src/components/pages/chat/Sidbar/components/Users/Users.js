import React, { Component } from 'react';

import axios from 'axios';

import ApiUrl from './../../../../../../ApiUrl.json';

import UserList from './userList';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users : [],
            faild : [],
            listIsNull : false,
            search_loading : false,
        };
        this.OnChangeSearchInput = this.OnChangeSearchInput.bind(this);
    }

    OnChangeSearchInput(event) {
        let target = event.target;
        let faildValue = this.state.faild;
            faildValue[target.name] = target.value;
            
        this.setState({
            faild : faildValue,
            search_loading : true,
        });
        
            let data = this.state.faild["search"];
            if(data.length.toString() > 2 ){
                let dataForm = new FormData();
                    dataForm.append('search',data);
                const url = ApiUrl.Url;
                const myKey = this.props.myKey;

                const token = localStorage.getItem('api_token');

                const instance = axios.create({
                    baseURL : url,
                    headers : { 'Authorization' : 'Bearer '+token }
                });
                instance.post('/getUsers/'+myKey,dataForm).then(response => {
                    // console.log(response);
                    if (response.data.users.length === 0) {
                        this.setState({
                            listIsNull : true,
                        });
                    }else {
                        this.setState({
                            users : [  ...response.data.users ],
                            search_loading : false,
                            listIsNull : false,
                        });
                    }
                    
                }).catch(error => {
                    console.log(error);
                    this.setState({
                        
                        search_loading : false,
                    });
                });

            }

       
        

        
    }

    

    render() {
        const { users , search_loading,listIsNull } = this.state;
        // console.log(users);
        return (
            <div className="talks margin-tb-20">
                <div className="search form-group padding-rl-10" >
                    
                    <input onChange={this.OnChangeSearchInput} name="search" className="form-control" type="text" placeholder="جستجو بر اساس نام کاربری ...  " />
                    {
                        search_loading ? (
                            <div id="loading-search">
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
                            </div>
                        ) : (null)
                    }
                    
                </div>

                <p className="white padding-10">برای جستجوی افراد ، ایمیل فرد موردنظرتان را وارد نمایید .</p>

                

                <ul className="padding-top-5">
                    {
                        listIsNull ? (
                            <p className="text-center font-sm-2 white">موردی یافت نشد دوباره تلاش نمایید .!</p>
                        ) : (
                            users.map((user , index) => <UserList user={user} key={index} /> ) 
                        )
                    }
                    
                    

                </ul>
            </div>
        );
    }
}

export default Users;