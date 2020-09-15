import * as Types from "../ActionTypes";
import * as ProfessionalPaymentApi from "../../../api/Pilates/ProfessionalPaymentApi";
import { beginApiCall } from "../ApiStatus/ApiStatusActions";

export function createProfessionalPaymentSuccess(professionalPayment) {
  return {
    type: Types.CREATE_PROFESSIONAL_PAYMENT_SUCCESS,
    professionalPayment
  };
}

export function updateProfessionalPaymentSuccess(professionalPayment) {
  return {
    type: Types.UPDATE_PROFESSIONAL_PAYMENT_SUCCESS,
    professionalPayment
  };
}

export function getProfessionalPaymentsPerMonthSuccess(professionalPayments) {
  return {
    type: Types.GET_PROFESSIONAL_PAYMENTS_SUCCESS,
    professionalPayments
  };
}

export function saveProfessionalPayment(professionalPayment) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.saveProfessionalPayment(professionalPayment)
      .then(savedprofessionalPayment => {
        professionalPayment.id
          ? dispatch(createProfessionalPaymentSuccess(savedprofessionalPayment))
          : dispatch(
              updateProfessionalPaymentSuccess(savedprofessionalPayment)
            );
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalPaymentsPerMonth(monthId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.getProfessionalPaymentsPerMonth(monthId)
      .then(professionalPayments => {
        dispatch(getProfessionalPaymentsPerMonthSuccess(professionalPayments));
      })
      .catch(error => {
        throw error;
      });
  };
}
