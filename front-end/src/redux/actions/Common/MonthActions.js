import * as Types from "../ActionTypes";
import * as MonthApi from "../../../api/Common/MonthApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getMonthsSuccess(months) {
  return { type: Types.GET_MONTHS_SUCCESS, months };
}

export function getMonths() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MonthApi.getMonths()
      .then(months => {
        dispatch(getMonthsSuccess(months));
        return months;
      })
      .catch(error => {
        throw error;
      });
  };
}
