import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Login = (props) => {
    if(props.auth.isAuthenticated()) {
        props.auth.logout();
    }
    else {
        props.auth.login();
    }

    return (<Spinner animation="border" role="status" className="spinner">
                <span className="sr-only"></span>
            </Spinner>);
}

export default Login;