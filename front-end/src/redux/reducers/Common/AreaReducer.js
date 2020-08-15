import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function AreaReducer(state = InitialState.areas, action) {
  switch (action.type) {
    case Types.GET_AREAS_SUCCESS:
      return action.areas;
    default:
      return state;
  }
}
