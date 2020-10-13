import React, {
  useRef,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle
} from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";
import InputValidated from "../../../common/InputValidated";
import MonthSelect from "../../../selects/MonthSelect";
import { ParametersEnum } from "../../../../enums/CommonEnums";
import { connect } from "react-redux";
import * as ParameterActions from "../../../../redux/actions/Common/ParameterActions";
import * as ProfessionalWorkDayActions from "../../../../redux/actions/Pilates/ProfessionalWorkDayActions";

const ProfessionalPaymentForm = forwardRef((props, ref) => {
  const {
    register,
    errors,
    watch,
    getParameter,
    setFormValue,
    getProfessionalWorkedHoursByMonth,
    isEditing
  } = props;
  const [professionalHourVaue, setProfessionalHourVaue] = useState();
  const [amount, setAmount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const childProfessionalRef = useRef();
  const childMonthRef = useRef();
  const watchFields = watch(["quantityHours", "valueHour"]);

  useImperativeHandle(
    ref,
    () => ({
      cleanSelects() {
        childProfessionalRef.current.setValue(null);
        childMonthRef.current.setValue(null);
        setShowWarning(false);
        setAmount(0);
      },
      setSelectValue(professionalPayment) {
        childProfessionalRef.current.setValue(professionalPayment.professional);
        childMonthRef.current.setValue(professionalPayment.month);
      }
    }),
    []
  );

  useEffect(() => {
    getParameter(ParametersEnum.PROFESSIONAL_HOUR_VALUE).then(parameter => {
      setProfessionalHourVaue(parameter.value);
    });
  }, [getParameter, setFormValue]);

  useEffect(() => {
    if (watchFields.quantityHours && watchFields.valueHour)
      setAmount(watchFields.quantityHours * watchFields.valueHour);
  }, [watchFields]);

  const onChangeProfessional = selectedOption => {
    getProfessionalWorkedHoursByMonth({
      professionalId: selectedOption.value,
      monthId: childMonthRef.current.getValue().value
    }).then(r => {
      changeQuantityHours(r.quantityHours);
      setShowWarning(!r.isMonthClosed);
    });
  };

  const onChangeMonth = selectedOption => {
    const professional = childProfessionalRef.current.getValue();
    if (professional)
      getProfessionalWorkedHoursByMonth({
        professionalId: professional.value,
        monthId: selectedOption.value
      }).then(r => {
        changeQuantityHours(r.quantityHours);
        setShowWarning(!r.isMonthClosed);
      });
  };

  const changeQuantityHours = quantity => {
    setFormValue("quantityHours", quantity, { shouldValidate: true });
  };

  return (
    <Form.Group>
      {showWarning ? (
        <Row>
          <Col>
            <strong style={{ color: "red" }}>
              Aún restan días del mes por cerrar
            </strong>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col xs={3}>
          <Form.Label>Profesor</Form.Label>
          <ProfessionalSelect
            areaId={1}
            ref={childProfessionalRef}
            onChange={onChangeProfessional}
            register={register}
            isDisabled={isEditing}
          />
        </Col>
        <Col xs={3}>
          <Form.Label>Mes</Form.Label>
          <MonthSelect
            ref={childMonthRef}
            register={register}
            onChange={onChangeMonth}
            isDisabled={isEditing}
          />
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
            error={errors.valueHour}
            defaultValue={professionalHourVaue}
          ></InputValidated>
        </Col>
        <Col xs={3}>
          <Form.Label>Importe Total</Form.Label>
          <Form.Control
            name="amount"
            type="number"
            ref={register}
            value={amount}
            disabled
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
  getParameter: ParameterActions.getParameter,
  getProfessionalWorkedHoursByMonth:
    ProfessionalWorkDayActions.getProfessionalWorkedHoursByMonth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { forwardRef: true }
)(ProfessionalPaymentForm);
