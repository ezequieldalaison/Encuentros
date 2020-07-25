import React, {useContext} from 'react';
import {Route} from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

const PublicRoute = ({component: Component, ...rest}) => {
    var auth = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                return <Component auth={auth} {...props} />
            }}
        />
    );
}

export default PublicRoute;