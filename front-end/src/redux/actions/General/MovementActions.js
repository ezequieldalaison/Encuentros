import * as Types from "../ActionTypes";
import * as MovementApi from "../../../api/General/MovementApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getMovementsByMonthSuccess(movements) {
  return { type: Types.GET_MOVEMENTS_BY_MONTH_SUCCESS, movements };
}

export function getMovementsByMonth(monthId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MovementApi.getMovementsByMonth(monthId)
      .then(movements => {
        dispatch(getMovementsByMonthSuccess(movements));
        return movements;
      })
      .catch(error => {
        throw error;
      });
  };
}
