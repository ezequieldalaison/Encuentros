import * as Types from "../ActionTypes";
import * as MovementApi from "../../../api/General/MovementApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getCommonConceptsSuccess(concepts) {
  return { type: Types.GET_COMMON_CONCEPTS_SUCCESS, concepts };
}

export function getCommonConcepts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ConceptApi.getCommonConcepts()
      .then(concepts => {
        dispatch(getCommonConceptsSuccess(concepts));
        return concepts;
      })
      .catch(error => {
        throw error;
      });
  };
}
