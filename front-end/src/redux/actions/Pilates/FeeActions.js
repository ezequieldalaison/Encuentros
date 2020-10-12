import * as Types from "../ActionTypes";
import * as FeeApi from "../../../api/Pilates/FeeApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function searchFeesSuccess(fees) {
  return { type: Types.SEARCH_FEES_SUCCESS, fees };
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

export function searchFees(criteria) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.searchFees(criteria)
      .then(fees => {
        dispatch(searchFeesSuccess(fees));
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

export function changeMovementStatus(feeMovementStatus) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return FeeApi.changeMovementStatus(feeMovementStatus)
      .then(savedFee => {
        dispatch(updateFeeSuccess(savedFee));
      })
      .catch(error => {
        throw error;
      });
  };
}
