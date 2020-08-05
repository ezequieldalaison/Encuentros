import * as Types from "../actions/ActionTypes";

export default function ProfessionalReducer(state = [], action) {
  switch (action.type) {
    case Types.CREATE_PROFESSIONALS_SUCCESS:
      return [...state, { ...action.professional }];
    case Types.GET_PROFESSIONALS_SUCCESS:
      return action.professionals;
    case Types.UPDATE_PROFESSIONALS_SUCCESS:
    case Types.INACTIVATE_PROFESSIONAL_SUCCESS:
    case Types.ACTIVATE_PROFESSIONAL_SUCCESS: {
      return state.map(professional =>
        professional.id === action.professional.id
          ? action.professional
          : professional
      );
    }
    default:
      return state;
  }
}