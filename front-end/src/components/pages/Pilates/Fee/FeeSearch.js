import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthSelect from "../../../selects/MonthSelect";

const FeeSearch = props => {
  const { register } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Mes</Form.Label>
            <MonthSelect register={register} />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

export default FeeSearch;
