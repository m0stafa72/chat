import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';

class PrivateRoute extends Component {
    render() {
        const { component : Component , isAuth, user , ...restProps } = this.props;
        return ( 
            <Route { ...restProps } render={ props => (
                isAuth ? (   
                    <Component { ...restProps } user={user} isAuth={isAuth} />    
                ) : (
                    <Redirect to={{
                        pathname : '/',
                        state : { from : props.location }
                    }} />
                )
            )} />
        );
    }
}

export default PrivateRoute;