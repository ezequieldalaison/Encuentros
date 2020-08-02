import React, { useEffect } from "react";
import PageBase from "../../../base/PageBase";
import { STUDENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as StudentActions from "../../../../redux/actions/Pilates/StudentActions";

const StudentPage = ({ students, getStudents }) => {
  useEffect(() => {
    getStudents().catch(error => console.log("ERROR: " + error));
  }, [getStudents]);

  const columns = React.useMemo(() => STUDENTS_GRID, []);

  const grid = {
    data: students,
    columns: columns
  };

  //   form={null}
  //   onSubmit={null}
  //   activate={null}
  //   inactivate={null}
  //   alert={alert}
  //   hideAlert={hideAlert}

  return <PageBase grid={grid} title="Alumnos" />;
};

function mapStateToProps(state) {
  return {
    students: state.student
  };
}

const mapDispatchToProps = {
  getStudents: StudentActions.getStudents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
