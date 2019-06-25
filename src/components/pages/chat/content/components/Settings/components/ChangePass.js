import React, { Component } from 'react';

class ChangePass extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            wating : false,
            fields : {
                oldPass : '',
                newPass : '',
                newPassConf : ''
            },
        }
    }
    
    render() {
        const {wating,fields} = this.state;

        return (
            <div>
                <h4 className="font-md font-600">رمز عبور خود را ویرایش کنید : </h4>

                <form onSubmit={this.handelSubmit}>
                    <div className="form-group">
                        <label htmlFor="oldPass" >رمز عبور قدیمی : </label>
                        <input type="text" id="oldPass" onChange={this.handelChangeInputs} name="oldPass" value={fields.oldPass} placeholder="رمزعبور فعلی خود را وارد کنید ..." className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPass" > رمز عبور جدید : </label>
                        <input type="text" id="newPass" onChange={this.handelChangeInputs} name="newPass" value={fields.newPass} placeholder="رمز جدید خود را وارد کنید ..." className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassConf" >تایید رمز عبور جدید : </label>
                        <input type="text" id="newPassConf" onChange={this.handelChangeInputs} name="newPassConf" value={fields.newPassConf} placeholder="رمز جدید خود را دوباره وارد کنید ..." className="form-control" />
                    </div>

                    <div className="form-group margin-top-40">
                        <button type="submit" className={['btn success-dark',wating ? '' : 'btn-base'].join(' ')}>
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

export default ChangePass;