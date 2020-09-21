import * as Types from "../ActionTypes";
import * as FeeApi from "../../../api/Pilates/FeeApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getFeesPerMonthSuccess(fees) {
  return { type: Types.GET_FEES_PER_MONTH_SUCCESS, fees };
}

export function createFeeSuccess(fee) {
  return { type: Types.CREATE_FEE_SUCCESS, fee };
}

export function updateFeeSuccess(fee) {
  return { type: Types.UPDATE_FEE_SUCCESS, fee };
}

export function getFeeSuccess(fee) {
  return { type: Types.GET_FEE_SUCCESS, fee };
}

export function deleteFeeSuccess(feeId) {
  return { type: Types.DELETE_FEE_SUCCESS, feeId };
}

export function getFeesPerMonth(monthId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.getFeesPerMonth(monthId)
      .then(fees => {
        dispatch(getFeesPerMonthSuccess(fees));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveFee(fee) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.saveFee(fee)
      .then(savedFee => {
        fee.id
          ? dispatch(updateFeeSuccess(savedFee))
          : dispatch(createFeeSuccess(savedFee));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getFee(feeId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.getFee(feeId)
      .then(fee => {
        dispatch(getFeeSuccess(fee));
        return fee;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteFee(feeId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.deleteFee(feeId)
      .then(id => {
        dispatch(deleteFeeSuccess(id));
        return id;
      })
      .catch(error => {
        throw error;
      });
  };
}
