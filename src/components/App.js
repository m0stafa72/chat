import React, { Component } from 'react';
import { Switch } from 'react-router-dom';


import Axios from 'axios';
import LoadingBar from "react-top-loading-bar";

// styles
import './../assets/css/lib/bootstrap.min.css';
import './../assets/css/font-awesome.min.css';
import './../assets/css/style.css';
// styles
import ApiUrl from './../ApiUrl.json';

import NotPrivateRoute from './NotPrivateRoute';

import Login from './pages/auth/Login'; 
import Auth from './pages/auth/Auth';


import Chat from './pages/chat/Chat';
import PrivateRoute from './PrivateRoute';


class App extends Component {
    

    constructor(props) {
        super(props);


        this.state = {
            isAuth : false,
            user : {
                id : '',
                name : '',
                bio : '',
                lastname : '',
                email : '',
                active : 0,
                user_key : '',
                avatar : '',
            },
            loadingBarProgress: 0,
            isLoading : true,
        };
        this.handelLogin = this.handelLogin.bind(this);
        this.checkForLogin = this.checkForLogin.bind(this);
        this.LoadingApp = this.LoadingApp.bind(this);
        this.handelLogOut = this.handelLogOut.bind(this);


        
    }
    add = value => {
        this.setState({
          loadingBarProgress: this.state.loadingBarProgress + value
        })
      }
      complete = () => {
        this.setState({ loadingBarProgress: 100 })
      }
      onLoaderFinished = () => {
        this.setState({ loadingBarProgress: 0 })
      }

    
    componentDidMount() {
        
        this.handelLogin();
        this.LoadingApp();
       
        
        
    }
  
    LoadingApp() {

        setTimeout(() => {
            this.setState({
               isLoading : false,
            });
        }, 1500);
    }
    
    checkForLogin (){
       
        this.handelLogin();
    }
    
    handelLogin(){
        const token = localStorage.getItem('api_token');

        if(token !== null ){
            const Url = ApiUrl.Url;

            const instance = Axios.create({
                baseURL: Url,
                headers: {'Authorization': 'Bearer '+token}
              });
            instance.post('/auth/me').then(response => {
                // console.log(response);
                
                this.setState({
                    
                    user : {
                        id : response.data.id,
                        name : response.data.name,
                        lastname : response.data.lastname,
                        bio : response.data.bio,
                        email : response.data.email,
                        active : response.data.active,
                        user_key : response.data.user_key,
                        avatar : response.data.avatar,
                    },
                    isAuth : true,
                    isLoading : true,
                    
                });

               
                
                // console.log(this.state.user);
                
            }).catch(error => {
                console.log(error);
                localStorage.removeItem('api_token');

                this.setState({
                    isAuth : false,
                    user : {
                        id : '',
                        name : '',
                        lastname : '',
                        email : '',
                        active : 0,
                    },
                });

               
            });
        }
        this.LoadingApp();
    }

    handelLogOut () {

        const token = localStorage.getItem('api_token');

        if (token !== null ) {
            const {Url} = ApiUrl;
            const instance = Axios.create({
                baseURL : Url,
                headers : {
                    Authorization : 'Bearer '+token,
                }
            });
            instance.post('/auth/logout').then(response => {
                // console.log(response);
                localStorage.removeItem('api_token');
                this.setState({
                    isAuth : false,
                    user : {
                        id : '',
                        name : '',
                        lastname : '',
                        email : '',
                        active : 0,
                    },
                });
                
            }).catch(error => {
                console.log(error);
            });

        }
    }

    render() {
        
        return (
            <div>
                <LoadingBar
                    progress={this.state.loadingBarProgress}
                    height={3}
                    color="red"
                    onLoaderFinished={() => this.onLoaderFinished()}
                />
                {
                    this.state.isLoading ? (
                        <div id="app-loading">
                            <div id="loading">
                                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                            </div>
                        </div>
                    ) : (
                        <div id="app">
                            <Switch>
                                <NotPrivateRoute path="/" exact component={Login} isAuth={this.state.isAuth} login={this.checkForLogin} />

                                <NotPrivateRoute path="/Register" component={Auth} isActive={this.state.user.active} login={this.checkForLogin} isAuth={this.state.isAuth} user={this.state.user}/>

                                <PrivateRoute path="/Chat" component={Chat} user={this.state.user} isAuth={this.state.isAuth} isActive={this.state.user.active} handelLogin={this.handelLogin} LogOut={this.handelLogOut} />
                                {/* <Route path="/Chat" component={Chat} /> */}

                                {/* <Route component={Chat}/> */}
                            </Switch>
                        </div>
                    )
                }
                
                

            </div>
        );
    }
}

export default App;