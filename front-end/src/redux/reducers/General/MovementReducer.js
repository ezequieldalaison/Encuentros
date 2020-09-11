import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function MovementReducer(
  state = InitialState.movements,
  action
) {
  switch (action.type) {
    case Types.CREATE_MOVEMENT_SUCCESS:
      return [...state, { ...action.movement }];
    case Types.GET_MOVEMENTS_BY_MONTH_SUCCESS:
      return action.movements;
    case Types.UPDATE_MOVEMENT_SUCCESS: {
      return state.map(movement =>
        movement.id === action.movement.id ? action.movement : movement
      );
    }
    default:
      return state;
  }
}
