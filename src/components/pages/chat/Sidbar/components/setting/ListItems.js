import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';


class ListItems extends Component {
    render() {
        const {to , children , isExact } = this.props;

        return (
            <Route 
                path = {to}
                exact = {isExact}
                children = {({match}) => (
                    <li className={['talks-item ', match ? 'active' : ''].join(' ')}>
                        <Link to={to} className="white padding-rl-20 dis-blok">
                            {children}
                        </Link>
                    </li>
                )}
            />
        );
    }
}

export default ListItems;