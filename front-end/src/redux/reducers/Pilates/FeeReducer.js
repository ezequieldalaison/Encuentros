import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function FeeReducer(state = InitialState.fees, action) {
  switch (action.type) {
    case Types.GET_FEES_PER_MONTH_SUCCESS:
      return action.fees;
    case Types.CREATE_FEE_SUCCESS: {
      return [...state, { ...action.fee }];
    }
    case Types.GET_FEE_SUCCESS: {
      return state.map(fee => (fee.id === action.fee.id ? action.fee : fee));
    }
    case Types.UPDATE_FEE_SUCCESS: {
      return state.map(fee => (fee.id === action.fee.id ? action.fee : fee));
    }
    case Types.DELETE_FEE_SUCCESS: {
      return state.filter(fee => fee.id !== action.feeId);
    }
    default:
      return state;
  }
}
