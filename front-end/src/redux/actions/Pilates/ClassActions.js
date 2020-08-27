import * as Types from "../ActionTypes";
import * as ClassApi from "../../../api/Pilates/ClassApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getClassesByWeekSuccess(classes) {
  return { type: Types.GET_CLASSES_BY_WEEK_SUCCESS, classes };
}

export function getClassesByWeek(week) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ClassApi.getClassesByWeek(week)
      .then(classes => {
        dispatch(getClassesByWeekSuccess(classes));
        return classes;
      })
      .catch(error => {
        throw error;
      });
  };
}
