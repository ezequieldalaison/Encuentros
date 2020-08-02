import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { STUDENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as StudentActions from "../../../../redux/actions/Pilates/StudentActions";

const StudentPage = ({
  students,
  getStudents,
  activateStudent,
  inactivateStudent
}) => {
  useEffect(() => {
    getStudents().catch(error => console.log("ERROR: " + error));
  }, [getStudents]);

  const columns = React.useMemo(() => STUDENTS_GRID, []);

  const grid = {
    data: students,
    columns: columns
  };

  const inactivate = studentId => {
    inactivateStudent(studentId);
  };

  const activate = studentId => {
    activateStudent(studentId);
  };

  //   form={null}
  //   onSubmit={null}
  //   alert={alert}
  //   hideAlert={hideAlert}

  return (
    <PageBase
      grid={grid}
      title="Alumnos"
      activate={activate}
      inactivate={inactivate}
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
  inactivateStudent: StudentActions.inactivateStudent,
  activateStudent: StudentActions.activateStudent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
