import React, { useRef, forwardRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";
import InputValidated from "../../../common/InputValidated";
import MonthSelect from "../../../selects/MonthSelect";

const ProfessionalPaymentForm = forwardRef((props, ref) => {
  const { register, errors, getParameterValue } = props;
  const childProfessionalRef = useRef();
  const childMonthRef = useRef();

  useEffect(() => {
    getParameterValue();
  }, []);

  const onChangeProfessional = () => {};

  return (
    <Form.Group>
      <Row>
        <Col xs={3}>
          <Form.Label>Profesor</Form.Label>
          <ProfessionalSelect
            areaId={1}
            ref={childProfessionalRef}
            onChange={onChangeProfessional}
          />
        </Col>
        <Col xs={3}>
          <Form.Label>Mes</Form.Label>
          <MonthSelect ref={childMonthRef} register={register} />
        </Col>
      </Row>
      <Row>
        <Col xs={3}>
          <Form.Label>Cantidad de Horas</Form.Label>
          <InputValidated
            register={register}
            name="quantityHours"
            type="number"
            isRequired
            error={errors.quantityHours}
          ></InputValidated>
        </Col>
        <Col xs={3}>
          <Form.Label>Valor Hora</Form.Label>
          <InputValidated
            register={register}
            name="valueHour"
            type="number"
            isRequired
            error={errors.quantityHours}
          ></InputValidated>
        </Col>
      </Row>
    </Form.Group>
  );
});

export default ProfessionalPaymentForm;
