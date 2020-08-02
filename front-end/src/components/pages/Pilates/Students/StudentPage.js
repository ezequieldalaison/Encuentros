import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { STUDENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as StudentActions from "../../../../redux/actions/Pilates/StudentActions";
import StudentForm from "./StudentForm";

const StudentPage = ({
  students,
  getStudents,
  activateStudent,
  inactivateStudent,
  saveStudent
}) => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    variant: "success"
  });

  useEffect(() => {
    getStudents().catch(error => console.log("ERROR: " + error));
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
    />
  );
};

function mapStateToProps(state) {
  return {
    students: state.student
  };
}

const mapDispatchToProps = {
  getStudents: StudentActions.getStudents,
  saveStudent: StudentActions.saveStudent,
  inactivateStudent: StudentActions.inactivateStudent,
  activateStudent: StudentActions.activateStudent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
