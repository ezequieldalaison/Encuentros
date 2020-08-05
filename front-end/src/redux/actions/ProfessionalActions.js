import * as Types from "./ActionTypes";
import * as ProfessionalApi from "../../api/ProfessionalApi";
import { beginApiCall } from "./ApiStatus/ApiStatusActions";

export function getProfessionalsSuccess(professionals) {
  return { type: Types.GET_PROFESSIONALS_SUCCESS, professionals };
}

export function createProfessionalSuccess(professional) {
  return { type: Types.CREATE_PROFESSIONALS_SUCCESS, professional };
}

export function updateProfessionalSuccess(professional) {
  return { type: Types.UPDATE_PROFESSIONALS_SUCCESS, professional };
}

export function inactivateProfessionalSuccess(professional) {
  return { type: Types.INACTIVATE_PROFESSIONAL_SUCCESS, professional };
}

export function activateProfessionalSuccess(professional) {
  return { type: Types.ACTIVATE_PROFESSIONAL_SUCCESS, professional };
}

export function getProfessionals() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.getProfessionals()
      .then(professionals => {
        dispatch(getProfessionalsSuccess(professionals));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveProfessional(professional) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.saveProfessional(professional)
      .then(savedProfessional => {
        professional.id
          ? dispatch(updateProfessionalSuccess(savedProfessional))
          : dispatch(createProfessionalSuccess(savedProfessional));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function inactivateProfessional(professionalId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.inactivateProfessional(professionalId)
      .then(professional => {
        dispatch(inactivateProfessionalSuccess(professional));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function activateProfessional(professionalId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return ProfessionalApi.activateProfessional(professionalId)
      .then(professional => {
        dispatch(activateProfessionalSuccess(professional));
      })
      .catch(error => {
        throw error;
      });
  };
}
