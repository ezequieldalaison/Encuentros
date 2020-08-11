import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.feeTypes, action) {
  switch (action.type) {
    case Types.GET_FEE_TYPES_SUCCESS:
      return action.feeTypes;
    case Types.GET_FEE_TYPE_SUCCESS: {
      return state.map(feeType =>
        feeType.id === action.feeType.id ? action.feeType : feeType
      );
    }
    default:
      return state;
  }
}
