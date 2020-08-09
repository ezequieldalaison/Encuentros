import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputValidated from "../../../common/InputValidated";

const FeeForm = props => {
  const { register, errors } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Alumno</Form.Label>
            <StudentSelect
              student={s}
              onChangeStudent={onChange}
              cleanStudent={cleanStudent}
            />
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
              type="email"
              error={errors.email}
            ></InputValidated>
          </Col>
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
        </Row>
      </Form.Group>
    </>
  );
};

export default FeeForm;
