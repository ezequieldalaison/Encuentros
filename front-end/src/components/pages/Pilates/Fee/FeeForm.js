import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StudentSelect from "../../../selects/StudentSelect";
import MonthSelect from "../../../selects/MonthSelect";
import FeeTypeSelect from "../../../selects/FeeTypeSelect";
import InputValidated from "../../../common/InputValidated";
import { connect } from "react-redux";
import * as FeeTypeActions from "../../../../redux/actions/Pilates/FeeTypeActions";

const FeeForm = ({ register, errors, setFormValue, students, getFeeType }) => {
  const childFeeTypeRef = useRef();

  const onChange = selectedOption => {
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

  return (
    <>
      <Form.Group>
        <Row>
          <Col xs={3}>
            <Form.Label>Alumno</Form.Label>
            <StudentSelect register={register} customOnChange={onChange} />
          </Col>
          <Col xs={3}>
            <Form.Label>Modalidad</Form.Label>
            <FeeTypeSelect ref={childFeeTypeRef} />
          </Col>
          <Col xs={3}>
            <Form.Label>Importe</Form.Label>
            <InputValidated
              register={register}
              name="amount"
              type="number"
              isRequired
              error={errors.amount}
            ></InputValidated>
          </Col>
          <Col xs={3}>
            <Form.Label>Mes</Form.Label>
            <MonthSelect />
          </Col>
        </Row>
      </Form.Group>
    </>
  );
};

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
  mapDispatchToProps
)(FeeForm);
