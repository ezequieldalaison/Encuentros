import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StudentForm = props => {
  const { register } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control name="name" type="text" ref={register} />
          </Col>
          <Col xs={3}>
            <Form.Label>Apellido</Form.Label>
            <Form.Control name="lastName" type="text" ref={register} />
          </Col>
        </Row>
        <Row style={{ marginTop: "5px" }}>
          <Col xs={3}>
            <Form.Check
              type="checkbox"
              name="showInactives"
              label="Mostrar Inactivos"
              ref={register}
              defaultChecked={false}
            />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default StudentForm;
