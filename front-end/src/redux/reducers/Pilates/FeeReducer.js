import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.fees, action) {
  switch (action.type) {
    case Types.GET_FEES_PER_MONTH_SUCCESS:
      return action.fees;
    case Types.CREATE_FEE_SUCCESS: {
      return [...state, { ...action.fee }];
    }
    default:
      return state;
  }
}
