import * as Types from "../ActionTypes";
import * as WeeklyClassApi from "../../../api/Pilates/WeeklyClassApi";

export function getWeeklyClassesSuccess(weeklyClasses) {
  return { type: Types.GET_WEEKLY_CLASSES_SUCCESS, weeklyClasses };
}

export function getWeeklyClasses() {
  return function(dispatch) {
    return WeeklyClassApi.getWeeklyClasses()
      .then(weeklyClasses => {
        dispatch(getWeeklyClassesSuccess(weeklyClasses));
      })
      .catch(error => {
        throw error;
      });
  };
}
