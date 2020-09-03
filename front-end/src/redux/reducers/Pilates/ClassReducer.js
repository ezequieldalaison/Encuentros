import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ClassReducer(state = InitialState.classes, action) {
  switch (action.type) {
    case Types.GET_CLASSES_BY_WEEK_SUCCESS:
      return action.classes;
    case Types.SAVE_CLASS_SUCCESS:
    case Types.GET_CLASSES_BY_DATE_AND_HOUR_SUCCESS: {
      return state.map(_class =>
        _class.date === action._class.date && _class.hour === action._class.hour
          ? action._class
          : _class
      );
    }
    default:
      return state;
  }
}
