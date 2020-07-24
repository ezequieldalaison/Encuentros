import React, {useContext} from 'react';
import {Route} from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext'

const PrivateRoute = ({component: Component, ...rest}) => {
    var auth = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props => {
                //1. Redirect to login if not logged in
                if(!auth.isAuthenticated()) return auth.login();

                //2. Render the component
                return <Component auth={auth} {...props} />
            }}
        />
    );
}

export default PrivateRoute;