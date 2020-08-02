import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { STUDENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as StudentActions from "../../../../redux/actions/Pilates/StudentActions";
import StudentForm from "./StudentForm";

const StudentPage = ({
  students,
  getStudents,
  getStudent,
  activateStudent,
  inactivateStudent,
  saveStudent
}) => {
  const [studentUnderUpdate, setStudentUnderUpdate] = useState();
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const columns = React.useMemo(() => STUDENTS_GRID, []);

  const grid = {
    data: students,
    columns: columns
  };

  const inactivate = studentId => {
    inactivateStudent(studentId).then(() => {
      setAlert({
        show: true,
        message: "El alumno se inactivó correctamente",
        variant: "success"
      });
      setTimeout(hideAlert, 5000);
    });
  };

  const activate = studentId => {
    activateStudent(studentId).then(() => {
      setAlert({
        show: true,
        message: "El alumno se activó correctamente",
        variant: "success"
      });
      setTimeout(hideAlert, 5000);
    });
  };

  const onSubmit = data => {
    if (studentUnderUpdate) {
      data = { ...studentUnderUpdate, ...data };
    }
    saveStudent(data).then(() => {
      setAlert({
        show: true,
        message: "El alumno se guardó correctamente",
        variant: "success"
      });
      setTimeout(hideAlert, 5000);
    });
  };

  const hideAlert = () => {
    setAlert({ show: false, message: "", variant: "success" });
  };

  const getEntity = studentId => {
    return getStudent(studentId).then(student => {
      return student;
    });
  };

  return (
    <PageBase
      grid={grid}
      title="Alumnos"
      activate={activate}
      inactivate={inactivate}
      onSubmit={onSubmit}
      alert={alert}
      hideAlert={hideAlert}
      form={StudentForm}
      getEntity={getEntity}
      setEntityUnderUpdate={setStudentUnderUpdate}
    />
  );
};

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

const mapDispatchToProps = {
  getStudents: StudentActions.getStudents,
  saveStudent: StudentActions.saveStudent,
  inactivateStudent: StudentActions.inactivateStudent,
  activateStudent: StudentActions.activateStudent,
  getStudent: StudentActions.getStudent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
