import * as Types from "../ActionTypes";
import * as FeeApi from "../../../api/Pilates/FeeApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getFeesPerMonthSuccess(fees) {
  return { type: Types.GET_FEES_PER_MONTH_SUCCESS, fees };
}

export function createFeeSuccess(fees) {
  return { type: Types.CREATE_FEE_SUCCESS, fees };
}

export function updateFeeSuccess(fees) {
  return { type: Types.UPDATE_FEE_SUCCESS, fees };
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
