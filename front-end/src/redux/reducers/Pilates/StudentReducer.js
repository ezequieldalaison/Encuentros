import * as Types from "../../actions/ActionTypes";

export default function StudentReducer(state = [], action) {
  switch (action.type) {
    case Types.GET_STUDENTS_SUCCESS:
      return action.students;
    case Types.INACTIVATE_STUDENT_SUCCESS:
    case Types.ACTIVATE_STUDENT_SUCCESS: {
      return state.map(student =>
        student.id === action.student.id ? action.student : student
      );
    }
    default:
      return state;
  }
}
