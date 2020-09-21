import React from "react";
import Form from "react-bootstrap/Form";
import ValidationLabel from "./ValidationLabel";

const TextAreaValidated = ({ name, error, register, maxLength }) => {
  let validationModel = {};
  if (maxLength) {
    validationModel.maxLength = {
      value: maxLength,
      message: `Debe tener como máximo ${maxLength} caracteres.`
    };
  }
  return (
    <>
      <Form.Control
        as="textarea"
        rows="3"
        ref={register(validationModel)}
        name={name}
      />
      <ValidationLabel error={error}></ValidationLabel>
    </>
  );
};

export default TextAreaValidated;
