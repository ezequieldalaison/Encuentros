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

export function searchProfessionalPaymentsSuccess(professionalPayments) {
  return {
    type: Types.SEARCH_PROFESSIONAL_PAYMENTS_SUCCESS,
    professionalPayments
  };
}

export function getProfessionalPaymentSuccess(professionalPayment) {
  return {
    type: Types.GET_PROFESSIONAL_PAYMENT_SUCCESS,
    professionalPayment
  };
}

export function deleteProfessionalPaymentSuccess(professionalPaymentId) {
  return {
    type: Types.DELETE_PROFESSIONAL_PAYMENT_SUCCESS,
    professionalPaymentId
  };
}

export function saveProfessionalPayment(professionalPayment) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.saveProfessionalPayment(professionalPayment)
      .then(savedprofessionalPayment => {
        professionalPayment.id
          ? dispatch(updateProfessionalPaymentSuccess(savedprofessionalPayment))
          : dispatch(
              createProfessionalPaymentSuccess(savedprofessionalPayment)
            );
      })
      .catch(error => {
        throw error;
      });
  };
}

export function searchProfessionalPayments(criteria) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.searchProfessionalPayments(criteria)
      .then(professionalPayments => {
        dispatch(searchProfessionalPaymentsSuccess(professionalPayments));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getProfessionalPayment(professionalPaymentId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.getProfessionalPayment(professionalPaymentId)
      .then(professionalPayment => {
        dispatch(getProfessionalPaymentSuccess(professionalPayment));
        return professionalPayment;
      })
      .catch(error => {
        throw error;
      });
  };
}

export function deleteProfessionalPayment(professionalPaymentId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalPaymentApi.deleteProfessionalPayment(
      professionalPaymentId
    )
      .then(id => {
        dispatch(deleteProfessionalPaymentSuccess(id));
        return id;
      })
      .catch(error => {
        throw error;
      });
  };
}
