import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CommonConceptSelect from "../../../selects/CommonConceptSelect";

const MovementForm = forwardRef((props, ref) => {
  const { register } = props;

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Concepto</Form.Label>
            <CommonConceptSelect register={register} />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(MovementForm);
