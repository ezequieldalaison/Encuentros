import * as Types from "../../actions/ActionTypes";

export default function StudentReducer(state = [], action) {
  switch (action.type) {
    case Types.CREATE_STUDENT_SUCCESS:
      return [...state, { ...action.student }];
    case Types.GET_STUDENT_SUCCESS: {
      return state.map(student =>
        student.id === action.student.id ? action.student : student
      );
    }
    case Types.GET_STUDENTS_SUCCESS:
    case Types.SEARCH_STUDENTS_SUCCESS:
      return action.students;
    case Types.UPDATE_STUDENT_SUCCESS:
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
