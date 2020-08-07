import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as WeeklyClassActions from "../../../../redux/actions/Pilates/WeeklyClassActions";
import { connect } from "react-redux";
import StudentSelect from "../../../selects/StudentSelect";

const ClassModal = ({
  weeklyClassId,
  show,
  handleClose,
  getWeeklyClass,
  saveWeeklyClass
}) => {
  const [weeklyClass, setWeeklyClass] = useState();

  useEffect(() => {
    if (show) {
      getWeeklyClass(weeklyClassId).then(wc => {
        setWeeklyClass(wc);
      });
    }
  }, [getWeeklyClass, show, weeklyClassId]);

  const onChange = (optionSelected, index) => {
    console.log(index);
    var students = Object.assign([], weeklyClass.students, {
      [index]: { id: optionSelected.value, fullName: optionSelected.label }
    });

    setWeeklyClass({ ...weeklyClass, students });
  };

  const onSave = () => {
    console.log(weeklyClass);
    saveWeeklyClass(weeklyClass).then(x => handleClose());
  };

  const cleanStudent = index => {
    var students = Object.assign([], weeklyClass.students, {
      [index]: { id: 0, fullName: "LIBRE" }
    });
    setWeeklyClass({ ...weeklyClass, students });
  };

  return weeklyClass ? (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>
          {`${weeklyClass.day.name} ${weeklyClass.hour}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h6>
          <b>Alumnos</b>
        </h6>
        {weeklyClass.students.map((s, i) => (
          <StudentSelect
            key={i}
            index={i}
            student={s}
            onChangeStudent={onChange}
            cleanStudent={cleanStudent}
          />
        ))}
        <div>
          <b>Profesor:</b> {weeklyClass.instructor.fullName}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
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
