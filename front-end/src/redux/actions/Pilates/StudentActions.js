import * as Types from "../ActionTypes";
import * as StudentApi from "../../../api/Pilates/StudentApi";

export function getStudentsSuccess(students) {
  return { type: Types.GET_STUDENTS_SUCCESS, students };
}

export function inactivateStudentSuccess(student) {
  return { type: Types.INACTIVATE_STUDENT_SUCCESS, student };
}

export function activateStudentSuccess(student) {
  return { type: Types.ACTIVATE_STUDENT_SUCCESS, student };
}

export function getStudents() {
  return function(dispatch) {
    return StudentApi.getStudents()
      .then(students => {
        dispatch(getStudentsSuccess(students));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function inactivateStudent(studentId) {
  return function(dispatch) {
    return StudentApi.inactivateStudent(studentId)
      .then(student => {
        dispatch(inactivateStudentSuccess(student));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function activateStudent(studentId) {
  return function(dispatch) {
    return StudentApi.activateStudent(studentId)
      .then(student => {
        dispatch(activateStudentSuccess(student));
      })
      .catch(error => {
        throw error;
      });
  };
}
