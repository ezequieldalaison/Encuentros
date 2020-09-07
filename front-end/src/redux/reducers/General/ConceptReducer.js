import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ConceptReducer(state = InitialState.concepts, action) {
  switch (action.type) {
    case Types.GET_COMMON_CONCEPTS_SUCCESS:
      return action.concepts;
    default:
      return state;
  }
}
