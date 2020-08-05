import * as Types from "../ActionTypes";
import * as WeeklyClassApi from "../../../api/Pilates/WeeklyClassApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getWeeklyClassesSuccess(weeklyClasses) {
  return { type: Types.GET_WEEKLY_CLASSES_SUCCESS, weeklyClasses };
}

export function getWeeklyClassSuccess(weeklyClass) {
  return { type: Types.GET_WEEKLY_CLASS_SUCCESS, weeklyClass };
}

export function getWeeklyClasses() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return WeeklyClassApi.getWeeklyClasses()
      .then(weeklyClasses => {
        dispatch(getWeeklyClassesSuccess(weeklyClasses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getWeeklyClass(weeklyClassId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return WeeklyClassApi.getWeeklyClass(weeklyClassId)
      .then(weeklyClass => {
        dispatch(getWeeklyClassSuccess(weeklyClass));
        return weeklyClass;
      })
      .catch(error => {
        throw error;
      });
  };
}
