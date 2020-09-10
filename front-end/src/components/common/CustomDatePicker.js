import React, { useState } from "react";
import { Portal } from "react-overlays";
import DatePicker from "react-datepicker";
import es from "date-fns/locale/es";
import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

const CustomDatePicker = ({ control, xs }) => {
  const [startDate, setStartDate] = useState(new Date());

  const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");
    return <Portal container={el}>{children}</Portal>;
  };

  const DatePickerControlled = ({ selected, onChange }) => {
    return (
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          onChange(date);
        }}
        popperContainer={CalendarContainer}
        locale={es}
        className="form-control"
      />
    );
  };

  return (
    <Col xs={xs} style={{ display: "inline-grid" }}>
      <Form.Label>Fecha</Form.Label>
      <Controller
        as={DatePickerControlled}
        control={control}
        valueName="selected"
        onChange={([selected]) => selected}
        name="date"
        defaultValue={startDate}
      />
    </Col>
  );
};

export default CustomDatePicker;
