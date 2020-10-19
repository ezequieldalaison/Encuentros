import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthSelect from "../../../selects/MonthSelect";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";

const ProfessionalPaymentSearch = forwardRef((props, ref) => {
  const { register, setFormValue } = props;
  const childMonthRef = useRef();
  const childProfessionalRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childProfessionalRef.current.setValue(null);
        childMonthRef.current.setValue(null);
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
              register={register}
              ref={childMonthRef}
              addOptionAll
              setFormValue={setFormValue}
            />
          </Col>
          <Col xs={3}>
            <Form.Label>Profesor</Form.Label>
            <ProfessionalSelect
              areaId={1}
              ref={childProfessionalRef}
              register={register}
              setFormValue={setFormValue}
            />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
});

export default ProfessionalPaymentSearch;
