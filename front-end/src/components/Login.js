import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CustomSpinner from "./common/CustomSpinner";

const Login = props => {
  if (props.auth.isAuthenticated()) {
    props.auth.logout();
  } else {
    props.auth.login();
  }

  return <CustomSpinner />;
};

export default Login;
