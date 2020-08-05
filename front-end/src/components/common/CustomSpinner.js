import React from "react";
import Spinner from "react-bootstrap/Spinner";

const CustomSpinner = () => {
  return (
    <Spinner animation="border" role="status" className="spinner">
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default CustomSpinner;
