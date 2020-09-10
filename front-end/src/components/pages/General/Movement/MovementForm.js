import React, { useRef, forwardRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CommonConceptSelect from "../../../selects/CommonConceptSelect";
import AreaSelect from "../../../selects/AreaSelect";
import CustomDatePicker from "../../../common/CustomDatePicker";

const MovementForm = forwardRef((props, ref) => {
  const childConceptRef = useRef();
  const { register, control } = props;
  const [areaId, setAreaId] = useState();

  const onAreaChange = areaId => {
    setAreaId(areaId);
    childConceptRef.current.setValue(null);
  };

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Áreas</Form.Label>
            <AreaSelect
              register={register}
              isMulti={false}
              customOnChange={onAreaChange}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Concepto</Form.Label>
            <CommonConceptSelect
              register={register}
              areaId={areaId}
              ref={childConceptRef}
            />
          </Col>
        </Row>
        <Row>
          <CustomDatePicker control={control} xs={3} />
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
