import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import './../../../assets/css/auth/auth.min.css';
import Validator from 'validator';
import Axios from 'axios';

import ApiUrl from './../../../ApiUrl.json';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fialds : {
                email : '',
                password : '',
            },
            wating : false,
            errors : {},
        }
        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
        this.handelValidator = this.handelValidator.bind(this);
    }
    
    handelChange(event) {
        // console.log(event);
        let target = event.target;

        let fialdValues = this.state.fialds;
            fialdValues[target.name] = target.value; 
        this.setState({
            fialds : fialdValues,
        });
    }

    handelValidator (){
        let validate = true;

        let errors = this.state.errors;
        const { email , password } = this.state.fialds;

        if (! Validator.isEmail(email)) {
            validate = false;
            errors["email"] = 'فرمت ایمیل وارد شده صحیص نمی باشد .';
        }else if (Validator.isEmpty(email)) {
            validate = false;
            errors["email"] = ' مقدار فیلد ایمیل نباید خالی باشد ';
        }
        if (Validator.isEmpty(password)) {
            validate = false;
            errors["password"] = ' مقدار فیلد رمز عبور نباید خالی باشد  ';
        }
        this.setState({
            errors : errors,
        });
        return validate;
    }
    
    handelSubmit(event) {
        event.preventDefault();
        this.setState({
            wating :  true,
        });

        if (this.handelValidator()) {
            const {Url} = ApiUrl;
            const { email , password } = this.state.fialds;

            let data = new FormData();
                data.append('email' , email);
                data.append('password',password);
            Axios.post(Url+'/auth/login',data).then(response => {
                // console.log(response);
                localStorage.setItem('api_token',response.data.access_token);
                this.props.login();
                // console.log(this.props);
                this.setState({
                    wating : false,
                });
            }).catch(error => {
                console.log(error);
                let errors = this.state.errors;
                 errors["connection"] = 'خطا در اتصال به سرور ! لطفا اتصال اینترنت خود را بررسی نمایید و صفحه را یکبار رفرش  کنید و دوباره تلاش نمایید .';
                this.setState({
                    errors : errors,
                    wating : false,
                });
            });
        }else {
            this.setState({
                wating : false,
            });
        }

    }

    render() {


        const {email,password} = this.state.fialds;
        const {wating} = this.state;
        const {errors} = this.state;

        if (this.props.isAuth) {
            return <Redirect to="/Register/Configuration" />
        }else{

            return (
                <div className="start">
                    <div className="layout">
                        <div className="main order-md-1">
                            <div className="start">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="content">
                                            <h1>ورود به اپلیکیشن</h1>
                                            <div className="third-party">
                                                <button className="btn item bg-blue">
                                                    <i className="fa fa-facebook"></i>
                                                </button>
                                                <button className="btn item bg-teal">
                                                    <i className="fa fa-google"></i>
                                                </button>
                                                <button className="btn item bg-purple">
                                                    <i className="fa fa-twitter"></i>
                                                </button>
                                            </div>
                                            <p>یا ورود با استفاده از اطلاعات کاربر :</p>
                                            <form onSubmit={this.handelSubmit}>
                                                <div className={['form-group text-right', errors.email ? 'has-error' : ''].join(' ')}>
                                                    <input type="email" id="inputEmail" name="email" onChange={this.handelChange} value={email} className="form-control" placeholder="آدرس ایمیل ... " />
                                                    <label className=" icon"><i className="fa fa-envelope-open"></i></label>
                                                    {
                                                        errors.email ? (
                                                            <span className="red">{ errors.email }</span>
                                                        ) : (null)
                                                    }
                                                </div>
                                                <div className={['form-group text-right', errors.email ? 'has-error' : ''].join(' ')}>
                                                    <input type="password" id="inputPassword" name="password" onChange={this.handelChange} value={password} className="form-control" placeholder="رمز عبور ..." />
                                                    <label className=" icon"><i className="fa fa-lock"></i></label>
                                                    {
                                                        errors.email ? (
                                                            <span className="red">{ errors.password }</span>
                                                        ) : (null)
                                                    }
                                                </div>
                                                <button type="submit" className={['btn ' , wating ? 'danger-light disabled' : 'btn-base success-light'].join(' ')}  > 
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
                                                            <span>  ورود به برنامه</span>
                                                        )
                                                    }
                                                </button>
                                                
                                                {
                                                    errors.connection ? (
                                                        <div class="alert alert-danger margin-tb-20" role="alert">{ errors.connection }</div>
                                                    ) : (null)
                                                }
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="aside order-md-2">
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="preference">
                                        <h2>سلام ،دوست من !</h2>
                                        <p>در برنامه ثبتنام کن و با دوستان گفتگو کن .</p>
                                        <Link to="/Register" className="btn btn-base danger-light">
                                        ثبتنام در برنامه 
                                            
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            );
        }
    }
}

export default Login;