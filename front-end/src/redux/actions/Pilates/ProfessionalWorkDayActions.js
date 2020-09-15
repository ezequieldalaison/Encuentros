import * as Types from "../ActionTypes";
import * as ProfessionalWorkDayApi from "../../../api/Pilates/ProfessionalWorkDayApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function getSuggestedProfessionalsSuccess(pwds) {
  return { type: Types.GET_SUGGESTED_PROFESSIONALS_SUCCESS, pwds };
}

export function saveProfessionalWorkDaySuccess(pwd) {
  return { type: Types.SAVE_PROFESSIONAL_WORK_DAY_SUCCESS, pwd };
}

export function saveProfessionalWorkDaysSuccess(pwd) {
  return { type: Types.SAVE_PROFESSIONAL_WORK_DAYS_SUCCESS, pwd };
}

export function getProfessionalWorkDaysByMonthSuccess(professionalWorkDays) {
  return {
    type: Types.GET_PROFESSIONAL_WORK_DAY_BY_MONTH_SUCCESS,
    professionalWorkDays
  };
}

export function getProfessionalWorkDaysByYearSuccess(professionalWorkDays) {
  return {
    type: Types.GET_PROFESSIONAL_WORK_DAY_BY_YEAR_SUCCESS,
    professionalWorkDays
  };
}

export function getSuggestedProfessionals(dayId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.getSuggestedProfessionals(dayId)
      .then(professionalWorkDay => {
        dispatch(getSuggestedProfessionalsSuccess(professionalWorkDay));
        return professionalWorkDay;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessionalWorkDay(professionalWorkDay) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.saveProfessionalWorkDay(professionalWorkDay)
      .then(professionalWorkDay => {
        dispatch(saveProfessionalWorkDaySuccess(professionalWorkDay));
        return professionalWorkDay;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessionalWorkDays(professionalWorkDays) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.saveProfessionalWorkDays(professionalWorkDays)
      .then(professionalWorkDays => {
        dispatch(saveProfessionalWorkDaysSuccess(professionalWorkDays));
        return professionalWorkDays;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalWorkDaysByMonth(monthId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.getProfessionalWorkDaysByMonth(monthId)
      .then(professionalWorkDays => {
        dispatch(getProfessionalWorkDaysByMonthSuccess(professionalWorkDays));
        return professionalWorkDays;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalWorkDaysByYear(year) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.getProfessionalWorkDaysByYear(year)
      .then(professionalWorkDays => {
        dispatch(getProfessionalWorkDaysByYearSuccess(professionalWorkDays));
        return professionalWorkDays;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalWorkedHoursByMonth(criteria) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalWorkDayApi.getProfessionalWorkedHoursByMonth(criteria)
      .then(quantity => {
        //dispatch(getProfessionalWorkedHoursByMonthSuccess(quantity));
        return quantity;
      })
      .catch(error => {
        throw error;
      });
  };
}
