import * as Types from "../ActionTypes";
import * as StudentApi from "../../../api/Pilates/StudentApi";

export function getStudentsSuccess(students) {
  return { type: Types.GET_STUDENTS_SUCCESS, students };
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
