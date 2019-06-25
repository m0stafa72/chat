import React, { Component } from 'react';

import {Route,Redirect} from 'react-router-dom';
import { PropTypes } from 'prop-types';

class NotPrivateRoute extends Component {
    static propTypes = {
        component : PropTypes.func.isRequired,
		path : PropTypes.string.isRequired,
    }
    render() {
        const { component : Component , isAuth , isActive , ...restProps } = this.props ;
       
        return (
            <Route { ...restProps } render={ props => (
                (isAuth) ? (
                    <Redirect to={{
                        pathname : '/Chat',
                        state : { from : props.location }
                    }} />
                ) : (
                    <Component { ...restProps } />
                )
            )} />
        );
    }
}

export default NotPrivateRoute;