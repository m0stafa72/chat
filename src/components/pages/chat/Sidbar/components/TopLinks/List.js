import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom';

class List extends Component {
    render() {
        const {children , toActive, link , isExact} = this.props ; 
        return (

             <Route 
                    path={toActive}
                    exact={isExact}
                    children = { ({match}) => (
                        <li className={match ? 'active' : ''}>
                            <Link to={link} > 
                                { children }
                            </Link>
                        </li>
                    ) }
             />      
        );
    }
}

export default List;