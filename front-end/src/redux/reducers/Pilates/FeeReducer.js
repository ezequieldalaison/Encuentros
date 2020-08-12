import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.fees, action) {
  switch (action.type) {
    case Types.GET_FEES_PER_MONTH_SUCCESS:
      return action.fees;
    case Types.CREATE_FEE_SUCCESS: {
      debugger;
      return [...state, { ...action.fee }];
    }
    case Types.UPDATE_STUDENT_SUCCESS: {
      return state.map(student =>
        student.id === action.student.id ? action.student : student
      );
    }
    default:
      return state;
  }
}
