import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function WeeklyClassReducer(
  state = InitialState.weeklyClasses,
  action
) {
  switch (action.type) {
    case Types.CREATE_WEEKLY_CLASS_SUCCESS:
      return [...state, { ...action.weeklyClass }];
    case Types.UPDATE_WEEKLY_CLASS_SUCCESS: {
      return state.map(weeklyClass =>
        weeklyClass.id === action.weeklyClass.id
          ? action.weeklyClass
          : weeklyClass
      );
    }
    case Types.GET_WEEKLY_CLASSES_SUCCESS:
    case Types.SEARCH_WEEKLY_CLASSES_SUCCESS:
      return action.weeklyClasses;
    case Types.INACTIVATE_WEEKLY_CLASS_SUCCESS:
    case Types.ACTIVATE_WEEKLY_CLASS_SUCCESS:
    case Types.GET_WEEKLY_CLASS_SUCCESS: {
      return state.map(weeklyClass =>
        weeklyClass.id === action.weeklyClass.id
          ? action.weeklyClass
          : weeklyClass
      );
    }
    default:
      return state;
  }
}
