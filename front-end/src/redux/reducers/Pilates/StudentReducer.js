import * as Types from "../../actions/ActionTypes";

export default function StudentReducer(state = [], action) {
  switch (action.type) {
    case Types.GET_STUDENTS_SUCCESS:
      return action.students;
    default:
      return state;
  }
}
