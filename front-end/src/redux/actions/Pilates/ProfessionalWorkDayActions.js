import * as Types from "../ActionTypes";
import * as ProfessionalWorkDayApi from "../../../api/Pilates/ProfessionalWorkDayApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getSuggestedProfessionalsSuccess(pwds) {
  return { type: Types.GET_SUGGESTED_PROFESSIONALS_SUCCESS, pwds };
}

export function saveProfessionalWorkDaySuccess(pwd) {
  return { type: Types.SAVE_PROFESSIONAL_WORK_DAY, pwd };
}

export function saveProfessionalWorkDaysSuccess(pwd) {
  return { type: Types.SAVE_PROFESSIONAL_WORK_DAYS, pwd };
}

export function getSuggestedProfessionals(dayId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.getSuggestedProfessionals(dayId)
      .then(pwd => {
        dispatch(getSuggestedProfessionalsSuccess(pwd));
        return pwd;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessionalWorkDay(pwd) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.saveProfessionalWorkDay(pwd)
      .then(pwd => {
        dispatch(saveProfessionalWorkDaySuccess(pwd));
        return pwd;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessionalWorkDays(pwds) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.saveProfessionalWorkDays(pwds)
      .then(pwds => {
        dispatch(saveProfessionalWorkDaysSuccess(pwds));
        return pwds;
      })
      .catch(error => {
        throw error;
      });
  };
}
