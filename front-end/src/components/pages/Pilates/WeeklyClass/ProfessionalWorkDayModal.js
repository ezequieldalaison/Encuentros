import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { formatDateWithoutYear } from "../../../helpers/DateHelper";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import * as ProfessionalWorkDayActions from "../../../../redux/actions/Pilates/ProfessionalWorkDayActions";
import InputValidated from "../../../common/InputValidated";
import { toast } from "react-toastify";

const ProfessionalWorkDayModal = ({
  date,
  dayId,
  show,
  onSavePWD,
  handleClose,
  getSuggestedProfessionals,
  saveProfessionalWorkDays
}) => {
  const [professionalWorkdays, setProfessionalWorkdays] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  function onSubmit(data) {
    var request = Object.keys(data).map(professionalId => {
      return { date, professionalId, quantityHours: data[professionalId] };
    });
    saveProfessionalWorkDays(request)
      .then(resp => {
        toast.success("Se cerró el día correctamente");
        onSavePWD();
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    if (show) {
      getSuggestedProfessionals(dayId).then(pwd => {
        setProfessionalWorkdays(pwd);
      });
    }
  }, [getSuggestedProfessionals, show, dayId]);

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Cerrar día {formatDateWithoutYear(date)}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Form.Group>
            {professionalWorkdays.map(pwd => (
              <Row key={pwd.professional.id} style={{ marginBottom: "5px" }}>
                <Col xs="4">
                  <Form.Label>{pwd.professional.fullName}</Form.Label>
                </Col>
                <Col xs="6">
                  <InputValidated
                    register={register}
                    name={pwd.professional.id}
                    type="number"
                    isRequired
                    error={errors[pwd.professional.id]}
                    defaultValue={pwd.quantityHours}
                  ></InputValidated>
                </Col>
              </Row>
            ))}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getSuggestedProfessionals:
    ProfessionalWorkDayActions.getSuggestedProfessionals,
  saveProfessionalWorkDays: ProfessionalWorkDayActions.saveProfessionalWorkDays
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfessionalWorkDayModal);
