import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MonthSelect from "../../../selects/MonthSelect";

const ProfessionalWorkDaySearch = props => {
  const { register } = props;
  const [mode, setMode] = useState("monthly");
  const childMonthRef = useRef();

  return (
    <>
      <Form.Group>
        <Row>
          <Form.Check
            inline
            label="Mensual"
            type="radio"
            value="monthly"
            name="mode"
            ref={register}
            checked={mode === "monthly"}
            onChange={() => setMode("monthly")}
          />
          <Form.Check
            inline
            label="Anual"
            type="radio"
            value="anual"
            name="mode"
            ref={register}
            checked={mode === "anual"}
            onChange={() => setMode("anual")}
          />
        </Row>
      </Form.Group>
      <Form.Group>
        {mode === "monthly" ? (
          <Row>
            <Col xs={3}>
              <Form.Label>Mes</Form.Label>
              <MonthSelect ref={childMonthRef} register={register} />
            </Col>
          </Row>
        ) : null}
      </Form.Group>
    </>
  );
};

export default ProfessionalWorkDaySearch;
