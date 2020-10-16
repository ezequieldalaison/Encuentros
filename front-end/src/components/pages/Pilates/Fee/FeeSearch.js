import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthSelect from "../../../selects/MonthSelect";
import StudentSelect from "../../../selects/StudentSelect";
import MovementStatusSelect from "../../../selects/MovementStatusSelect";

const FeeSearch = forwardRef((props, ref) => {
  const { register, setFormValue } = props;
  const childStudentRef = useRef();
  const childMonthRef = useRef();
  const childMovementStatusRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childMonthRef.current.setValue(null);
        childStudentRef.current.setValue(null);
        childMovementStatusRef.current.setValue(null);
      }
    }),
    []
  );

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Mes</Form.Label>
            <MonthSelect
              ref={childMonthRef}
              register={register}
              addOptionAll
              setFormValue={setFormValue}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Alumno</Form.Label>
            <StudentSelect
              ref={childStudentRef}
              register={register}
              setFormValue={setFormValue}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Estado</Form.Label>
            <MovementStatusSelect
              ref={childMovementStatusRef}
              register={register}
            />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
});

export default FeeSearch;
