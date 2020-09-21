import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { connect } from "react-redux";
import CustomDatePicker from "../../../common/CustomDatePicker";
import InputValidated from "../../../common/InputValidated";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";

const ProfessionalWorkDayForm = forwardRef((props, ref) => {
  const { register, control, errors, isEditing } = props;
  const childDateRef = useRef();
  const childProfessionalRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childDateRef.current.setValue(new Date());
        childProfessionalRef.current.setValue(null);
      },
      setSelectValue(professionalWorkDay) {
        childDateRef.current.setValue(professionalWorkDay.date);
        childProfessionalRef.current.setValue(professionalWorkDay.professional);
      }
    }),
    []
  );

  return (
    <Form.Group>
      <Row>
        <Col xs={3}>
          <Form.Label>Profesor</Form.Label>
          <ProfessionalSelect
            areaId={1}
            ref={childProfessionalRef}
            register={register}
            isDisabled={isEditing}
          />
        </Col>
        <CustomDatePicker
          control={control}
          xs={3}
          ref={childDateRef}
          isDisabled={isEditing}
        />
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
      </Row>
    </Form.Group>
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
)(ProfessionalWorkDayForm);
