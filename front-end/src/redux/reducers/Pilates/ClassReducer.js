import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ClassReducer(state = InitialState.classes, action) {
  switch (action.type) {
    case Types.GET_CLASSES_BY_WEEK_SUCCESS:
      return action.classes;
    default:
      return state;
  }
}
