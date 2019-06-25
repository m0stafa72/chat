import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';


class items extends Component {
    render() {
        const { to , children } = this.props;

        return (
            <Route
                path={to}
                children={({ match }) => (
                    <li className={['talks-item ', match ? 'active' : ''].join(' ')}>
                        <Link to={to}>
                            { children }
                        </Link>
                    </li>
                )}

            />

        );
    }
}

export default items;