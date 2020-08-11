import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.months, action) {
  switch (action.type) {
    case Types.GET_MONTHS_SUCCESS:
      return action.months;
    default:
      return state;
  }
}
