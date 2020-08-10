import * as Types from "../ActionTypes";
import * as FeeApi from "../../../api/Pilates/FeeApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getFeesPerMonthSuccess(fees) {
  return { type: Types.GET_FEES_PER_MONTH_SUCCESS, fees };
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
