import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.fees, action) {
  switch (action.type) {
    case Types.GET_FEES_PER_MONTH_SUCCESS:
      return action.fees;
    default:
      return state;
  }
}
