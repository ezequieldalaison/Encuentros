import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ParameterReducer(
  state = InitialState.parameters,
  action
) {
  switch (action.type) {
    case Types.GET_PARAMETER_BY_AREA_SUCCESS:
      return action.parameters;
    default:
      return state;
  }
}
