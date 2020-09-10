import * as Types from "../ActionTypes";
import * as ConceptApi from "../../../api/General/ConceptApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getCommonConceptsSuccess(concepts) {
  return { type: Types.GET_COMMON_CONCEPTS_SUCCESS, concepts };
}

export function getCommonConcepts(areaId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ConceptApi.getCommonConcepts(areaId)
      .then(concepts => {
        dispatch(getCommonConceptsSuccess(concepts));
        return concepts;
      })
      .catch(error => {
        throw error;
      });
  };
}
