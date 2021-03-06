import React from "react";
import Form from "react-bootstrap/Form";
import ValidationLabel from "./ValidationLabel";

const InputValidated = ({
  register,
  name,
  type,
  error,
  isRequired,
  minLength,
  onlyNumbers,
  defaultValue,
  ...props
}) => {
  let validationModel = {};

  if (isRequired) {
    validationModel.required = {
      value: true,
      message: "Este campo es requerido"
    };
  }

  if (minLength) {
    validationModel.minLength = {
      value: minLength,
      message: `Debe tener al menos ${minLength} caracteres.`
    };
  }

  if (onlyNumbers) {
    validationModel.pattern = {
      value: /^[0-9]+$/,
      message: "Solo se permiten números."
    };
  }

  const onChange = value => {
    if (props.onChange) props.onChange(value);
  };

  return (
    <>
      <Form.Control
        name={name}
        type={type}
        ref={register(validationModel)}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <ValidationLabel error={error}></ValidationLabel>
    </>
  );
};

export default InputValidated;
