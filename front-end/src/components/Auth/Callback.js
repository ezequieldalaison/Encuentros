import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.min.css';

class Callback extends Component {
    componentDidMount() {
        if(/access_token|id_token|error./.test(this.props.location.hash)) {
            this.props.auth.handleAuthentication();
        }
        else {
            throw new Error("Invalid callback URL");
        }
    };
    
    render() {
        return (<Spinner animation="border" role="status" className="spinner">
                    <span className="sr-only"></span>
                </Spinner>);
    }
}

export default Callback;