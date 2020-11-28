import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ProfessionalWorkDayReducer(
  state = InitialState.professionalWorkDays,
  action
) {
  switch (action.type) {
    case Types.CREATE_PROFESSIONAL_WORK_DAY_SUCCESS: {
      return [...state, { ...action.professionalWorkDay }];
    }
    case Types.GET_PROFESSIONAL_WORK_DAY_BY_MONTH_SUCCESS:
    case Types.GET_PROFESSIONAL_WORK_DAY_BY_YEAR_SUCCESS:
      return action.professionalWorkDays;
    case Types.UPDATE_PROFESSIONAL_WORK_DAY_SUCCESS: {
      return state.map(professionalWorkDay =>
        professionalWorkDay.id === action.professionalWorkDay.id
          ? action.professionalWorkDay
          : professionalWorkDay
      );
    }
    case Types.DELETE_PROFESSIONAL_WORK_DAY_SUCCESS: {
      return state.filter(
        professionalWorkDay =>
          professionalWorkDay.id !== action.professionalWorkDayId
      );
    }
    default:
      return state;
  }
}
