import * as Types from "../ActionTypes";
import * as AreaApi from "../../../api/Common/AreaApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getAreasSuccess(areas) {
  return { type: Types.GET_AREAS_SUCCESS, areas };
}

export function getAreas() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return AreaApi.getAreas()
      .then(areas => {
        dispatch(getAreasSuccess(areas));
        return areas;
      })
      .catch(error => {
        throw error;
      });
  };
}
