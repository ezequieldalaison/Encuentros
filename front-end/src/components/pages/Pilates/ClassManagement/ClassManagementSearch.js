import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ClassManagementSearch = props => {
  const { register } = props;

  return (
    <>
      <Form.Group>
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

export default ClassManagementSearch;
