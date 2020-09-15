import * as Types from "../../actions/ActionTypes";
import InitialState from "../InitialState";

export default function ProfessionalPaymentReducer(
  state = InitialState.professionalPayments,
  action
) {
  switch (action.type) {
    case Types.GET_PROFESSIONAL_PAYMENTS_SUCCESS:
      return action.professionalPayments;
    case Types.CREATE_PROFESSIONAL_PAYMENT_SUCCESS: {
      return [...state, { ...action.professionalPayment }];
    }
    default:
      return state;
  }
}
