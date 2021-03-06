import * as Types from "../ActionTypes";
import * as FeeTypeApi from "../../../api/Pilates/FeeTypeApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getFeeTypesSuccess(feeTypes) {
  return { type: Types.GET_FEE_TYPES_SUCCESS, feeTypes };
}

export function getFeeTypeSuccess(feeType) {
  return { type: Types.GET_FEE_TYPE_SUCCESS, feeType };
}

export function updateFeeTypesSuccess(feeTypes) {
  return { type: Types.UPDATE_FEE_TYPES_SUCCESS, feeTypes };
}

export function getFeeTypes() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeTypeApi.getFeeTypes().then(feeTypes => {
      dispatch(getFeeTypesSuccess(feeTypes));
      return feeTypes;
    });
  };
}

export function getFeeType(feeTypeId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeTypeApi.getFeeType(feeTypeId).then(feeType => {
      dispatch(getFeeTypeSuccess(feeType));
      return feeType;
    });
  };
}

export function updateFeeTypes(feeTypes) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeTypeApi.updateFeeTypes(feeTypes).then(feeTypes => {
      dispatch(updateFeeTypesSuccess(feeTypes));
      return feeTypes;
    });
  };
}
