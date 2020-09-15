import * as Types from "../ActionTypes";
import * as ParameterApi from "../../../api/Common/ParameterApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getParameterSuccess(parameter) {
  return { type: Types.GET_PARAMETER_SUCCESS, parameter };
}

export function getParametersByAreaIdSuccess(parameters) {
  return { type: Types.GET_PARAMETER_BY_AREA_SUCCESS, parameters };
}

export function updateParameterSuccess(parameter) {
  return { type: Types.UPDATE_PARAMETER_SUCCESS, parameter };
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

export function getParametersByAreaId(areaId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ParameterApi.getParametersByAreaId(areaId)
      .then(parameters => {
        dispatch(getParametersByAreaIdSuccess(parameters));
        return parameters;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function updateParameter(parameter) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ParameterApi.updateParameter(parameter)
      .then(parameter => {
        dispatch(updateParameterSuccess(parameter));
      })
      .catch(error => {
        throw error;
      });
  };
}
