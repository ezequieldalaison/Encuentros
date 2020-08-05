import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function WeeklyClassReducer(
  state = InitialState.weeklyClasses,
  action
) {
  switch (action.type) {
    case Types.GET_WEEKLY_CLASSES_SUCCESS:
      return action.weeklyClasses;
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
