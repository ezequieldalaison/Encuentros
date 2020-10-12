import * as Types from "../ActionTypes";
import * as MovementStatusApi from "../../../api/General/MovementStatusApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getMovementStatusesSuccess(movementStatuses) {
  return { type: Types.GET_MOVEMENT_STATUSES_SUCCESS, movementStatuses };
}

export function getMovementStatuses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MovementStatusApi.getMovementStatuses()
      .then(movementStatuses => {
        dispatch(getMovementStatusesSuccess(movementStatuses));
        return movementStatuses;
      })
      .catch(error => {
        throw error;
      });
  };
}
