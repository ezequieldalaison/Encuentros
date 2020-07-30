import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputValidated from "../../../InputValidated";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfessionalForm = props => {
  const { register, errors } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={4}>
            <Form.Label>Nombre</Form.Label>
            <InputValidated
              register={register}
              name="name"
              type="text"
              isRequired
              error={errors.name}
            ></InputValidated>
          </Col>
          <Col xs={4}>
            <Form.Label>Apellido</Form.Label>
            <InputValidated
              register={register}
              name="lastName"
              type="text"
              isRequired
              error={errors.lastName}
            ></InputValidated>
          </Col>
          <Col xs={4}>
            <Form.Label>Nº de Documento</Form.Label>
            <InputValidated
              register={register}
              name="documentNumber"
              type="number"
              isRequired
              error={errors.documentNumber}
            ></InputValidated>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col xs={4}>
            <Form.Label>e-mail</Form.Label>
            <InputValidated
              register={register}
              name="email"
              type="text"
              error={errors.email}
            ></InputValidated>
          </Col>
          <Col xs={4}>
            <Form.Label>Teléfono</Form.Label>
            <InputValidated
              register={register}
              name="phoneNumber"
              type="text"
              error={errors.phoneNumber}
            ></InputValidated>
          </Col>
          <Col xs={4}>
            <Form.Label>Porcentaje de arreglo</Form.Label>
            <InputValidated
              register={register}
              name="percentage"
              type="number"
              isRequired
              error={errors.percentage}
            ></InputValidated>
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default ProfessionalForm;
