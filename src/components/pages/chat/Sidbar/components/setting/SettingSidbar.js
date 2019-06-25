import React, { Component } from 'react';
import ListItems from './ListItems';

class SettingSidbar extends Component {
    render() {
        return (
            
            <div className="talks margin-tb-20">
                <hr className="margin-tb-10" />
                <ul>
                    <ListItems to="/Chat/setting" isExact={true}>
                        <i className="fa fa-user-circle font-lg white margin-top-5"></i>
                        <span className="font-sm-2 margin-right-15">ویرایش اطلاعات پروفایل </span>
                    </ListItems>

                    <ListItems to="/Chat/setting/avatar">
                        <i className="fa fa-image font-lg white margin-top-5"></i>
                        <span className="font-sm-2 margin-right-15">ویرایش عکس پروفایل </span>
                    </ListItems>

                    <ListItems to="/Chat/setting/password">
                        <i className="fa fa-lock font-lg white margin-top-5"></i>
                        <span className="font-sm-2 margin-right-15"> تغییر رمز عبور </span>
                    </ListItems>
                    
                </ul>
            </div>
        );
    }
}

export default SettingSidbar;