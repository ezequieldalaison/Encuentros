import * as Types from "../ActionTypes";
import * as StudentApi from "../../../api/Pilates/StudentApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getStudentsSuccess(students) {
  return { type: Types.GET_STUDENTS_SUCCESS, students };
}

export function searchStudentsSuccess(students) {
  return { type: Types.SEARCH_STUDENTS_SUCCESS, students };
}

export function getStudentSuccess(student) {
  return { type: Types.GET_STUDENT_SUCCESS, student };
}

export function createStudentSuccess(student) {
  return { type: Types.CREATE_STUDENT_SUCCESS, student };
}

export function updateStudentSuccess(student) {
  return { type: Types.UPDATE_STUDENT_SUCCESS, student };
}

export function inactivateStudentSuccess(student) {
  return { type: Types.INACTIVATE_STUDENT_SUCCESS, student };
}

export function activateStudentSuccess(student) {
  return { type: Types.ACTIVATE_STUDENT_SUCCESS, student };
}

export function getStudents() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return StudentApi.getStudents()
      .then(students => {
        dispatch(getStudentsSuccess(students));
        return students;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function searchStudents(criteria) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return StudentApi.searchStudents(criteria)
      .then(students => {
        dispatch(searchStudentsSuccess(students));
        return students;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getStudent(studentId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return StudentApi.getStudent(studentId)
      .then(student => {
        dispatch(getStudentSuccess(student));
        return student;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function inactivateStudent(studentId) {
  return function(dispatch) {
    dispatch(beginApiCall());
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
    dispatch(beginApiCall());
    return StudentApi.activateStudent(studentId)
      .then(student => {
        dispatch(activateStudentSuccess(student));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveStudent(student) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return StudentApi.saveStudent(student)
      .then(savedStudent => {
        student.id
          ? dispatch(updateStudentSuccess(savedStudent))
          : dispatch(createStudentSuccess(savedStudent));
      })
      .catch(error => {
        throw error;
      });
  };
}
