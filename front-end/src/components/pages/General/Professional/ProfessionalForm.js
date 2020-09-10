import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputValidated from "../../../common/InputValidated";
import "bootstrap/dist/css/bootstrap.min.css";
import AreaSelect from "../../../selects/AreaSelect";
import { connect } from "react-redux";

const ProfessionalForm = forwardRef((props, ref) => {
  const childAreaRef = useRef();
  const { register, errors } = props;

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childAreaRef.current.setValues(null);
      },
      setSelectValue(professional) {
        childAreaRef.current.setValues(professional.areas);
      }
    }),
    []
  );

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
            <Form.Label>Nº de Documento</Form.Label>
            <InputValidated
              register={register}
              name="documentNumber"
              type="number"
              isRequired
              error={errors.documentNumber}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>e-mail</Form.Label>
            <InputValidated
              register={register}
              name="email"
              type="email"
              error={errors.email}
            ></InputValidated>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Teléfono</Form.Label>
            <InputValidated
              register={register}
              name="phoneNumber"
              type="text"
              pattern="[0-9]*"
              error={errors.phoneNumber}
              onlyNumbers
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>Porcentaje de arreglo</Form.Label>
            <InputValidated
              register={register}
              name="percentage"
              type="number"
              error={errors.percentage}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>Áreas</Form.Label>
            <AreaSelect ref={childAreaRef} register={register} isMulti={true} />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
});

export default connect(
  null,
  null,
  null,
  { forwardRef: true }
)(ProfessionalForm);
