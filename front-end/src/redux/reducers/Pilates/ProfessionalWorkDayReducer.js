import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ProfessionalWorkDayReducer(
  state = InitialState.professionalWorkDays,
  action
) {
  switch (action.type) {
    case Types.GET_PROFESSIONAL_WORK_DAY_BY_MONTH:
    case Types.GET_PROFESSIONAL_WORK_DAY_BY_YEAR:
      return action.professionalWorkDays;
    default:
      return state;
  }
}
