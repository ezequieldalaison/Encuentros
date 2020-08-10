import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentSelect from "../../../selects/StudentSelect";
//import InputValidated from "../../../common/InputValidated";
//import StudentSelect from "../../../selects/StudentSelect";

const FeeForm = props => {
  //const { register, errors } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Alumno</Form.Label>
            <StudentSelect />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default FeeForm;
