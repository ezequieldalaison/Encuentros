import React, {
  useRef,
  forwardRef,
  useState,
  useImperativeHandle
} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CommonConceptSelect from "../../../selects/CommonConceptSelect";
import AreaSelect from "../../../selects/AreaSelect";
import CustomDatePicker from "../../../common/CustomDatePicker";
import InputValidated from "../../../common/InputValidated";
import TextAreaValidated from "../../../common/TextAreaValidated";

const MovementForm = forwardRef((props, ref) => {
  const childConceptRef = useRef();
  const childAreaRef = useRef();
  const childDateRef = useRef();
  const { register, control, errors, isEditing } = props;
  const [areaId, setAreaId] = useState();

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childConceptRef.current.setValue(null);
        childAreaRef.current.setValue(null);
        childDateRef.current.setValue(new Date());
      },
      setSelectValue(movement) {
        childConceptRef.current.setValue(movement.concept);
        childAreaRef.current.setValue(movement.concept.area);
        childDateRef.current.setValue(movement.date);
      }
    }),
    []
  );

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
              ref={childAreaRef}
              isDisabled={isEditing}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Concepto</Form.Label>
            <CommonConceptSelect
              register={register}
              areaId={areaId}
              ref={childConceptRef}
              isDisabled={isEditing}
            />
          </Col>
          <CustomDatePicker control={control} xs={3} ref={childDateRef} />
          <Col xs={3}>
            <Form.Label>Monto</Form.Label>
            <InputValidated
              register={register}
              name="amount"
              type="number"
              isRequired
              error={errors.amount}
            ></InputValidated>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Comentarios</Form.Label>
            <TextAreaValidated
              register={register}
              name="comments"
              isRequired
              maxLength="200"
              error={errors.comments}
            ></TextAreaValidated>
          </Col>
        </Row>
        <Row>
          <Col xs={1}>
            <Form.Check
              type="checkbox"
              name="isPaid"
              label="Pagado"
              ref={register}
              defaultChecked={true}
            />
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
