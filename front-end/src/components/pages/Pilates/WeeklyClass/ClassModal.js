import React, { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as ClassActions from "../../../../redux/actions/Pilates/ClassActions";
import { connect } from "react-redux";
import ClassStudentSelect from "../../../selects/ClassStudentSelect";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfessionalSelect from "../../../selects/ProfessionalSelect";

const ClassModal = ({
  date,
  hour,
  show,
  handleClose,
  getClassByDateAndHour,
  saveClass
}) => {
  const [_class, setClass] = useState();
  const childProfessionalRef = useRef();

  useEffect(() => {
    if (show) {
      getClassByDateAndHour({ date, hour }).then(c => {
        setClass(c);
      });
    }
  }, [getClassByDateAndHour, show, date, hour]);

  useEffect(() => {
    if (childProfessionalRef.current)
      childProfessionalRef.current.setValue(_class.professional);
  }, [childProfessionalRef, _class]);

  const onChangeClassStudent = (optionSelected, isIndividualClass, index) => {
    var classStudents = Object.assign([], _class.classStudents, {
      [index]: {
        ..._class.classStudents[index],
        student: {
          id: optionSelected.value,
          fullName: optionSelected.label
        },
        isIndividualClass
      }
    });

    setClass({ ..._class, classStudents });
  };

  const onChangeIsIndividualClass = (isIndividualClass, index) => {
    var classStudents = Object.assign([], _class.classStudents, {
      [index]: { ..._class.classStudents[index], isIndividualClass }
    });

    setClass({ ..._class, classStudents });
  };

  const onChangeProfessional = optionSelected => {
    setClass({
      ..._class,
      professional: {
        id: optionSelected.value,
        fullName: optionSelected.label
      },
      professionalId: optionSelected.value
    });
  };

  const onSave = () => {
    saveClass(_class)
      .then(x => {
        close();
        toast.success("La clase se guardó correctamente");
      })
      .catch(e => console.log(e));
  };

  const cleanStudent = index => {
    var classStudents = Object.assign([], _class.classStudents, {
      [index]: {
        student: { id: 0, fullName: "LIBRE" },
        isIndividualClass: false
      }
    });
    setClass({ ..._class, classStudents });
    childProfessionalRef.current.setValue(1);
  };

  const close = () => {
    setClass(null);
    handleClose();
  };

  return _class ? (
    <Modal show={show} onHide={close} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{`${_class.day.name} ${_class.hour}`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row style={{ marginLeft: "10px", marginBottom: "5px" }}>
          <b>Alumnos</b>
        </Row>
        {_class.classStudents.map((cs, i) => (
          <ClassStudentSelect
            key={i}
            index={i}
            classStudent={cs}
            onChangeClassStudent={onChangeClassStudent}
            cleanStudent={cleanStudent}
            onChangeIsIndividualClass={onChangeIsIndividualClass}
          />
        ))}
        <Row style={{ marginLeft: "10px", marginBottom: "5px" }}>
          <b>Profesor: </b>
          <Col>
            <ProfessionalSelect
              areaId={1}
              ref={childProfessionalRef}
              onChange={onChangeProfessional}
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
  getClassByDateAndHour: ClassActions.getClassByDateAndHour,
  saveClass: ClassActions.saveClass
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassModal);
