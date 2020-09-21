import * as Types from "../ActionTypes";
import * as MovementApi from "../../../api/General/MovementApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getMovementsByMonthSuccess(movements) {
  return { type: Types.GET_MOVEMENTS_BY_MONTH_SUCCESS, movements };
}

export function createMovementSuccess(movement) {
  return { type: Types.CREATE_MOVEMENT_SUCCESS, movement };
}

export function updateMovementSuccess(movement) {
  return { type: Types.UPDATE_MOVEMENT_SUCCESS, movement };
}

export function deleteMovementSuccess(movementId) {
  return { type: Types.DELETE_MOVEMENT_SUCCESS, movementId };
}

export function getMovementSuccess(movement) {
  return { type: Types.GET_MOVEMENT_SUCCESS, movement };
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

export function saveMovement(movement) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MovementApi.saveMovement(movement)
      .then(savedMovement => {
        movement.id
          ? dispatch(updateMovementSuccess(savedMovement))
          : dispatch(createMovementSuccess(savedMovement));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getMovement(movementId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MovementApi.getMovement(movementId)
      .then(movement => {
        dispatch(getMovementSuccess(movement));
        return movement;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteMovement(movementId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return MovementApi.deleteMovement(movementId)
      .then(id => {
        dispatch(deleteMovementSuccess(id));
        return id;
      })
      .catch(error => {
        throw error;
      });
  };
}
