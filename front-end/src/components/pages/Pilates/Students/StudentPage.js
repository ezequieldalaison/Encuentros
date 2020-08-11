import React, { useEffect, useState } from "react";
import PageBase from "../../../base/PageBase";
import { STUDENTS_GRID } from "../../../helpers/GridHelper";
import { connect } from "react-redux";
import * as StudentActions from "../../../../redux/actions/Pilates/StudentActions";
import StudentForm from "./StudentForm";
import StudentSearch from "./StudentSearch";
import { toast } from "react-toastify";

const StudentPage = ({
  students,
  getStudents,
  getStudent,
  activateStudent,
  inactivateStudent,
  saveStudent,
  searchStudents
}) => {
  const [studentUnderUpdate, setStudentUnderUpdate] = useState();

  useEffect(() => {
    getStudents();
  }, [getStudents]);

  const columns = React.useMemo(() => STUDENTS_GRID, []);

  const grid = {
    data: students,
    columns: columns
  };

  const inactivate = studentId => {
    inactivateStudent(studentId).then(() =>
      toast.success("El alumno se inactivó correctamente")
    );
  };

  const activate = studentId => {
    activateStudent(studentId).then(() =>
      toast.success("El alumno se activó correctamente")
    );
  };

  const onSubmit = data => {
    if (studentUnderUpdate) {
      data = { ...studentUnderUpdate, ...data };
    }

    saveStudent(data).then(() => {
      toast.success("El alumno se guardó correctamente");
    });
  };

  const getEntity = studentId => {
    return getStudent(studentId).then(student => {
      return student;
    });
  };

  const search = data => {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      getStudents();
    } else {
      searchStudents(data);
    }
  };

  return (
    <PageBase
      grid={grid}
      title="Alumnos"
      activate={activate}
      inactivate={inactivate}
      onSubmit={onSubmit}
      form={StudentForm}
      search={StudentSearch}
      getEntity={getEntity}
      setEntityUnderUpdate={setStudentUnderUpdate}
      onSearch={search}
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
  getStudent: StudentActions.getStudent,
  searchStudents: StudentActions.searchStudents
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentPage);
