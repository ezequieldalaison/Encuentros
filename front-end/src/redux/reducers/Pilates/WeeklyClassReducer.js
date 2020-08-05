import * as Types from "../../actions/ActionTypes";

export default function WeeklyClassReducer(state = [], action) {
  switch (action.type) {
    case Types.GET_WEEKLY_CLASSES_SUCCESS:
      return action.weeklyClasses;
    default:
      return state;
  }
}
