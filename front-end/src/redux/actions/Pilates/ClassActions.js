import * as Types from "../ActionTypes";
import * as ClassApi from "../../../api/Pilates/ClassApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getClassesByWeekSuccess(classes) {
  return { type: Types.GET_CLASSES_BY_WEEK_SUCCESS, classes };
}

export function getClassByDateAndHourSuccess(_class) {
  return { type: Types.GET_CLASSES_BY_DATE_AND_HOUR_SUCCESS, _class };
}

export function saveClassSuccess(_class) {
  return { type: Types.SAVE_CLASS_SUCCESS, _class };
}

export function getClassesByWeek(week) {
  return function(dispatch) {
    //dispatch(beginApiCall());
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

export function getClassByDateAndHour(dateHour) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ClassApi.getClassByDateAndHour(dateHour)
      .then(_class => {
        dispatch(getClassByDateAndHourSuccess(_class));
        return _class;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveClass(_class) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ClassApi.saveClass(_class)
      .then(savedClass => {
        dispatch(saveClassSuccess(savedClass));
        return savedClass;
      })
      .catch(error => {
        throw error;
      });
  };
}
