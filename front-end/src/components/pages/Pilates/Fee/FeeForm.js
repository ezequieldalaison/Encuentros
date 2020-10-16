import React, { useRef, forwardRef, useImperativeHandle } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentSelect from "../../../selects/StudentSelect";
import MonthSelect from "../../../selects/MonthSelect";
import FeeTypeSelect from "../../../selects/FeeTypeSelect";
import InputValidated from "../../../common/InputValidated";
import { connect } from "react-redux";
import * as FeeTypeActions from "../../../../redux/actions/Pilates/FeeTypeActions";

const FeeForm = forwardRef((props, ref) => {
  const {
    register,
    errors,
    setFormValue,
    students,
    getFeeType,
    isEditing
  } = props;
  const childFeeTypeRef = useRef();
  const childMonthRef = useRef();
  const childStudentRef = useRef();

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childFeeTypeRef.current.setValue(null);
        childMonthRef.current.setValue(null);
        childStudentRef.current.setValue(null);
      },
      setSelectValue(fee) {
        childFeeTypeRef.current.setValue(fee.feeType);
        childMonthRef.current.setValue(fee.month);
        childStudentRef.current.setValue(fee.student);
      }
    }),
    []
  );

  const onStudentChange = selectedOption => {
    var student = students.filter(x => x.id === selectedOption.value)[0];
    if (student.feeTypeId > 0) {
      getFeeType(student.feeTypeId).then(feeType => {
        childFeeTypeRef.current.setValue(feeType);
        setFormValue("amount", feeType.amount, { shouldValidate: true });
      });
    } else {
      childFeeTypeRef.current.setValue(null);
      setFormValue("amount", 0, { shouldValidate: true });
    }
  };

  const onFeeTypeChange = selectedOption => {
    if (selectedOption && selectedOption.value > 0) {
      getFeeType(selectedOption.value).then(feeType => {
        childFeeTypeRef.current.setValue(feeType);
        setFormValue("amount", feeType.amount, { shouldValidate: true });
      });
    } else {
      setFormValue("amount", 0, { shouldValidate: true });
    }
  };

  return (
    <Form.Group>
      <Row>
        <Col xs={3}>
          <Form.Label>Mes</Form.Label>
          <MonthSelect
            ref={childMonthRef}
            register={register}
            isDisabled={isEditing}
          />
        </Col>
        <Col xs={3}>
          <Form.Label>Alumno</Form.Label>
          <StudentSelect
            ref={childStudentRef}
            register={register}
            customOnChange={onStudentChange}
            isDisabled={isEditing}
            setFormValue={setFormValue}
          />
        </Col>
        <Col xs={3}>
          <Form.Label>Modalidad</Form.Label>
          <FeeTypeSelect
            ref={childFeeTypeRef}
            register={register}
            customOnChange={onFeeTypeChange}
          />
        </Col>
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
  );
});

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

const mapDispatchToProps = {
  getFeeType: FeeTypeActions.getFeeType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(FeeForm);
