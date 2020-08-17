import React, { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import { connect } from "react-redux";
import WeeklyClassStudentSelect from "../../../selects/WeeklyClassStudentSelect";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";

const ClassModal = ({
  weeklyClassId,
  show,
  handleClose,
  getWeeklyClass,
  saveWeeklyClass
}) => {
  const [weeklyClass, setWeeklyClass] = useState();
  const childProfessionalRef = useRef();

  useEffect(() => {
    if (show) {
      getWeeklyClass(weeklyClassId).then(wc => {
        setWeeklyClass(wc);
      });
    }
  }, [getWeeklyClass, show, weeklyClassId]);

  useEffect(() => {
    if (childProfessionalRef.current)
      childProfessionalRef.current.setValue(weeklyClass.instructor);
  }, [childProfessionalRef, weeklyClass]);

  const onChangeStudent = (optionSelected, index) => {
    var students = Object.assign([], weeklyClass.students, {
      [index]: { id: optionSelected.value, fullName: optionSelected.label }
    });

    setWeeklyClass({ ...weeklyClass, students });
  };

  const onChangeInstructor = optionSelected => {
    setWeeklyClass({
      ...weeklyClass,
      instructor: { id: optionSelected.value, fullName: optionSelected.label },
      instructorId: optionSelected.value
    });
  };

  const onSave = () => {
    saveWeeklyClass(weeklyClass)
      .then(x => {
        close();
        toast.success("La clase se guardó correctamente");
      })
      .catch(e => console.log(e));
  };

  const cleanStudent = index => {
    var students = Object.assign([], weeklyClass.students, {
      [index]: { id: 0, fullName: "LIBRE" }
    });
    setWeeklyClass({ ...weeklyClass, students });
    childProfessionalRef.current.setValue(1);
  };

  const close = () => {
    setWeeklyClass(null);
    handleClose();
  };

  return weeklyClass ? (
    <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${weeklyClass.day.name} ${weeklyClass.hour}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={{ marginLeft: "10px", marginBottom: "5px" }}>
          <b>Alumnos</b>
        </Row>
        {weeklyClass.students.map((s, i) => (
          <WeeklyClassStudentSelect
            key={i}
            index={i}
            student={s}
            onChangeStudent={onChangeStudent}
            cleanStudent={cleanStudent}
          />
        ))}
        <Row style={{ marginLeft: "10px", marginBottom: "5px" }}>
          <b>Profesor: </b>
          <Col>
            <ProfessionalSelect
              areaId={1}
              ref={childProfessionalRef}
              onChange={onChangeInstructor}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => onSave()}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  ) : null;
};

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = {
  getWeeklyClass: WeeklyClassActions.getWeeklyClass,
  saveWeeklyClass: WeeklyClassActions.saveWeeklyClass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassModal);
