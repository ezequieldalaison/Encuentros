import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function MovementReducer(
  state = InitialState.movements,
  action
) {
  switch (action.type) {
    case Types.GET_MOVEMENTS_BY_MONTH_SUCCESS:
      return action.movements;
    default:
      return state;
  }
}
