import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomSpinner from "../common/CustomSpinner";

class Callback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error./.test(this.props.location.hash)) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL");
    }
  }

  render() {
    return <CustomSpinner />;
  }
}

export default Callback;
