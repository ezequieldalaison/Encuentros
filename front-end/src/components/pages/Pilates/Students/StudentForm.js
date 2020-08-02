import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputValidated from "../../../InputValidated";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentForm = props => {
  const { register, errors } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Nombre</Form.Label>
            <InputValidated
              register={register}
              name="name"
              type="text"
              isRequired
              error={errors.name}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>Apellido</Form.Label>
            <InputValidated
              register={register}
              name="lastName"
              type="text"
              isRequired
              error={errors.lastName}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>e-mail</Form.Label>
            <InputValidated
              register={register}
              name="email"
              type="text"
              error={errors.email}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>Teléfono</Form.Label>
            <InputValidated
              register={register}
              name="phoneNumber"
              type="text"
              error={errors.phoneNumber}
            ></InputValidated>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default StudentForm;
