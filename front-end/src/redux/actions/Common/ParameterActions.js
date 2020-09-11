import * as Types from "../ActionTypes";
import * as ParameterApi from "../../../api/Common/ParameterApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getParameterSuccess(parameter) {
  return { type: Types.GET_PARAMETER_SUCCESS, parameter };
}

export function getParameter(parameterId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ParameterApi.getParameter(parameterId)
      .then(parameter => {
        dispatch(getParameterSuccess(parameter));
        return parameter;
      })
      .catch(error => {
        throw error;
      });
  };
}
