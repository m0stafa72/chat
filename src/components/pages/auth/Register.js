import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Validator from 'validator';
import Axios from 'axios';

import './../../../assets/css/auth/auth.min.css';
import ApiUrl from './../../../ApiUrl.json';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fialds : {
                name : '',
                lastname : '',
                email : '',
                password : '',
            } ,
            errors : {},
            wating : false,
        }

        this.handelChange = this.handelChange.bind(this);
        this.handelValidator = this.handelValidator.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    }

    handelChange(event) {
        // console.log(event);
        let target = event.target;
        let fialdsValue = this.state.fialds;
            fialdsValue[target.name] = target.value;

        this.setState({
            fialds : fialdsValue,
        });

        // console.log(this.state.fialds);
    }

    handelValidator() {
        let validate = true ;
        let errors = this.state.errors;

        const { name , lastname , email , password } = this.state.fialds;
        
        if (Validator.isEmpty(name)) {
            validate = false;
            errors['name'] = 'مقدار فیلد نام نباید خالی باشد .';

        }else if (! Validator.isLength(name,{min: 4, max: undefined})) {
            validate = false;
            errors['name'] = ' مقدار فیلدر نام نباید کمتر از 4 کاراکتر باشد ';
        }
        if (Validator.isEmpty(lastname)) {
            validate = false;
            errors['lastname'] = 'مقدار فیلد نام خانوادگی نباید خالی باشد .';
        }else if (! Validator.isLength(lastname,{min: 4, max: undefined})) {
            validate = false;
            errors['lastname'] = ' مقدار فیلدر نام خانوادگی نباید کمتر از 4 کاراکتر باشد ';
        }
        if (! Validator.isEmail(email)) {
            validate = false;
            errors['email'] = ' فرمت ایمیل وارد شده اشتباه است ';
        }
        if (Validator.isEmpty(password)) {
            validate = false;
            errors['password'] = ' مقدار فیلد پسورد نباید خالی باشد. ';
        }else if (! Validator.isLength(password,{min : 6 , max : undefined})) {
            validate = false;
            errors["password"] = ' مقدار رمز عبور نباید کمتر از 6 کاراکتر باشد ';
        }

        this.setState({
            errors : errors,
        });
        return validate;
    }

    handelSubmit(event){
        event.preventDefault();

        this.setState({
            wating : true,
        });

        if (this.handelValidator()) {
            // console.log('true');
            const { name , lastname , email , password } = this.state.fialds;

            let data = new FormData();
                data.append('name',name);
                data.append('lastname',lastname);
                data.append('email',email);
                data.append('password',password);
                data.append('password_confirmation',password);
            const url = ApiUrl.Url;

            Axios.post(url+'/Auth',data).then(response => {
                console.log(response);
                const { email , password } = this.state.fialds;
                const url = ApiUrl.Url;
                let dataToLogin = new FormData();
                    dataToLogin.append('email' , email);
                    dataToLogin.append('password',password);
                Axios.post(url+'/auth/login',dataToLogin).then(response => {
                    // console.log(response);
                    localStorage.setItem('api_token',response.data.access_token);
                    
                    // if register and then login is true run handelLogin in app.js
                    this.props.getLogin();
                    // .\ if register and then login is true run handelLogin in app.js

                    
                }).catch(error => {
                    console.log(error);
                });

                this.setState({
                    wating : false,
                });
            }).catch(error => {
                console.log(error);

                this.setState({
                     wating : false,
                });   
            })

        }else{
            // console.log( this.state.errors);

            this.setState({
                wating : false,
            }); 
        }
    }
    
    render() {
        

        
        const { name , lastname , email , password } = this.state.fialds;
        const wating = this.state.wating;
        const {errors} = this.state;
        
       
        return (
            <div className="start">
                <div className="layout">   
                    <div className="main order-md-2">
                        <div className="start">
                            <div className="container">
                                <div className="col-md-12">
                                    <div className="content">
                                        <h1>ساختن اکانت</h1>
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
                                        <p>یا استفاده از ایمیل برای ثبت نام :</p>
                                        <form className="signup" onSubmit={this.handelSubmit}>
                                            <div className="form-parent">
                                                <div className={['form-group text-right',errors.name ? 'has-error' : ''].join(' ')} style={{'width' : '100%','marginRight' : '0'}}>
                                                    <input type="text" id="name" name="name" onChange={this.handelChange} value={name} className="form-control " placeholder="نام ..." />
                                                    <label className=" icon"><i className="fa fa-user"></i></label>
                                                    {
                                                        errors.name ? (
                                                            <span className="red">{errors.name}</span>
                                                        ) : (null)
                                                    }
                                                    
                                                </div>
                                                <div className={['form-group text-right',errors.lastname ? 'has-error' : ''].join(' ')} style={{'width' : '100%','marginRight' : '10px'}}>
                                                    <input type="text" id="lastname" onChange={this.handelChange} value={lastname} name="lastname" className="form-control" placeholder="نام خانوادگی ..." />
                                                    <label className=" icon"><i className="fa fa-user-circle"></i></label>
                                                    {
                                                        errors.lastname ? (
                                                            <span className="red">{errors.lastname}</span>
                                                        ) : (null)
                                                    }
                                                </div>
                                            </div>
                                            <div className={['form-group text-right',errors.email ? 'has-error' : ''].join(' ')}>
                                                <input type="email" id="email" onChange={this.handelChange} value={email} name="email" className="form-control" placeholder="آدرس ایمیل ..." />
                                                <label className=" icon"><i className="fa fa-envelope-open"></i></label>
                                                {
                                                        errors.email ? (
                                                            <span className="red">{errors.email}</span>
                                                        ) : (null)
                                                    }
                                            </div>
                                            <div className={['form-group text-right',errors.password ? 'has-error' : ''].join(' ')}>
                                                <input type="password" id="password" onChange={this.handelChange}  value={password} name="password" className="form-control" placeholder="رمز عبور ..." />
                                                <label className=" icon"><i className="fa fa-lock"></i></label>
                                                {
                                                        errors.password ? (
                                                            <span className="red">{errors.password}</span>
                                                        ) : (null)
                                                    }
                                            </div>
                                            <button type="submit" className={['btn ' , wating ? 'danger-light disabled' : 'btn-base orange'].join(' ')}  > 
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
                                                        <span>ثبت نام در برنامه</span>
                                                    )
                                                }
                                            </button>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="aside order-md-1">
                        <div className="container">
                            <div className="col-md-12">
                                <div className="preference">
                                    <h2>خوش آمدید .</h2>
                                    <p>برای حفظ ارتباط با دوستان خود لطفا با اطلاعات شخصی خود وارد شوید.</p>
                                    <p>آیا قبلا ثبت نام کرده اید ؟ پس با اطلاعات قبلی خود وارد اکانت خود شوید .</p>
                                    <Link to="/" className="btn btn-base danger-light">ورود به برنامه </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        );
       
    }
}

export default Register;